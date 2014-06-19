
// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 20.3

var shuffle = function(ar) {
  var i, len=ar.length, selected_i, temp,
      random = function(n) {
	return Math.floor(Math.random()*n);
      };
  for (i=len; i>0; i-=1) {
    selected_i = random(i);
    temp = ar[selected_i]; ar[selected_i]=ar[i-1]; ar[i-1]=temp;
  }
  return ar;
};

console.log(shuffle([1,2,3,4,5]));