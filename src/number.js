
var factorialZeros = function(n) {
    var i=1, f5=0, m;
    while((m=Math.pow(5,i))<n) {
      f5+=Math.floor(n/m);
      i+=1;
    }
    return f5;
};

console.log(factorialZeros(100));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_A.pdf
// Question: Target Sum

var target_sum_hash = function(target, ar) {
    var i=0, len=ar.length, hash = {};
    for (; i<len; i+=1) {
        if (hash[ar[i]]) return true;
        hash[target-ar[i]] = true;
    }
    return false;
};

var target_sum_pointer = function(target, ar) {
    var i=0, j=ar.length-1;
    ar.sort(function(a,b) { return +a-(+b);});
    while (i<j) {
        while (ar[i]+ar[j]<target && ar[i]!=null) { i+=1; }
        if (ar[i]==null) { return false; }
        if (ar[i]+ar[j]==target) return true;

        while (ar[i]+ar[j]>target && ar[j]!=null) { j-=1; }
        if (ar[j]==null) { return false; }
        if (ar[i]+ar[j]==target) return true;
    }
    return false;
};

var ar = [8,2,6,3,4,3,9,1];
console.log(target_sum_pointer(60,ar));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Odd Man Out 2014/4/13 16:00-16:16

var find_odd_hash = function(ar) {
    var i=0, len=ar.length, hash = {};
    for(; i<len; i+=1) {
        if (hash[ar[i]]) {
            delete hash[ar[i]];
        } else {
          hash[ar[i]] = true;      
        }
    }
    return Object.keys(hash).shift();
};

// Super awesome!!!
var find_odd_xor = function(ar) {
    return ar.reduce(function(ac,n) {
        return ac^n;
    }, 0);
};

var ar2 = [0,9,5,7,9,2,3,5,0,2,3];
console.log(find_odd_hash(ar2));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Maximal Subarray 18:44-19:25

var max_subarray_memo = function(ar) {
    var i=0, j, len=ar.length, prev, memo=[], m_end, m_start, max = Number.MIN_VALUE;
    for (; i<len; i+=1) {
        memo[i] = [];
        for (j=0; j<=i; j+=1) {
            prev = memo[i-1]==null? 0 : memo[i-1][j] || 0;
            memo[i][j] = prev+ar[i];
        }
    }
    memo.forEach(function(xs, end) {
        xs.forEach(function(val, start) {
            if (val>=max) {
                m_start = start; m_end = end;
                max = val;
            }
        });
    });
    return ar.slice(m_start, m_end+1);
};

var max_subarray = function(ar) {
    var x, i=0, len=ar.length, max_ending_here = max_so_far = 0;
    for (; i<len; i+=1) {
        x = ar[i];
        max_ending_here = Math.max(0, max_ending_here + x);
        max_so_far = Math.max(max_so_far, max_ending_here);
    }
    return max_so_far;
};

var ar = [1, -3, 5, -2, 9, -8, -6, 4];

console.log(max_subarray(ar));

//ar2 = [-1, -3, -5, -2, -9, -8, -6, -4];
//console.log(max_subarray(ar2));

var factors = function(n) {
    var i=2, result=[];
    for (;i<=n/2; i+=1) {
        if (n % i==0) { result.push(i); }
    }
    return result;
};

console.log(factors(20));

var isPower = function(_a, b) {
    var a = _a
    while(a % b ==0) {
        a /= b;
    }
    return a==1 ? true : false;
};

console.log(isPower(10000,101));

// http://www.geeksforgeeks.org/find-number-zeroes/
// 2014/4/14 22:20?-22:43

// 1,1,1,*1,0,0,0 / len = 7
// mid = 3 5 4
// begin/end = 0/7 3/7 3/5

// 0,0,0,0,0,0,0 / len = 7
// mid = 3 1 0
// begin/end = 0/7 0/3 0/1

// 1,1,1,1,1,1,1 / len = 7
// mid = 3 5 6
// begin/end = 0/7 3/7 5/7

var zero_count = function(ar) {
    var len = ar.length, n, begin=0, end=len, mid, head_0_i;

    while (true) {
        mid = begin + Math.floor((end-begin)/2);
        n = ar[mid];
        if (n===1) {
            if (mid==len-1) { head_0_i = len; break; }
            begin = mid;
        } else {
            if (mid==0 || ar[mid-1]==1) { head_0_i = mid; break; }
            end = mid;
        }
    }
    return len-head_0_i;
};

console.log(zero_count([1,1,1,1,0,0,0]));

// http://www.geeksforgeeks.org/find-if-there-is-a-subarray-with-0-sum/
// 2014/4/14 23:00-

var has_zero_sum = function(ar) {
    var i=0, len=ar.length, j, sum;
    for (; i<len; i+=1) {
        sum = 0;
        for (j=i; j<len; j+=1) {
            sum += ar[j];
            if (sum===0) { return true; }
        }
    }
    return false;
};
console.log(has_zero_sum([-3, 2, 3, 1, 6]));

var merge_arrays = function(ars) {
  return ars.reduce(function(acc, array) {
    return _merge(array, acc);
  }, []);
};
var _merge = function(ar1, ar2) {
  var result = [], l_i=0, r_i=0, left, right, l_len=ar1.length, r_len=ar2.length;
  while(l_i<l_len || r_i<r_len) {
    left  = ar1[l_i] || Number.MAX_VALUE;
    right = ar2[r_i] || Number.MAX_VALUE;
    if (left<=right) {
      result.push(ar1[l_i]); l_i+=1;
    } else {
      result.push(ar2[r_i]); r_i+=1;
    }
  }
  return result;
};

console.log(merge_arrays([
  [2, 5, 10], 
  [25, 100, 105], 
  [7, 56, 42]
]));

var arbitrary_mult_ll = function(l1, l2) {
  var carrier, head={ val: 0, next: null, prev: null }, base=head, c1=l1, c2=l2, cr, c2_h=c2, tail;
  while (c1 != null) {
    cr = base;
    while(c2 != null) {
      cr.val += c1.val * c2.val;
      c2 = c2.next;
      if (c2 != null) {
	cr.next = cr.next || { val: 0, next: null, prev: cr };
	cr = cr.next;
      }
      tail = cr;
    }
    c1 = c1.next;
    c2 = c2_h;
    if (c1 != null) {
      base.next = base.next || { val: 0, next: null, prev: base };
      base = base.next;
    }
  }
  // Handle carrier
  cr = tail;
  while (cr != null) {
    carrier = Math.floor(cr.val / 10);
    cr.val = cr.val % 10;
    if (carrier>0) {
      cr.prev = cr.prev || { val: 0, next: cr, prev: null };
      cr.prev.val += carrier;
    }
    cr = cr.prev;
  }
  head = head.prev || head;

  // Print
  var ret="";
  cr = head;
  while (cr != null) {
    ret += cr.val;
    cr = cr.next;
  }
  console.log(ret);
};

arbitrary_mult_ll(
  {val:4, next: {val:5, next: {val: 6, next:null}}},
  {val:7, next: {val:8, next: null}}
);

var inplace_map = function(ar) {
  var i, len=ar.length, org;
  for (i=0; i<len; i+=1) {
    org = ar[ar[i]] % len;
    ar[i] += org*len;
  }
  for (i=0; i<len; i+=1) {
    ar[i] = Math.floor(ar[i]/len);
  }
  return ar;
};

console.log(inplace_map([2,3,1,0]));