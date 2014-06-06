// 2014/4/11 2:29-2:43

var a = [0,1,2,3,4,5,6,7,8,9];

var bsearch_rec = function(a, i) {
  var len = a.length,
      mid_i = Math.floor(len/2),
      mid = a[mid_i];
  if (mid===i) { return mid; }
  if (len < 1) { return -1; }
  if (mid<i) {
    return bsearch(a.slice(mid_i+1), i);
  } else {
    return bsearch(a.slice(0,mid_i), i);
  }
};

var bsearch = function(ar, target) {
  var mid,
      len = ar.length,
      lo  = 0,
      hi  = len;
  while (lo<hi) {
    mid = Math.floor((hi-lo)/2)+lo;
    if (ar[mid]===target) { return mid; }
    if (ar[mid]>target) {
      hi = mid-1;
    } else {
      lo = mid+1;
    }
  }
  return -1;
};

console.log(bsearch(a,0));
console.log(bsearch(a,3));
console.log(bsearch(a,8));
console.log(bsearch(a,9));
console.log(bsearch(a,-1));
console.log(bsearch(a,10));
console.log(bsearch(a,3.5));

var find_rotated_index = function(ar, start, end) {  
  var i=0, len=ar.length, mid;

  start = start==null ? 0 : start;
  end = end==null ? ar.length-1 : end;

  mid=Math.floor((start+end)/2);
  if (ar[mid] <= ar[0])  {
    if (ar[mid-1]==null) return 0;
    if (ar[mid-1]>ar[mid]) return mid;
    return find_rotated_index(ar, start, mid-1);
  } else {
    if (ar[mid+1]==null) return ar.length-1;
    if (ar[mid+1]<ar[mid]) return (mid+1);
    return find_rotated_index(ar, mid+1, end);
  }
};

console.log("find rotated index");
console.log(find_rotated_index([15,16,19,20,25,30,31,1,10,14]));