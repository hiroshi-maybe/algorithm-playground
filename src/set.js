
var letter_combination = function(set1, set2) {
  var set = [], i,j,len1=set1.length,len2=set2.length;
  for (i=0; i<len1; i+=1) {
    for (j=0; j<len2; j+=1) {
      set.push(set1[i]+set2[j]);
    }
  }
  return set;
};

var phone_word = function(nums) {
  var dummy = [""],
      dic = {2: ["A", "B", "C"], 
	     3: ["D", "E", "F"], 
	     4: ["G", "H", "I"], 
	     5: ["J", "K", "L"], 
	     6: ["M", "N", "O"], 
	     7: ["P", "Q", "R", "S"], 
	     8: ["T", "U", "V"], 
	     9: ["W", "X", "Y", "Z"]};
  
  return nums.reduce(function(acc, n) {
    return letter_combination(acc, dic[n]);
  }, dummy);
};

console.log(phone_word([2,3,4]));

var subset = function(set, my) {
  var right_set = [], i, len, my_set, tmp;
  if (my==null) my = 0;
  my_set = [[set[my]]];
  
  if (my == set.length-1) return my_set;
  right_set = subset(set, my+1);
  if (right_set.length>0) my_set = my_set.concat(right_set);
  for (i=0,len=right_set.length; i<len; i+=1) {
    tmp = right_set[i].slice();
    tmp.push(set[my]);
    my_set.push(tmp);
  }
  return my_set;
};

console.log(subset([0,1,2]));

var permutation = function(set) {
  var subset, perm, i, len_i, j, len_j, new_set = [], my;
  if (set.length==1) return [[set[0]]];
  perm = permutation(set.slice(1, set.length));
  my = set.slice(0, 1);
  for (i=0, len_i=perm.length; i<len_i; i+=1) {
    subset = perm[i];
    for (j=0, len_j=subset.length; j<=len_j; j+=1) {
      new_set.push(subset.slice(0,j).concat(my).concat(subset.slice(j,len_j)));
    }
  }
  return new_set;
};

console.log(permutation([1,2,3]));

var combination = function(set, n) {
  return subset(set).filter(function(xs) {
    return xs.length==n;
  });
};

console.log(combination([1,2,3], 2));

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 8.5

var print_parenthesis = function(count) {
  var nums, num_comb = function(n) {
    var i, j, len, comb = [], subset;
    if (n==0) return [[]];
    for (i=1; i<=n; i+=1) {
      subset = num_comb(n-i);
      for (j=0, len=subset.length; j<len; j+=1) {
	comb.push([i].concat(subset[j]));
      }
    }
    return comb;
  },
  times = function(ch, n) {
    var str = "";
    for (; n>0; n-=1) {
      str+=ch;
    }
    return str;
  };
  nums = num_comb(count);
  return nums.map(function(xs) {
    return xs.reduce(function(acc, n) {
      return acc+times("(",n)+times(")",n);
    }, "");
  });
};

console.log(print_parenthesis(3));

