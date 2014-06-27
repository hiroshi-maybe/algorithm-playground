
var reverse_array_simple = function(ar) {
    var temp, i=0, len = ar.length;
    for (;i<(len-1)/2; i+=1) {
        temp = ar[i];
        ar[i] = ar[len-i-1];
        ar[len-i-1] = temp;
    }
    return ar;
};

console.log(reverse_array_simple([0,1,2,3,4]));

var reverse_word = function(str) {
    var result = "", ch = "", buf = "", i=0, len = str.length;
    for (; i<len; i+=1) {
        ch = str.charAt(len-i-1);
        if (ch==" ") {
            result+=buf + ch;
            buf = "";
        } else {
            buf = ch + buf;
            if (i==len-1) {
                result += buf;
            }
        }
    }
    return result;
};

var reverse_word_1liner = function(str) {
    return str.split(" ").reverse().join(" ");
};

var reverse_word_2phase_reverse = function(ar) {
    var i=0, len=ar.length, word_len=0;
    ar = reverse_array_simple(ar);
    for (; i<len; i+=1) {
        if (ar[i]===" ") {
            reverse_str(ar, i-word_len, i-1);
            word_len=0;
        } else {
            word_len+=1;
        }
    }
    reverse_str(ar, i-word_len, i-1);
    return ar;
};

var swap = function(ar, i, j) {
    var temp = ar[j];
    ar[j] = ar[i];
    ar[i] = temp;
};

var reverse_str = function(ar, s, e) {
    var i=s;
    for (; i<s+(e-s)/2; i+=1) {
        swap(ar, i, e-i+s);
    }
};

console.log(reverse_word("abc def  ghi"));
console.log(reverse_word_2phase_reverse(" abc def  ghi ".split("")));

var sub_pat = function(str, pat) {
    var ch;
    if (pat.length===0) return true;
    if (str.length===0) return false;
    
    ch = pat.charAt(0);
    if (str.charAt(0)===ch) {
        // match
        return sub_pat(str.substring(1), pat.substring(1));
    } else {
        // not match
        return sub_pat(str.substring(1), pat);
    }
};

console.log(sub_pat("abc def", "bd"));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_3.pdf
// Classic Question #7: Ransom Note

var ransom_note = function(target, set) {
  var i=0, len, ch, dic = target.replace(" ").split("").reduce(function(acc, ch){
      if (!acc[ch]) { acc[ch]=0; }
      acc[ch]+=1;
      return acc;
  }, {});
  set = set.replace(" ").split("");
  len = set.length;  
  for(;i<len; i+=1) {
      ch = set[i];
      if (dic[ch]==null) continue;
      if (dic[ch] > 0) { dic[ch]-=1; }
      if (dic[ch] == 0) { delete dic[ch]; }
      if (Object.keys(dic).length==0) return true;
  }
  return false;
};

console.log(ransom_note("no scheme", "programming interviews are weird in the church"));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_A.pdf
// Question: Substring

var substring = function(target, source) {
    var i=0, j=0, lens=source.length, lent=target.length;
    for (; i<lens; i+=1) {
        if (target.charAt(j)===source.charAt(i)) {
            j+=1;
        } else {
            j=0;
        }
        if (j===lent) {
            return true;
        }
    }
    return false;
};

console.log(substring("bat", "abaxxatyybatzz"));

// 2014/4/14 1:20-1:32

var word_distance = function(a, b, str) {
    var i=0, len=str.length, word="", ch, word_i=0, a_i, b_i;
    for (; i<len; i+=1) {
        ch = str.charAt(i);
        if (ch===" ") {
            if (word.length>0) {
                // Word found!!
                if (a===word) { a_i=word_i; }
                if (b===word) { b_i=word_i; }
                if (a_i !=null && b_i !=null) { return Math.abs(a_i-b_i); }
                word="";
                word_i+=1;
            }
        } else {
            word+=ch;
        }
    }
};

console.log(word_distance("ab", "bc", " xx  bc yy zz ab xx"));

var one_edit_apart = function(str1, str2) {
  var temp, i, sub1l, sub1r, sub2l, sub2r;
  if (str1.length<str2.length) { temp=str1; str1=str2; str2=temp; }
  if (str1.length-str2.length>2) return false;

  for (i=0; i<str1.length; i+=1) {
    // Add/Remove check
    sub1l = str1.substring(0,i);
    sub1r = str1.substring(i+1,str1.length);
    if (sub1l+sub1r==str2) return true;
    // Replace check
    sub2l = str2.substring(0,i);
    sub2r = str2.substring(i+1,str2.length);
    if (sub1l+sub1r==sub2l+sub2r) return true;
  }
  return false;
};

console.log(one_edit_apart("cat", "dog"));
console.log(one_edit_apart("cat", "cats"));
console.log(one_edit_apart("cat", "cut"));
console.log(one_edit_apart("cat", "cast"));
console.log(one_edit_apart("cat", "at"));
console.log(one_edit_apart("cat", "acts"));

var exists_anagram = function(ar) {
  var set={};
  ar = ar.map(function(str) {
    return str.split('').sort().join('');
  });
  return ar.reduce(function(acc, str) {
    if (acc) return acc;
    if (set[str]) return true;
    set[str] = true;
    return acc;
  }, false);
};

console.log("Anagram exists?");
console.log(exists_anagram(["bag", "bat", "tab"]));
console.log(exists_anagram(["gab", "bat", "laf"]));

var is_all_unique = function(str) {
  var i=0, len=str.length, checker=0, val, base = "a".charCodeAt(0);
  for (; i<len; i+=1) {
    val = str.charCodeAt(i)-base;
    if ((checker & (1 << val)) > 0) return false;
    checker |= (1 << val);
  }
  return true;
};

console.log("is all unique?");
console.log(is_all_unique("aba"));

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q.20.5

var shortest_distance = function(words, word1, word2) {
  var min = Infinity,
      word1_pos = Infinity,
      word2_pos = Infinity;
  words.forEach(function(word, i) {
    var distance;
    if (word===word1) {
      word1_pos = i;
    } else if (word===word2) {
      word2_pos = i;
    } else {
      return;
    }
    distance = Math.abs(word1_pos-word2_pos);
    min = Math.min(distance, min);
  });
  return min;
};

console.log(shortest_distance(["a","b","c","b","d","e","f","a","c","g","b"], "a", "b"));

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q.20.7

var longest_words = function(strs) {
  var set, i, len=strs.length, longest_len=-1, str, longest="",
      match = function(word, set) {
	var len_str=word.length, j, suffix, matched=false;
	if (word==="") { return true; }
	for (j=1; j<=len_str; j+=1) {
	  suffix = word.substr(0,j);
	  if (set[suffix]!=null) {
	    matched=match(word.substr(j), set);
	    if (matched) { return matched; }
	  }
	}
	return matched;
      };
  set = strs.reduce(function(set, word) {
    set[word] = true;
    return set;
  }, {});

  for (i=0; i<len; i+=1) {
    str = strs[i];
    if (match(str, set) && str.length>longest_len) {
      longest = str;
      longest_len = str.length;
    }
  }
  return longest;
};

console.log(longest_words(["test","tester","testertest","testing","testingtester"]));

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q.20.8

var suffix_search = function(ar, str) {
  var suffix, i, len=str.length, suffix_tree = {}, suf_len, j, node, ch, found=false,
      search_suffix_tree = function(tree, str) {
	var ch = str.charAt(0);
	if (ch==="") return true;
	if (tree[ch]!=null) {
	  return search_suffix_tree(tree[ch], str.substr(1));
	} else {
	  return false;
	}
      };
  for (i=0; i<len; i+=1) {
    suffix = str.substr(i);
    suf_len = suffix.length;
    node = suffix_tree;
    for (j=0; j<suf_len; j+=1) {
      ch = suffix.charAt(j);
      if (node[ch]==null) { node[ch]={}; }
      node = node[ch];
    }
  }
  
  for (i=0, len=ar.length; i<len; i+=1) {
    found = search_suffix_tree(suffix_tree, ar[i]);
    if (found) return true; 
  }
  return false;
};

console.log(suffix_search(["ab","ir","ni","st"], "string"));