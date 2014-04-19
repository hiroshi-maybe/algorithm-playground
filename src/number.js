
var factorialZeros = function(n) {
    var m, i=1, f2=0, f5=0;
    for (;i<n+1; i+=1) {
        m = i;
        while(m % 2==0) { m/=2; f2+=1; }
        while(m % 5==0) { m/=5; f5+=1; }
    }
    return Math.min(f2,f5);
};

var factorialZeros_ = function(n) {
    var i=1, f5=0, m;
    while((m=Math.pow(5,i))<n) {
      f5+=Math.floor(n/m);
      i+=1;
    }
    return f5;
};

console.log(factorialZeros_(100));

var target_sum = function(target, ar) {
    var i=0, len=ar.length, hash = {};
    for (; i<len; i+=1) {
        if (hash[ar[i]]) return true;
        hash[target-ar[i]] = true;
    }
    return false;
};

var target_sum_ = function(target, ar) {
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
console.log(target_sum_(60,ar));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Odd Man Out 2014/4/13 16:00-16:16

var find_odd = function(ar) {
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
var find_odd_ = function(ar) {
/*  var i=0, len=ar.length, b=0;
  for(; i<len; i+=1) {
    b ^= ar[i];
  }
  return b;*/
    return ar.reduce(function(ac,n) {
        return ac^n;
    }, 0);
};

var ar2 = [0,9,5,7,9,2,3,5,0,2,3];
console.log(find_odd_(ar2));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Maximal Subarray 18:44-19:25

var max_subarray = function(ar) {
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

var max_subarray_ = function(ar) {
    var x, i=0, len=ar.length, max_ending_here = max_so_far = 0;
    for (; i<len; i+=1) {
        x = ar[i];
        max_ending_here = Math.max(0, max_ending_here + x);
        max_so_far = Math.max(max_so_far, max_ending_here);
        console.log(i+"("+x+")", max_ending_here, max_so_far);
    }
    return max_so_far;
};

var ar = [1, -3, 5, -2, 9, -8, -6, 4];

console.log(max_subarray_(ar));

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
