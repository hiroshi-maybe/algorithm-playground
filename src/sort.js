// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_2.pdf
// Merge Sort:

var merge_sort_inplace = function(ar, s, e) {
    var left, right, left_tail;
    if (s===e) { return; }
    left_tail = s+Math.floor((e-s)/2);
    merge_sort_inplace(ar, s, left_tail);
    merge_sort_inplace(ar, left_tail+1, e);
    merge(ar, s, left_tail, e);
};

var merge = function(ar, l_h, l_t, r_t) {
    var i = l_h,
        l_i=0, r_i=0, val,
        left = ar.slice(l_h, l_t+1),
        l_len = left.length,
        right = ar.slice(l_t+1, r_t+1),
        r_len = right.length;

    for (;i<=r_t;i+=1) {
        if (l_i==l_len || right[r_i]<left[l_i]) {
            val = right[r_i]; r_i+=1;
        } else {
            val = left[l_i];  l_i+=1;
        }
        ar[i] = val;
    }
};

var ar = [8,2,6,3,4,3,9,1];
merge_sort_inplace(ar, 0, ar.length-1);
console.log(ar);

var merge_sort_immutable = function(ar) {
    var left, right, len = ar.length;
    if (len===1) { return ar; }
    left = merge_sort_immutable(ar.slice(0,Math.ceil(len/2)));
    right = merge_sort_immutable(ar.slice(Math.ceil(len/2)));
    return _merge_immutable(left,right);
};

var _merge_immutable = function(l, r) {
    var l_val, r_val, val, result = [];
    if (l==null) { l = []; }
    if (r==null) { r = []; }
    while (l.length>0||r.length>0) {
        l_val = l[0] || Number.MAX_VALUE;
        r_val = r[0] || Number.MAX_VALUE;
        if (l_val<r_val) {
            result.push(l.shift());
        } else {
            result.push(r.shift());
        }
    }
    return result;
};

ar = [8,2,6,3,4,3,9,1];
console.log(merge_sort_immutable(ar));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_2.pdf
// Quicksort:

var quick_sort_immutable = function(ar) {
    var i=0, left=[], right=[], pivot;
    if (ar.length<2) { return ar; }
    pivot = ar.shift();
    for (;i<ar.length; i+=1) {
        if (ar[i]<pivot) {
            left.push(ar[i]);
        } else {
            right.push(ar[i]);
        }
    }  
    return quick_sort_immutable(left).concat([pivot]).concat(quick_sort_immutable(right));
};

// 0 2 2 2 [ 1, 2, 3, 3, 4, 6, 9, 8 ]
// 1 3 2 1 [ 1, 2, 3, 3, 4, 6, 9, 8 ]
var quick_sort_inplace_headpivot = function(ar, s, e) {
    var temp, i=s+1,j=e-1, pivot = ar[s];
    if (e-s<2) { return; }
    while (i<j) {
        while (ar[i]<=pivot) { i+=1; }
        while (ar[j]>pivot) { j-=1; }
        if (i<j) {
            temp  = ar[j];
            ar[j] = ar[i];
            ar[i] = temp;
            i+=1;
            j-=1;
        }
    }
    ar[s] = ar[j];
    ar[j] = pivot;
    quick_sort_inplace_headpivot(ar, s, j);
    quick_sort_inplace_headpivot(ar, j+1, e);
};

var quick_sort_inplace_tailpivot = function(ar, s, e) {
    var pivot = ar[e-1], temp, i=s, j=i;
    if (e-s<2) { return; }
    for (; i<e-1; i+=1) {
        if (ar[i]<=pivot) {
            if (i!=j) {
              	temp = ar[i];
              	ar[i] = ar[j];
              	ar[j] = temp;
            }
            j+=1;
        }
    }
    ar[e-1] = ar[j];
    ar[j] = pivot;
    quick_sort_inplace_tailpivot(ar, s, j);
    quick_sort_inplace_tailpivot(ar, j+1, e);
};

ar = [8,2,6,3,4,3,9,1];
console.log(quick_sort_immutable(ar));
ar = [8,2,6,3,4,3,9,1];
quick_sort_inplace_tailpivot(ar, 0, ar.length);
console.log(ar);

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_2.pdf
// Order Statistics:

var kth = function(ar, s, e, k) {
    var pivot = ar[e], i=s, j=i, temp;
    // base case
    if (e==s && k==s) { return ar[k]; }
    if (e==s+1 && (s==k||e==k)) { return ar[k]; }

    for (i; i<e; i+=1) {
        if (ar[i] <= pivot) {
            if (i!==j) {
              	temp = ar[i];
              	ar[i] = ar[j];
              	ar[j] = temp;
            }
            j+=1;
        }
    }
    ar[e] = ar[j];
    ar[j] = pivot;
    if (j==k) { return ar[k]; }
    if (j>k) {
        return kth(ar, s, j-1, k);
    } else {
        return kth(ar, j+1, e, k);
    }
};

ar = [8,2,6,3,4,3,9,1];
console.log(kth(ar, 0, ar.length-1, 5));

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Handout_2.pdf
// Question: Nearest Neighbor

var neighbor = function(ar, k) {
    var i=0, len=ar.length, neighbors=[], nbr, l_i, u_i, j;
    ar.sort(function(a,b) {return +a-(+b);});
    console.log(ar);
    for (;i<len; i+=1) {
        nbr = [];
        l_i = i-1;
        u_i = i+1;
        while(nbr.length<k) {
            if (ar[l_i] && Math.abs(ar[i]-ar[l_i])<=Math.abs(ar[i]-ar[u_i])||!ar[u_i]) { nbr.push(ar[l_i]); l_i-=1; }
            if (nbr.length>=k) break;
            if (ar[u_i] && Math.abs(ar[i]-ar[u_i])<=Math.abs(ar[i]-ar[l_i])||!ar[l_i]) { nbr.push(ar[u_i]); u_i+=1; }
        }
        neighbors.push(nbr);
    }
    return neighbors;
};

ar = [8,2,6,3,4,3,9,1];
console.log(neighbor(ar, 2));

// Counting sort: Applicable if value's distribution is limited up to k (bucket size)

var counting_sort = function(ar) {
    var i=0, j=0,
        k=-Infinity,
        bucket = ar.reduce(function(bucket, val) {
            bucket[val] = bucket[val] || 0;
            bucket[val] += 1;
            if (val>k) { k=val; }
            return bucket;
        }, []);

    for (; i<=k; i+=1) {
        if (bucket[i] != null) {
            while (bucket[i]>0) {
                ar[j] = i;
                bucket[i] -= 1;
                j += 1;
            }
        }
    }
    return ar;
};

console.log(counting_sort([3,0,2,0,0,2,2]));

// Implement to use in bucket sort
var insertion_sort = function(ar) {
    var i=1, j, temp, len=ar.length;
    if (len<2) { return ar; }
    for (; i<len; i+=1) {
        for (j=0; j<=i; j+=1) {
            if (ar[j] <= ar[i]) { continue; }
            temp = ar[i];
            ar[i] = ar[j];
            ar[j] = temp;
        }
    }
    return ar;
};

console.log(insertion_sort([15,9,8,1,4,11,7,12,13]));

var bucket_sort = function(ar) {
    var min=Infinity, max=-Infinity, bucket, hash, bucket_count, i=0;
    if (ar.length<1) { return ar; }
    ar.forEach(function(val) {
        if (val < min) { min = val; }
        if (val > max) { max = val; }
    });
    bucket_count = Math.ceil((max-min)/3);
    hash = function(i) { return Math.floor((i-min)/3); };

    // make bucket
    bucket = ar.reduce(function(bucket, val) {
        var _hash = hash(val);
        bucket[_hash] = bucket[_hash] || [];
        bucket[_hash].push(val);
        return bucket;
    }, []);

    // bucket -> array
    bucket.forEach(function(slot) {
        insertion_sort(slot);
        slot.forEach(function(val,j) {
            ar[i] = val;
            i+=1;
        });
    });
    return ar;
};

console.log(bucket_sort([7,5,13,2,14,1,6]));

// 2014/4/22 10:16-11:05
var radix_sort_lsd = function(ar) {
    var base = 10, buckets,
        max, max_scale = 0, ar_i,
        scale_i, exp_tmp = 1, exp;

    max = Math.max.apply(null, ar);
    
    // Get max scale
    while (Math.floor(max/exp_tmp) > 0 ) {
        max_scale += 1;
        exp_tmp*=base;
    }

    for (scale_i=0; scale_i<max_scale; scale_i+=1) {
        /**  Bucket sort for each scale **/

        exp = Math.pow(base, scale_i);

        // Make bucket
        buckets = ar.reduce(function(buckets, val) {
            var bucket_n = Math.floor(val/exp) % base;
            buckets[bucket_n] = buckets[bucket_n] || [];
            buckets[bucket_n].push(val);
            return buckets;
        }, []);
        ar_i = 0;
        buckets.forEach(function(bucket) {
            insertion_sort(bucket);
            bucket.forEach(function(val) {
                ar[ar_i] = val;
                ar_i += 1
            });
        });
    }
    return ar;
};

console.log(radix_sort_lsd([170, 45, 75, 90, 802, 2, 24, 66]));

