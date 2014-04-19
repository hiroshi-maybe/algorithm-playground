// 2014/4/11 2:29-2:43

var a = [0,1,2,3,4,5,6,7,8,9];

var bsearch = function(a, i) {
  	var len = a.length,
    	mid_i = Math.floor(len/2),
    	mid = a[mid_i];
	if (mid===i) { return true; }
	if (len < 1) { return false; }
	if (mid<i) { return bsearch(a.slice(mid_i+1), i); }
	else { return bsearch(a.slice(0,mid_i), i); }
};

console.log(bsearch(a,0));
console.log(bsearch(a,3));
console.log(bsearch(a,8));
console.log(bsearch(a,9));
console.log(bsearch(a,-1));
console.log(bsearch(a,10));
console.log(bsearch(a,3.5));