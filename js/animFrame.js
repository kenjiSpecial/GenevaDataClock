/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/26/13
 * Time: 2:28 PM
 * To change this template use File | Settings | File Templates.
 */

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();

