function toBinary(value, result) {
	result = result || '';
	if (Math.floor(value/2) > 1) {
  		return toBinary(Math.floor(value/2), (value % 2) + result);
	}
	return Math.floor(value/2) + "" + (value % 2) + result;
}
alert(toBinary(11));