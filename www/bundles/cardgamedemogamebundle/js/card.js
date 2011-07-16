function Card(value, suit, container){
/**
 * <private variables>:
 */
    var i = 0;
    var canvas;
    var context;
    var width,height;
    var img;
    var angle = 0;
    var hidden = false;
    
/**
 * <constructors>:
 */
    function myConstructor(object,value,suit,container)
    {
        // new Card()
        if(value == null)
            i = 0;
        else
        //new Card(50)
        if(suit == null)
            i = value;
        //new Card(1,c)
        else
        {
            object.value.number(value);
            object.suit.letter(suit);
        }
        if(container != null)
        {
            container.append(object.tag());
            var jqObject = object.$();
            jqObject.css('position','absolute');
            jqObject.draggable({
                start: function(event,ui)
                {
                    $(this).css('border','solid 2px #0f0');
                },
                stop: function(event,ui)
                {
                    $(this).css('border','none')
                }
            });
            canvas = object.element();
            context = canvas.getContext("2d");
            img = object.getImage();
            width = img.width;
            height = img.height;
           
            $(img).load(function()
            {
                object.refresh();
            });
        }
        else
        {
            img = object.getImage();
        }
    }
    
/**
 * <public properties>:
 */
    /**
     * Value of the card
     * 
     * @return object{int value, string name, int index}
     */
    this.value = {
        //number of card[1,2,..,13]
        number:function(value){
            if(value == null)
            //get
            {
                return Math.ceil((i + 1)/4);
            }
            else
            //set
            {
                if(value < 0 || value > 13)
                    return;
                i = (value - 1) * 4 + i % 4;
            }
        },
        //index of card[0,1,..,52]
        index:function(value){
            if(value == null)
            //get
            {
                return i;
            }
            else
            //set
            {
                i = (value % 52 + 52) % 52;
            }
        },
        //Value of card[Ace,2,..,King]
        name:function(){
            var value = 'Ace';
            switch(Math.ceil((i + 1)/4))
            {
                case 1:
                    value = 'Ace';
                    break;
                case 11:
                    value = 'Jack';
                    break;
                case 12:
                    value = 'Queen';
                    break;
                case 13:
                    value = 'King';
                    break;
                default:
                    value = Math.ceil((i + 1)/4);
                    break;
            }
            return value;
        }
    }
    
    /**
     * Suit of the card
     * 
     * @return object{string value, string name}
     */
    this.suit = {
        //letter, that's means suit
        //[a,b,c,d]
        letter:function(value)
        {
            if(value == null)
            //get
            {
                return String.fromCharCode(97 + i % 4);
            }
            else
            //set
            {
                var chCode = value.charCodeAt(0) - 97;
                if(chCode < 0 || chCode > 3)
                    return;
                i = i - (i % 4) + chCode;
            }
        },
        //[hearts, diamonds, spaces, clubs]
        name:function()
        {
            var suit = 'heards';
            switch(i % 4)
            {
                case 0:
                    suit = 'heards';
                    break;
                case 1:
                    suit = "diamonds";
                    break;
                case 2:
                    suit = 'spades';
                    break;
                case 3:
                    suit = 'clubs';
                    break;
            }
            return suit;
        }
    }
    
    this.x = function(value){
        if(value == null)
        //get
        {
            //return this.Img().position().left;
            return parseInt(this.$().css('left'));
        }
        else
        //set
        {
            this.$().css('left',value);
        }
    }
    
    this.y = function(value){
        if(value == null)
        //get
        {
            return parseInt(this.$().css('top'));
        }
        else
        //set
        {
            this.$().css('top',value);
        }
    }
    
    this.imgWidth = function(value){
        if(value == null)
        //get
        {
            return width;
        }
        else
        //set
        {
            width = value;
        }
    }
    
    this.imgHeight = function(value){
        if(value == null)
        //get
        {
            return height;
        }
        else
        //set
        {
            height = value;
        }
    }
    
    this.angle = function(value){
        if(value == null)
        //get
        {
            return angle;
        }
        else
        //set
        {
            angle = (value % 360 + 360) % 360;
            this.refresh();
        }
    }
    
/**
 * <public>(privileged) <methods>:
 * They have access to private variables!
 */
    /*
     * Value and suit
     * 
     * @return string
     */
    this.toString = function()
    {
        return this.value.name() + ' of ' + this.suit.name();
    }

    /**
     * Card image src
     * 
     * @return string
     */
    this.calculateFileName = function()
    {
        if(hidden)
            return '/bundles/cardgamedemogamebundle/images/cards/back.gif';
        return '/bundles/cardgamedemogamebundle/images/cards/' + this.value.number() + this.suit.letter() + '.gif';
    }

    /**
     * Id for img tag
     * 
     * @return string
     */
    this.generateId = function()
    {
        return this.value.name() + this.suit.name();
    }

    /**
     * HTML img tag
     * 
     * @return string
     */
    this.tag = function()
    {
        return '<canvas id="' + this.generateId() + '"></canvas>';
    }

    /**
     * Get a JQuery object
     */
    this.$ = function()
    {
        return $('#' + this.generateId());
    }
    
    this.element = function()
    {
        return document.getElementById(this.generateId());
    }
    
    this.getImage = function()
    {
        var img = new Image();
        img.src = this.calculateFileName();
        return img;
    }
    
    this.hide = function()
    {
        hidden = true;
        this.refresh();
    }
    
    this.show = function()
    {
        hidden = false;
        this.refresh();
    }
    
    this.toggle = function()
    {
        hidden = !hidden;
        this.refresh();
    }
    
    this.refresh = function()
    {
        if(canvas == null || img == null)
            return;
        
        canvas.id = this.generateId();
        
        var tempImg = this.getImage();
        if(img.src == tempImg.src)
        {
            canvas.width = this.imgWidth();
            canvas.height = this.imgHeight();

            var h = this.imgHeight(),w = this.imgWidth(), a = this.angle() * Math.PI / 180;
            var g = Math.sqrt(Math.pow(h, 2) + Math.pow(w, 2));
            canvas.width = w = 
                canvas.height = h = g;
            context.translate(w/2,h/2);
            context.rotate(a);
            
            context.drawImage(img, -this.imgWidth()/2,-this.imgHeight()/2, this.imgWidth(), this.imgHeight());
        }
        else
        {
            img.src = tempImg.src;
        }
    }
    
    this.animatedFly = function(x,y,show,toAngle,animTime,angleStep)
    {
        if(typeof(toAngle) != 'number')
            toAngle = 0;
        if(x == null || y == null)
            return;
        if(animTime == null)
            animTime = 1000;
        if(angleStep == null)
            angleStep = 4;
        var c = this;
        this.$().animate({
            left : x,
            top : y
        },
        {
            duration : animTime,
            step : function()
            {
                c.angle(c.angle() + angleStep);
            },
            easing: '',
            complete: function()
            {
                var eps = 4;
                var t = setInterval(function(){
                    c.angle(c.angle() + angleStep);
                    if(Math.abs(c.angle() - toAngle) < eps || Math.abs(c.angle() - (toAngle + 180) % 360) < eps)
                    {
                        c.angle(toAngle);
                        clearInterval(t);
                        if(show || show == null)
                            c.show();
                    }
                },animTime / 100);
            }
        });
    }
       
    myConstructor(this, value, suit, container);
}