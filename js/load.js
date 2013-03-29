/**
 * Created with JetBrains WebStorm.
 * User: kenjisaito
 * Date: 3/25/13
 * Time: 2:26 PM
 * To change this template use File | Settings | File Templates.
 */

var geneve_data;

$.getJSON("data/geneva_data.json", function (data_collection) {

    geneve_data = data_collection;

}).success(function () {
        console.log("second success");
    })
    .error(function () {
        console.log("error");
    })
    .complete(function () {
        console.log("complete");
    });