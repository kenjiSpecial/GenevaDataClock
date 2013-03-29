/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/27/13
 * Time: 7:41 AM
 * To change this template use File | Settings | File Templates.
 */

function loop(){

//    moji_context.clearRect(0, 0, window_width, window_height);
//    main_context.clearRect(0, 0, window_width, window_height);
    main_context.fillStyle = "rgba(0, 0, 0, .02)";
    main_context.fillRect(0, 0, window_width, window_height);

    mainClock.update();
    mainClock.draw_clock();



    if(geneve_data){
        var val = mainClock.finalFutureSeconds;
        draw_train(val);
    }

    requestAnimFrame(loop);
}

loop();
