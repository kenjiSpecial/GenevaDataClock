/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/25/13
 * Time: 2:47 PM
 * To change this template use File | Settings | File Templates.
 */

var scale;

var Clock = (function () {

    var one_day = 60 * 24;
    var currentDate;
    var max_one_day_seconds;


    function Clock(context, wid, hig, rad) {
        this.context = context;
        this.window_width = wid;
        this.window_height = hig;
        this.center_x = wid / 2;
        this.center_y = hig / 2;
        this.rad = rad * .98;

        this.one_day_min = 1;
        this.scale = one_day / this.one_day_min;

//        the attribute of drawing line
        this.max_line_width = (wid * .8) | 0;
        this.line_height = 10;

        this.line_left = (wid * .1) | 0;
        this.line_top01 = hig - 120;
        this.line_top02 = hig - 100;

        max_one_day_seconds = 60 * 60 * 24;
    }

    Clock.prototype.change = function (value) {
        this.one_day_min = value;
        this.scale = one_day / this.one_day_min;
    };

    Clock.prototype.update = function () {
        currentDate = new Date();

        this.currentHour = currentDate.getHours();
        this.currentMinute = currentDate.getMinutes();
        this.currentSecond = currentDate.getSeconds();
        this.currentMilliseconds = currentDate.getMilliseconds();

        var currentSeconds = 60 * 60 * this.currentHour + 60 * this.currentMinute + this.currentSecond + this.currentMilliseconds / 1000;

        this.finalFutureSeconds = ((currentSeconds * this.scale) | 0) % max_one_day_seconds;

        this.finalFutureGetHours = (this.finalFutureSeconds / 3600) | 0;
        var minuteSeconds = this.finalFutureSeconds - this.finalFutureGetHours * 3600;
        this.finalFutureGetMinutes = ((this.finalFutureSeconds - this.finalFutureGetHours * 3600) / 60) | 0;
        this.finalFutureGetSeconds = minuteSeconds - this.finalFutureGetMinutes * 60;

//        this.current_line_width = currentSeconds / max_one_day_seconds * this.max_line_width;
//        this.future_line_width = this.finalFutureSeconds  / max_one_day_seconds  * this.max_line_width;

    };

    Clock.prototype.draw_clock = function () {
//        later
        this.clip_draw();
        this.frame_draw();

        this.scale_cloc_draw();
        this.clock_hand_draw();

    };

    Clock.prototype.scale_cloc_draw = function () {
        var start_angle = -0.5 * Math.PI
        var scale_clock_rad = this.rad * (0.92 - 0.5);

//        center point: (x, y) = (this.centerx, center_pos_y)
        var center_pos_y = this.center_x + scale_clock_rad + this.rad * 0.05;


//        drawing of the frame

        this.context.beginPath();
        this.context.strokeStyle = "rgba(255, 255, 255, .6)";
        this.context.lineWidth = 1;
        this.context.arc(this.center_x, center_pos_y, scale_clock_rad, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.closePath();

        var max_num = 4;

        for (var i = 0; i < max_num; i++) {
            this.context.beginPath();
            this.context.lineWidth = 3;
            this.context.moveTo(this.center_x + scale_clock_rad * Math.cos(i / max_num * 2 * Math.PI) * .96, center_pos_y + scale_clock_rad * Math.sin(i / max_num * 2 * Math.PI) * .96);
            this.context.lineTo(this.center_x + scale_clock_rad * Math.cos(i / max_num * 2 * Math.PI) * 0.88, center_pos_y + scale_clock_rad * Math.sin(i / max_num * 2 * Math.PI) * 0.88);
            this.context.strokeStyle = "#fff";
            this.context.stroke();
            this.context.closePath();
        }


//        var tempCurrentHour;

        if (this.currentHour > 12) {
            tempCurrentHour = this.finalFutureGetHours - 12;
        } else {
            tempCurrentHour = this.finalFutureGetHours;
        }

        var hour_rate = (tempCurrentHour + this.finalFutureGetMinutes / 60) / 12;
        var hour_angle = hour_rate * Math.PI * 2 + start_angle;

        this.context.beginPath();
        this.context.lineWidth = scale_clock_rad / 18;
//        this.context.lineWidth = 8;
        this.context.moveTo(this.center_x + scale_clock_rad * Math.cos(hour_angle) * 0.6, center_pos_y + scale_clock_rad * Math.sin(hour_angle) * 0.6);
        this.context.lineTo(this.center_x + scale_clock_rad * Math.cos(hour_angle) * (-0.2), center_pos_y + scale_clock_rad * Math.sin(hour_angle) * (-0.2));
        this.context.strokeStyle = "rgba(255, 255, 255, 1)";
        this.context.stroke();
        this.context.closePath();

//        minute hand

//        var minute_rate = (this.finalFutureGetMinutes + this.finalFutureGetSeconds / 60) / 60;
//        var minute_angle = minute_rate * Math.PI * 2 + start_angle;
//
//        this.context.beginPath();
//        this.context.lineWidth = scale_clock_rad / 40 > 2 ? this.rad / 40 : 1;
//
//        this.context.moveTo(this.center_x + scale_clock_rad * Math.cos(minute_angle) * 0.8, center_pos_y + scale_clock_rad * Math.sin(minute_angle) * 0.8);
//        this.context.lineTo(this.center_x + scale_clock_rad * Math.cos(minute_angle) * (-0.1), center_pos_y + scale_clock_rad * Math.sin(minute_angle) * (-0.1));
//        this.context.strokeStyle = "rgba(255, 255, 255, 1)";
//        this.context.stroke();
//        this.context.closePath();

//        center circle
        this.context.beginPath();
        var temp_rad = scale_clock_rad / 40 > 2 ? this.rad / 40 : 1;
        this.context.arc(this.center_x, center_pos_y, temp_rad, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba( 164, 0, 19, 1)";
        this.context.fill();
        this.context.closePath();

        this.context.beginPath();
        temp_rad = 1;
        this.context.arc(this.center_x, center_pos_y, temp_rad, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba( 200, 200, 200, 1)";
        this.context.fill();
        this.context.closePath();

    };

    Clock.prototype.clock_hand_draw = function () {
        var start_angle = -0.5 * Math.PI

//        hour hand
        var tempCurrentHour;

        if (this.currentHour > 12) {
            tempCurrentHour = this.currentHour - 12;
        } else {
            tempCurrentHour = this.currentHour;
        }

        var hour_rate = (tempCurrentHour + this.currentMinute / 60) / 12;
        var hour_angle = hour_rate * Math.PI * 2 + start_angle;

        this.context.beginPath();
        this.context.lineWidth = this.rad / 18;
//        this.context.lineWidth = 8;
        this.context.moveTo(this.center_x + this.rad * Math.cos(hour_angle) * 0.6, this.center_y + this.rad * Math.sin(hour_angle) * 0.6);
        this.context.lineTo(this.center_x + this.rad * Math.cos(hour_angle) * (-0.2), this.center_y + this.rad * Math.sin(hour_angle) * (-0.2));
        this.context.strokeStyle = "rgba(255, 255, 255, 1)";
        this.context.stroke();
        this.context.closePath();


//        minute hand

        var minute_rate = (this.currentMinute + this.currentSecond / 60) / 60;
        var minute_angle = minute_rate * Math.PI * 2 + start_angle;

        this.context.beginPath();
        this.context.lineWidth = this.rad / 40 > 2 ? this.rad / 40 : 2;

        this.context.moveTo(this.center_x + this.rad * Math.cos(minute_angle) * 0.8, this.center_y + this.rad * Math.sin(minute_angle) * 0.8);
        this.context.lineTo(this.center_x + this.rad * Math.cos(minute_angle) * (-0.1), this.center_y + this.rad * Math.sin(minute_angle) * (-0.1));
        this.context.strokeStyle = "rgba(255, 255, 255, 1)";
        this.context.stroke();
        this.context.closePath();

//        second hand

        var second_rate = (this.currentSecond + this.currentMilliseconds / 1000) / 60 ;
        var second_angle = second_rate * Math.PI * 2 + start_angle;

        this.context.beginPath();
        this.context.lineWidth = this.rad / 60 > 1 ? this.rad / 40 : 2;

        this.context.moveTo(this.center_x + this.rad * Math.cos(second_angle) * 0.9, this.center_y + this.rad * Math.sin(second_angle) * 0.9);
        this.context.lineTo(this.center_x + this.rad * Math.cos(second_angle) * (-0.2), this.center_y + this.rad * Math.sin(second_angle) * (-0.2));
        this.context.strokeStyle = "rgba( 164, 0, 19, 1)";
        this.context.stroke();
        this.context.closePath();

//        center point
        this.context.beginPath();
        var temp_rad = this.rad / 25;
        this.context.arc(this.center_x, this.center_y, temp_rad, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba( 164, 0, 19, 1)";
        this.context.fill();
        this.context.closePath();

        this.context.beginPath();
        temp_rad = 2;
        this.context.arc(this.center_x, this.center_y, temp_rad, 0, 2 * Math.PI, false);
        this.context.fillStyle = "rgba( 200, 200, 200, 1)";
        this.context.fill();
        this.context.closePath();

    };

    Clock.prototype.frame_draw = function () {
//        var start_ang = -1 / 2 * Math.PI;
//        console.log("frame_draw")
        var max_num = 60;

        this.context.globalCompositeOperation = 'source-over';

        for (var i = 0; i < max_num; i++) {

            if (i % 5 == 0 && i != 15) {
                this.context.beginPath();
                this.context.lineWidth = this.window_width / 80;
                this.context.moveTo(this.center_x + this.rad * Math.cos(i / max_num * 2 * Math.PI) * .96, this.center_y + this.rad * Math.sin(i / max_num * 2 * Math.PI) * .96);
                this.context.lineTo(this.center_x + this.rad * Math.cos(i / max_num * 2 * Math.PI) * 0.88, this.center_y + this.rad * Math.sin(i / max_num * 2 * Math.PI) * 0.88);
                this.context.strokeStyle = "#fff";
                this.context.stroke();
                this.context.closePath();
            } else {
                this.context.beginPath();
                this.context.lineWidth = this.window_width / 120;
                this.context.moveTo(this.center_x + this.rad * Math.cos(i / max_num * 2 * Math.PI) * .96, this.center_y + this.rad * Math.sin(i / max_num * 2 * Math.PI) * .96);
                this.context.lineTo(this.center_x + this.rad * Math.cos(i / max_num * 2 * Math.PI) * 0.92, this.center_y + this.rad * Math.sin(i / max_num * 2 * Math.PI) * 0.92);
                this.context.strokeStyle = "#fff";
                this.context.stroke();
                this.context.closePath();
            }

        }
    };

    Clock.prototype.clip_draw = function () {
//        later
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.window_width, this.window_height);

        this.context.globalCompositeOperation = "destination-out";

        this.context.beginPath();
        this.context.fillStyle = "#00ff00";
        this.context.arc(this.window_width / 2, this.window_height / 2, this.rad, 0, 2 * Math.PI, false);
        this.context.fill();
        this.context.closePath();

        this.context.globalCompositeOperation = 'source-over';
        this.context.beginPath();
        this.context.lineWidth = 3;
        this.context.strokeStyle = "#fff";
        this.context.arc(this.window_width / 2, this.window_height / 2, this.rad, 0, 2 * Math.PI, false);
        this.context.stroke();
        this.context.closePath();

    };

    Clock.prototype.resize = function (wid, hig, rad) {

        this.window_width = wid;
        this.window_height = hig;
        this.center_x = wid / 2;
        this.center_y = hig / 2;
        this.rad = rad * .98;
    };

    return Clock
})();