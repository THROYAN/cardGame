/**
 * Rules of card game
 */
CardGameRules = function() {
    
}

/**
 * Costs of all 13 cards values
 */
CardGameRules.cardValues = [11,2,3,4,5,6,7,8,9,10,10,10,10];

/**
 * Costs of same cards
 * 
 * @type Object{card: value,...}
 * 
 * @description Card may have a form:
 *    number - equals the card value
 *    char - the card suit letter
 *    string - means the value name or full name of the card
 */
CardGameRules.specialCardValues = {
//    'Ace': 11,
//    'Queen of spades': 45,
//    'a' : '+5'
};

/**
 * Combinations of cards
 * 
 * @type Array of objects {cards: Array of card representation, value: cost[, name: string]}
 * 
 * @example 
 *  GameRules.combinations = [
 *   {
 *      //Pair of aces
 *       cards: [1,1],
 *       value: 21
 *   },
 *   {
 *      //Ace and the any card of hearts
 *       cards: [1,'a'],
 *       value: 21123
 *   },
 *   {
 *      //Queen and any two cards
 *       cards: ['Queen', '*', '*'],
 *       value: 666
 *   },
 *   {
 *      //Pair of hearts =)
 *       cards: ['a','a'],
 *       value: 123
 *   }
 *  ]
 */
CardGameRules.combinations = [

];

/**
 * Value of card seeing special cards
 * 
 * @param {Card} card
 * 
 * @return {int} value
 */
CardGameRules.getCardValue = function(card){
    var value = CardGameRules.cardValues[card.value.number() - 1];
    
    for (var p in CardGameRules.specialCardValues) {
        if(p == card.value.name() || p == card.suit.name() || p == card.suit.letter() || p == card.toString())
        {
            var v = CardGameRules.specialCardValues[p];
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

/**
 * Summary value of cards seeing all rules
 * 
 * @param {Card[]} cards
 * 
 * @return {int} value
 */
CardGameRules.getCardsValue = function(cards){
    var value = 0;
//    if(cards.length == 2 && cards[0].value.number() == 1 && cards[1].value.number() == 1)
//        return 21;
    var cs = CardGameRules.combinations;
    for(var i = 0; i < cs.length; i++)
    {
        if(cs[i].cards.length != cards.length)
            continue;
        if(isCardsInArray(cards, cs[i].cards))
            return cs[i].value;
    }

    for (var i = 0; i < cards.length; i++) {
        value += CardGameRules.getCardValue(cards[i]);
    }
    return value;
}

/**
 * Check for combinations
 * 
 * @param {Card[]} cards, {Array} array
 */
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
    if(cards.length == 0)
        return true;
    if(array.length == 0)
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

CardGameRules.checkScore = function(score)
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

CardGameRules.checkStep = function(score){
    var min = 255;
    for (var i = 0; i < 52; i++) {
        var s = CardGameRules.getCardValue(new Card(i));
        if(s < min)
            min = s;
    }
    if(score < 17)
        return true;
    return false;
}

CardGameRules.banedValues = [];
CardGameRules.banedSuites = [];