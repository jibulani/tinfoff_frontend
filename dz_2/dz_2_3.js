var array = [[1,2], [3,4,5], [6]];
var new_array = array.reduce(function(result, current_arr){
	return result.concat(current_arr);
});
alert(new_array);