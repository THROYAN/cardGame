var animTime = 500, nextCardSpeed = 100, angleStep = 5;
var banedValues = [2,3,4,5,6];
var banedSuites;
var cardsCount = 52;
var x = 20, dx = 20;
var y = 50, dy = 20;
var oneRow = 16;

$(function(){
    
    cardsCount -= banedValues.length * 4;
    $('#gameTable').append('<H>Click me!!! ;)</H>')
    var cards = [];
    for (var i = 0; i < cardsCount; i++) {
        
        //select a random card
        var r;
        do
        {
            r = randomInt(52);
            temp = new Card(r);
        }
        while(temp.$().length > 0 || jQuery.inArray(temp.value.number(), banedValues) != -1);
        
        cards[i] = new Card(r, null, $('#gameTable'));
        cards[i].imgWidth(40);
        cards[i].imgHeight(55);
        cards[i].x(x);
        cards[i].y(y + dy * (oneRow + 1));
        cards[i].hide();
    }
    
    var temp = true;
    var show = function(){
        var i = 0;
        var t = setInterval(function(){
            if(temp)
                cards[i].animatedFly(x + dx * (i % oneRow), y, true, 0, animTime, angleStep);
            else
                cards[i].animatedFly(x + dx * (oneRow), y + dy * (i % oneRow + 2), true, 90, animTime, angleStep);
            i++;
            if(i % oneRow == 0)
                temp = !temp;
            if(i >= cardsCount)
            {
                clearInterval(t);
                $('#gameTable h').html('Click me again ;)))');
            }
        },nextCardSpeed);
    }
    
    $('#gameTable').click(show);
});

/**
 * End is excluded
 */
function randomInt(a, b)
{
    if(b == null)
        return Math.floor(Math.random()*a);
    return Math.floor(Math.random()*(b - a)) + a;
}