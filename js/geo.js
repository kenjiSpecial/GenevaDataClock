/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/26/13
 * Time: 2:50 PM
 * To change this template use File | Settings | File Templates.
 */
var geneva_map;
//geneva_map = {"northeast": {"lat": 46.23175, "lng": 6.175940000000001}, "southwest": {"lat": 46.17766, "lng": 6.1103201}}
geneva_map = {"northeast": {"lat": 46.3, "lng": 6.25}, "southwest": {"lat": 46.1, "lng": 6.05}}

var top_left_x, top_left_y, bottom_right_x, bottom_right_y;
top_left_x = geneva_map["southwest"]["lng"];
top_left_y = geneva_map["northeast"]["lat"];

bottom_right_x = geneva_map["northeast"]["lng"];
bottom_right_y = geneva_map["southwest"]["lat"];

var map_width, map_height;
map_width = bottom_right_x - top_left_x;
map_height = bottom_right_y - top_left_y;