function Player(x, y, dx, dy, angle, cards)
{
    this.x = 0;
    this.y = 0;
    this.dx = 20;
    this.dy = 20;
    this.angle = 0;
    this.rowLength = 0;
    this.cards = [];
    this.width = 200;
    this.height = 100;
    this.zIndex = 10;
    
    if(x != null)
        this.x = x;
    if(y != null)
        this.y = y;
    if(dx != null)
        this.dx = dx;
    if(dy != null)
        this.dy = dy;
    if(angle != null)
        this.angle = angle;
    if(cards != null)
        this.cards = cards;
    
//    this.$ = function()
//    {
//        if($('#' + this.id).length == 0)
//            $('body').append('<div id="' + this.id + '" style="position: absolute; border: none;"></div>');
//        return $('#' + this.id);
//    }
    
    this.getCardPosition = function(card)
    {
        var i;
        if(typeof(card) == 'object' && card.constructor == Card)
        {
            i = jQuery.inArray(card, this.cards);
        }
        else
        {
            i = card;
        }
        var a = this.angle * Math.PI / 180;
        var x1 = this.x + (i % this.rowLength) * this.dx,
            y1 = this.y + Math.floor(i / this.rowLength) * this.dy;
    //            this.cards[i].x(this.x + (x1 - this.x) * Math.cos(a) - (y1 - this.y) * Math.sin(a));
    //            this.cards[i].y(this.y + (x1 - this.x) * Math.sin(a) + (y1 - this.y) * Math.cos(a));
    //            this.cards[i].angle(this.angle);
        return {
            x : this.x + (x1 - this.x) * Math.cos(a) - (y1 - this.y) * Math.sin(a),
            y : this.y + (x1 - this.x) * Math.sin(a) + (y1 - this.y) * Math.cos(a)
        };
    }
    
    this.refresh = function()
    {
//        this.$().css({
//            'width' : this.width + 'px',
//            'height' : this.height + 'px',
//            'left' : this.x + 'px',
//            'top' : this.y + 'px'
//        });
        if(this.rowLength == 0)
            this.rowLength = this.cards.length;
        
        for (var i = 0; i < this.cards.length; i++) {
//            var x1 = this.x + (i % this.rowLength) * dx,
//                y1 = this.y + Math.floor(i / this.rowLength) * dy;
//            this.cards[i].x(this.x + (x1 - this.x) * Math.cos(a) - (y1 - this.y) * Math.sin(a));
//            this.cards[i].y(this.y + (x1 - this.x) * Math.sin(a) + (y1 - this.y) * Math.cos(a));
//            this.cards[i].angle(this.angle);
//            var newX = this.x + (x1 - this.x) * Math.cos(a) - (y1 - this.y) * Math.sin(a),
//                newY = this.y + (x1 - this.x) * Math.sin(a) + (y1 - this.y) * Math.cos(a);
//            this.cards[i].hide();
//            this.cards[i].animatedFly(newX, newY, true, this.angle, 1000, 10);
            var pos = this.getCardPosition(i);
            this.cards[i].x(pos.x);
            this.cards[i].y(pos.y);
            this.cards[i].angle(this.angle);
            this.cards[i].$().css("z-index",i + this.zIndex);
            this.cards[i].refresh();
//X: x * Math.cos(a) - y * Math.sin(a),
//Y: x * Math.sin(a) + y * Math.cos(a)
        }
    }
    
    this.addCard = function(card)
    {
        this.cards.push(card);
        card.$().css("z-index",this.cards.length - 1 + this.zIndex);
    }
    
    this.animatedRefresh = function()
    {
        if(this.rowLength == 0)
            this.rowLength = this.cards.length;
        
        for (var i = 0; i < this.cards.length; i++) {
            var pos = this.getCardPosition(i);
            this.cards[i].animatedFly(pos.x, pos.y, null, this.angle, 1000, 10);
            this.cards[i].angle(this.angle);
            this.cards[i].refresh();
        }
    }
    
    this.showCards = function(show)
    {
        var c = this.cards;
        if(show == null)
        {
            for (var i = 0; i < c.length; i++) {
                c[i].show();
            }
        } else {
            switch(show)
            {
                case 'show':
                case true:
                    c.show();
                    break;
                case 'hide':
                case false:
                    c.hide();
                    break;
                case 'toggle':
                    c.toggle();
                    break;
            }
        }
    }
    this.hideCards = function()
    {
        this.showCards("hide");
    }
}