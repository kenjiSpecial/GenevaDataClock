/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/25/13
 * Time: 5:10 PM
 * To change this template use File | Settings | File Templates.
 *
 * latitude: 緯度
 * longtitude: 経度
 * loc_data["coordinates"][0]: 経度 longtitude
 * loc_data["coordinates"][1]: 緯度 latitude
 */


function latitude_convert_context_pos(lat_val){
    return (lat_val - top_left_y) / map_height * window_height;
}

function longtitude_convert_context_pos(lng_val){
    return (lng_val - top_left_x) / map_width * window_width
}

function analyze_data_test_draw(data_sets_array){

    for(var i = 0; i < data_sets_array.length; i++){
        var loc_datas = data_sets_array[i];
        var max_datas_num = loc_datas.length;

        main_context.strokeStyle = "#fff";
        main_context.beginPath();
        for(var loc_num = 0; loc_num < max_datas_num; loc_num++){
            var loc_data = loc_datas[loc_num];
            var longtitude_pos_data = longtitude_convert_context_pos(loc_data["coordinates"][0]);
            var latitude_pos_data = latitude_convert_context_pos(loc_data["coordinates"][1]);


            if( loc_num == 0){
                main_context.moveTo(longtitude_pos_data, latitude_pos_data)
            }else{
                main_context.lineTo(longtitude_pos_data, latitude_pos_data)
            }

        }

        main_context.stroke();
        main_context.closePath();


        main_context.fillStyle = "#ff0000";
        main_context.beginPath();
        main_context.arc(longtitude_convert_context_pos(loc_data["coordinates"][0]), latitude_convert_context_pos(loc_data["coordinates"][1]), 10, 0, 2 * Math.PI, false);
        main_context.fill();
        main_context.closePath();


        main_context.fillStyle = "#0000ff";
        main_context.beginPath();
        main_context.arc(longtitude_convert_context_pos( loc_datas[0]["coordinates"][0]), latitude_convert_context_pos(loc_datas[1]["coordinates"][1]), 10, 0, 2 * Math.PI, false);
        main_context.fill();
        main_context.closePath();

    }

}

function draw_train(val){
    var log, lat;
    var location_datas = geneve_data[val];

    for(var i in location_datas){
        log = location_datas[i][0];
        lat = location_datas[i][1];

        main_context.fillStyle = "rgba(255, 255, 255, .8)";
        main_context.beginPath();
        main_context.arc(longtitude_convert_context_pos(log), latitude_convert_context_pos(lat), 1, 0, 2 * Math.PI, false);
        main_context.fill();
        main_context.closePath();
    }

}
