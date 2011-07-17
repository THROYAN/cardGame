var animTime = 500, nextCardSpeed = 100, angleStep = 5;
var banedValues = [2,3,4,5,6];
var banedSuites = [];//'a','b','c','d'
var cardsCount = 52;
var x = 20, dx = 20, startx = 20;
var y = 50, dy = 20 , starty = 50;
var table;
var playerParams = {
    x : 300,
    y: 300,
    dx : 25
}

$(function(){
    $('#buttons button')[0].disabled = false;
    $('#buttons button')[1].disabled = true;
    $('#buttons button')[2].disabled = true;

    $('#computerScore').hide();
    $('#playerScore').hide();
        
    table = new CardTable();
        table.banedValues = banedValues;
        table.banedSuites = banedSuites;
        table.angleStep = angleStep;
        table.animTime = animTime;
        table.nextCardSpeed = nextCardSpeed;
        table.x = startx;
        table.y = starty;
        
    var players = table.players;
        players[0] = new Player(playerParams.x,playerParams.y, playerParams.dx);
        players[0].rowLength = 6;
        players[0].refresh();
        
        players[1] = new Player(300,100,25,20,180);
        players[1].rowLength = 6;
        players[1].x = 300 + 25 * 5;
        players[1].refresh();
        
    $('#playerScore').css({'left':playerParams.x + 'px', 'top' : (playerParams.y - 50) + 'px'});
    $('#computerScore').css({'left':table.players[1].x + 'px', 'top' : (table.players[1].y + 100) + 'px'});
    $('#message').css({'left':(playerParams.x - 100) + 'px', 'top' : (playerParams.y - 80) + 'px'});
    $('#buttons').css({'left': x + 'px', 'top' : (y - 20) + 'px'});
        
    table.randomizeDeck();
});

function startGame()
{
    table.backToDeck(table.players[0]);
    table.backToDeck(table.players[1]);
    table.x = x;
    table.y = y;
    table.randomizeDeck(table.deck);
    table.deal(table.players[0],2, "show");
    table.deal(table.players[1],2);
    
    $('#playerScore span').html(
        BlackJackGame.getCardsValue(table.players[0].cards)
    );
    $('#computerScore').hide();
    $('#playerScore').show();
    
    var status = BlackJackGame.checkScore(parseInt($('#playerScore span').html()));
    
    $('#buttons button')[0].disabled = true;
    $('#buttons button')[1].disabled = false;
    $('#buttons button')[2].disabled = false;
    
    $('#message').html(status.message);
    if(status.status == 'win')
        $('#message').css('color','#00f');
    if(status.status == 'loss')
        $('#message').css('color','#f00');
}

function computerStep() {
    if(BlackJackGame.checkStep(BlackJackGame.getCardsValue(table.players[1].cards)))
    {
        table.deal(table.players[1],1);
        return true;
    }
    return false;
}

function endGame() {
    while(computerStep()){}
    
    table.players[1].showCards();
    
    var pScore = BlackJackGame.getCardsValue(table.players[0].cards);
    var cScore = BlackJackGame.getCardsValue(table.players[1].cards);
    
    $('#computerScore span').html(
        cScore
    );
    $('#computerScore').show();
        
    $('#buttons button')[0].disabled = false;
    $('#buttons button')[1].disabled = true;
    $('#buttons button')[2].disabled = true;
    
    if((pScore > 21 && cScore > 21) || pScore == cScore)
    {
        $('#message').css('color','#999');
        $('#message').html('Round draw');
    }
    else
    {
        if(pScore > 21) {
            $('#message').html('You lose!');
            $('#message').css('color','#f00');
        }
        else
        {
            if(cScore > 21) {
                $('#message').css('color','#00f');
                $('#message').html('You win!');
            }
            else
                if(pScore > cScore) {
                    $('#message').css('color','#00f');
                    $('#message').html('You win');
                }
                else {
                    $('#message').css('color','#f00');
                    $('#message').html('You lose');
                }
        }
    }
    
}

function giveMeMore()
{
    table.deal(table.players[0],1, "show");
    $('#playerScore span').html(
        BlackJackGame.getCardsValue(table.players[0].cards)
    );
    var status = BlackJackGame.checkScore(parseInt($('#playerScore span').html()));
    
    $('#message').html(status.message);
    if(status.status == 'win')
        $('#message').css('color','#00f');
    if(status.status == 'loss')
    {
        $('#message').css('color','#f00');
    }
    computerStep();
}

/**
 * End is excluded
 */
function randomInt(a, b)
{
    if(b == null)
        return Math.floor(Math.random()*a);
    return Math.floor(Math.random()*(b - a)) + a;
}

/**
 * Rules of BlackJack game
 */
BlackJackGame = function() {
    
}

BlackJackGame.cardValues = [11,2,3,4,5,6,7,8,9,10,10,10,10];

BlackJackGame.specialCardValues = {
//    'Ace': 11,
//    'Queen of spades': 45,
//    'a' : '+5'
};

BlackJackGame.combinations = [
    {
        cards: [1,1],
        value: 21
    },
//    {
//        cards: [1,'a'],
//        value: 21123
//    },
//    {
//        cards: ['Queen', '*', '*'],
//        value: 666
//    },
//    {
//        cards: ['a','a'],
//        value: 123
//    }
];

BlackJackGame.getCardValue = function(card){
    var value = BlackJackGame.cardValues[card.value.number() - 1];
    
    for (var p in BlackJackGame.specialCardValues) {
        if(p == card.value.name() || p == card.suit.name() || p == card.suit.letter() || p == card.toString())
        {
            var v = BlackJackGame.specialCardValues[p];
            switch(typeof v)
            {
                case 'string':
                    if(v.charAt(0) == '-'){
                        value = parseInt(value) - parseInt(v.substr(1, v.length - 1));
                    } else {
                        if(v.charAt(0) == '+'){
                            value = parseInt(value) + parseInt(v.substr(1, v.length - 1));
                        } else {
                            if(parseInt(v))
                                value = parseInt(v);
                        }
                    }
                    break;
                case 'number':
                    value = v;
                    break;
            }
        }
    }
    return parseInt(value);
}

BlackJackGame.getCardsValue = function(cards){
    var value = 0;
//    if(cards.length == 2 && cards[0].value.number() == 1 && cards[1].value.number() == 1)
//        return 21;
    var cs = BlackJackGame.combinations;
    for(var i = 0; i < cs.length; i++)
    {
        if(cs[i].cards.length != cards.length)
            continue;
        if(isCardsInArray(cards, cs[i].cards))
            return cs[i].value;
    }

    for (var i = 0; i < cards.length; i++) {
        value += BlackJackGame.getCardValue(cards[i]);
    }
    return value;
}

function isCardsInArray(cards, array)
{
    function asd(value, array)
    {
        var i = jQuery.inArray(value, array);
        if(i == -1)
            i = jQuery.inArray("*", array);
        if(i != -1)
        {
            var a = array.slice(0);
            a.remove(i);
            var c = cards.slice(0);
            c.shift();
            return isCardsInArray(c,a);
        }
        return false;
    }
    
    if(cards.length == 0 && array.length == 0)
        return true;
    if(cards.length == 0 || array.length == 0)
        return false;
    //by number
    if(asd(cards[0].value.number(),array))
        return true;
    
    //by suit letter
    if(asd(cards[0].suit.letter(),array))
        return true;
    
    //by full name
    if(asd(cards[0].toString(),array))
        return true;
    
    //by value name
    if(asd(cards[0].value.name(),array))
        return true;
    
    
    //by suit name
    if(asd(cards[0].suit.name(),array))
        return true;
    
    return false;
}

BlackJackGame.checkScore = function(score)
{
    if(score == 21)
        return {
            message: 'BlackJack!',
            status: 'win'
        };
    if(score < 21)
        return {
            message: '',
            status: ''
        };
    if(score > 21)
        return {
            message: 'Turned over!',
            status: 'loss'
        };
}

BlackJackGame.checkStep = function(score){
    var min = 255;
    for (var i = 0; i < 52; i++) {
        var s = BlackJackGame.getCardValue(new Card(i));
        if(s < min)
            min = s;
    }
    if(score < 17)
        return true;
    return false;
}

BlackJackGame.banedValues = [];
BlackJackGame.banedSuites = [];