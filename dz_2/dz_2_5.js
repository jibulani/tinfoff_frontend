function sum(a) {
	var result = a;

	function new_sum(b) {
		result += b;
		return new_sum;
	}

	new_sum.toString = function() {
    	return result;
    };

    return new_sum;
}

alert(sum(1)(2)(3));