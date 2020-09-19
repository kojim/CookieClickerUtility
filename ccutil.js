// for Cookie Clicker version 2.029

if (Game._Loop === undefined) {
    Game._Loop = Game.Loop;
}
Game.Loop = function() {
    if (Game.shimmers.length != 0) {
      Game.shimmers[0].pop();
    }
    Game._Loop();
}

function TimeBeautify(sec) {
    function f(s) {
        if ((''+s).length == 1) {
            return '0' + s;
        }
        return s;
    }
    var d = Math.floor(sec/60/60/24);
    var h = Math.floor((sec/60/60)%24);
    var m = Math.floor((sec/60)%60);
    var s = Math.floor(sec%60);
    return ((d>0) ? (d + 'd ') : '') + h + ':' + f(m) + ':' + f(s);
}

for (var i in Game.Objects) {

    var me=Game.Objects[i];
    if (me._rebuild === undefined) {
        me._rebuild = me.rebuild;
    }
    (function(me) {
        me.rebuild = function() {
            me._rebuild();
            var baseCps = (Game.frenzy > 0) ? (Game.cookiesPs/Game.frenzyPower) : Game.cookiesPs;
            var appendText = '(' + TimeBeautify((me.price/baseCps).toFixed(0)) + ')<br/><span class="price">'+(Math.log(me.storedCps/me.price)/Math.log(10)).toFixed(4)+'</span>';
            l('productPrice'+me.id).innerHTML=Beautify(Math.round(me.price)) + appendText;
        }
    })(me);
    me.rebuild();
}
