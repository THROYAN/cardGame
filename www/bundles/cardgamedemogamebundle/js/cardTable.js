function CardTable()
{
    this.animTime = 500;
    this.nextCardSpeed = 100;
    this.angleStep = 5;
    this.x = 100;
    this.y = 100;
    this.banedValues = [];
    this.banedSuites = [];//'a','b','c','d'
    this.cardsCount = 52;
    this.deckAngle = 0;
    this.zIndex = 10;
    
    this.players = [];
    this.deck = [];
    
    this.id = "gameTable";
    this.cardsCssClass = 'gameTableCards';
    
    this.$ = function()
    {
        if($('#' + this.id).length == 0)
            $('body').append('<div id="' + this.id + '" style="width:800px;height:600px;background-color:#0f0"></div>');
        return $('#' + this.id);
    }
    
    function myConstructor(object)
    {
        
    }
    
    this.reloadDeck = function()
    {
        delete this.deck;
        $('#' + this.id + ' .' + this.cardsCssClass).remove();
        //this.$().html();
        this.cardsCount = 52 - this.banedValues.length * 4;
        this.cardsCount -=  this.banedSuites.length * this.cardsCount / 4
        this.deck = [this.cardsCount];
        for (var i = 0; i < this.players.length; i++) {
            this.players[i].cards = [];
        }
    }
    
    /**
     * Randomize cards in deck
     * 
     * @param {Array of cards} cards - if cards not null, then the deck
     * have built on this cards and it's animated! Else the deck was randomized
     * and refreshed in that's place.
     */
    this.randomizeDeck = function(cards)
    {
        if(cards == null)
        {
            this.reloadDeck();
            for (var i = 0; i < this.cardsCount; i++) {   
                //select a random card
                var r, temp;
                do
                {
                    r = randomInt(52);
                    temp = new Card(r);
                    temp.id(this.id);
                }
                while(
                    temp.$().length > 0
                        || jQuery.inArray(temp.value.number(), this.banedValues) != -1
                        || jQuery.inArray(temp.suit.letter(), this.banedSuites) != -1
                );
                delete temp;

                this.deck[i] = new Card(r, null, this.$(), this.cardsCssClass);
                this.deck[i].id(this.id);
                this.deck[i].scale = 0.6;
                this.deck[i].x(this.x);
                this.deck[i].y(this.y);
                this.deck[i].angle(this.deckAngle);
                this.deck[i].$().css("z-index",this.zIndex + i);
                this.deck[i].hide();
            }
        }
        else
        {
            delete this.deck;
            this.deck = [];
            this.cardsCount = cards.length;
            for (var i = 0; i < this.cardsCount; i++) {   
                //select a random card
                var r = randomInt(cards.length);
                var c = cards[r];
                cards.remove(r,r);
                this.backToDeck(c);
                
            }
        }
    }
    
    this.addCard = function(card)
    {
        this.deck.push(card);
        card.$().css("z-index",this.deck.length - 1 + this.zIndex);
    }
    
    this.deal = function(player, count, show)
    {
        var l = this.deck.length;
        if(l == 0)
            return;
        var table = this;
        var cards = [Math.min(count, l)];
        var i;
        for (i = 0; i < count && i < l; i++) {
            cards[i] = this.deck.shift();
            player.addCard(cards[i]);
        }
        i = 0;
        var t = setInterval(function()
        {
            if(i >= cards.length)
            {
                clearInterval(t);
                return;
            }
            var pos = player.getCardPosition(cards[i]);
            cards[i].animatedFly(pos.x, pos.y, show, player.angle, table.animTime, this.angleStep);
            
            i++;
        }, 100);
    }
    
    /**
     * Return card(s) to deck
     * 
     * @param card | player
     */
    this.backToDeck = function(card)
    {
        if(card.constructor == Card)
        {
            this.addCard(card);
            card.animatedFly(this.x, this.y, "hide", this.deckAngle, this.animTime, this.angleStep);
        } else {
            var player = card;
            var l = player.cards.length;
            for (var i = 0; i < l; i++) {
                this.backToDeck(player.cards.pop());
            }
        }
    }
    myConstructor(this);
}

Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};