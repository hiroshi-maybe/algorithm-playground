var fizzbuzz = function(end) {
	var i = 1, fizz, buzz;

	for (; i<end; i+=1) {
		fizz = i%3===0 ? "fizz" : "";
        buzz = i%5===0 ? "buzz" : "";
        console.log(fizz+buzz||i);
   } 
};

fizzbuzz(100);