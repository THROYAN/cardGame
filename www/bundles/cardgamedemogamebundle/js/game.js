var animTime = 1000, nextCardSpeed = 10;

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
    
    var oneRow = 4;
    var temp = true;
    var show = function(){
        var i = 0;
        var t = setInterval(function(){
            if(temp)
                cards[i].animatedFly(100 * (i % oneRow), 50, true);
            else
                cards[i].animatedFly(100 * (oneRow - 1 - (i % oneRow)), 50, true);
            i++;
            if(i % oneRow == 0)
                temp = !temp;
            if(i >= 52)
            {
                clearInterval(t);
                $('#gameTable h').html('Click me again ;)))');
            }
        },nextCardSpeed);
    }
    
    $('#gameTable').click(show);
});