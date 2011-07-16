var animTime = 1000, nextCardSpeed = 100;

$(function(){
    $('#gameTable').append('<H>Click me!!! ;)</H>')
    var cards = [];
    for (var i = 0; i < 52; i++) {
        cards[i] = new Card(i, null, $('#gameTable'));
        cards[i].imgWidth(40);
        cards[i].imgHeight(60);
        cards[i].x(280);
        cards[i].y(450);
        cards[i].hide();
    }
    var show = function(){
        var i = 0;
        var t = setInterval(function(){
            
            cards[i].animatedFly(100 * (i % 4), 50, true);
            i++;
            if(i >= 52)
            {
                clearInterval(t);
                $('#gameTable h').html('Click me again ;)))');
            }
        },100);
    }
    
    $('#gameTable').click(show);
});