var array = [1, 3, 5, 7, 9];
var arr2 = [1, 2, 3, 4];
alert(intersect(array, arr2));
function intersect(arr1, arr2) {
    var dict = {};
    var intersection = [];
    for (var i = 0; i < arr2.length; i++) {
        dict[arr2[i]] = true;
    }
    for (var j = 0; j < arr1.length; j++) {
        if (dict[arr1[j]]) {
        	intersection.push(arr1[j]);
        }
    }
    return intersection;
}