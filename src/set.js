
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