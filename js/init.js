/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/26/13
 * Time: 2:13 PM
 * To change this template use File | Settings | File Templates.
 */

var clock_canvas, clock_context;
var main_canvas, main_context;
var cover_canvas, cover_context;

var window_width, window_height;
var clock_radius;

var canvas_top, canvas_left;

var resize = function(){
    window_width = window.innerWidth;
    window_height = window.innerHeight;

    clock_radius = window_width > window_height? ((window_height * 0.96)/2)|0 : ((window_width * 0.96)/2)|0;

    canvas_top = (window_height - clock_radius * 2)/2;
    canvas_left = (window_width - clock_radius * 2)/2;


    main_canvas.width = main_canvas.height = clock_radius * 2;
    clock_canvas.width = clock_canvas.height = clock_radius * 2;

    $("canvas#clock").css({
        "left" : canvas_left + "px",
        "top" : canvas_top + "px"
    });

    $("canvas#main").css({
        "left" : canvas_left + "px",
        "top" : canvas_top + "px"
    });

};


clock_canvas = document.getElementById("clock");
clock_context = clock_canvas.getContext("2d");

main_canvas = document.getElementById("main");
main_context = main_canvas.getContext("2d");

cover_canvas = document.getElementById("cover");
cover_context = cover_canvas.getContext("2d");


resize();

var mainClock = new Clock(clock_context, clock_radius * 2, clock_radius * 2, clock_radius);


$(window).resize(function(){
    resize();

    clock.resize(clock_radius * 2, clock_radius * 2, clock_radius);
});
