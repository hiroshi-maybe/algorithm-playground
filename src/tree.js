var bfs_recursive = function(nodes) {
    var node, children = [];
    if (nodes.length==0) { return; }
    console.log(nodes.map(function(node){ return node.val; }).join(" "));
    while((node=nodes.shift())) {
      if (node.left ) children.push(node.left );
      if (node.right) children.push(node.right);    
    }
    bfs_recursive(children);
};

// 2014/4/14 10:00-10:07

var bfs = function(root) {
    var node, queue = [root], children = [];
    console.log(root.val);
    while (queue.length>0) {
        node = queue.shift();
        if (node.left ) children.push(node.left);
        if (node.right) children.push(node.right);
        if (queue.length==0 && children.length>0) {
          queue = children; children=[];
          console.log(queue.map(function(node) { return node.val; }).join(" "));
        }
    }
};

var dfs = function(node) {
    console.log(node.val);
    if (node.left ) dfs(node.left);
    if (node.right) dfs(node.right);
};

var pre_order = function(node) {
    console.log(node.val);
    if (node.left ) pre_order(node.left);
    if (node.right) pre_order(node.right);
};
// `in_order` can reproduce sorted array from a BST.
var in_order = function(node) {
    if (node.left ) in_order(node.left);
    console.log(node.val);
    if (node.right) in_order(node.right);  
};
var post_order = function(node) {
    if (node.left ) post_order(node.left);
    if (node.right) post_order(node.right);
    console.log(node.val);
};

head = {val:0,
        left : { val: 1,
          left : {val:3,
            left: {val:6}},
          right: {val:4,
            left : {val:7},
            right: {val:8,
              right: {val:9}}}},
        right: { val: 2,
          right: {val: 5}}};

head2 = {val:20,
        left : { val: 10,
          left : {val:5,
            left: {val:4}},
          right: {val:15,
            left : {val:14},
            right: {val:16,
              right: {val:17}}}},
        right: { val: 21,
          right: {val: 22}}};

head3 = {val:"F",
        left : { val:"B",
          left : {val:"A"},
          right: {val:"D",
            left : {val:"C"},
            right: {val:"E"}}},
        right: { val:"G",
          right: {val: "I",
            left: {val:"H"}}}};

bfs(head2);
//bfs_recursive([head]);
//pre_order(head3);
//in_order(head3);
post_order(head3);

// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Binary Search Tree Validity

var is_bst = function(node, min, max) {
    var left = true, right = true;
    min = min || Number.MIN_VALUE;
    max = max || Number.MAX_VALUE;

    if (node==null) { return true; }

    if (node.val<min || node.val>max) {
        return false;
    }
    return is_bst(node.left, min, node.val) && is_bst(node.right, node.val, max);
};

console.log(is_bst(head2));

var bst_insert = function(val, node) {
    // Initialize tree
    if (node == null) { return {val: val, left: null, right: null}; }

    if (val <= node.val) {
        // Insert left
        if (node.left == null) {
            node.left = { val: val, left: null, right: null };
            return;
        } else {
            bst_insert(val, node.left);
        }
    } else {
        // Insert right
        if (node.right == null) {
            node.right = { val: val, left: null, right: null };
            return;
        } else {
            bst_insert(val, node.right);
        }
    }
};

var root = bst_insert(50);
bst_insert(100, root);
bst_insert(25, root);
bst_insert(75, root);
console.log(root);

var bst_search = function(val, node) {
    if (node==null) { return false; }
    if (val===node.val) { return true; }
    else if (val < node.val) {
        return bst_search(val, node.left );
    } else {
        return bst_search(val, node.right);
    }
};

console.log(bst_search(10, root));
console.log(bst_search(75, root));

/*
7
|  \
5   8
|\   \
2 6   10
|\
1 3
|
0

7
|  \
3   8
|\   \
2 6   10
|
1
|
0

7
|  \
2   8
|\   \
1 6   10
|
0
*/

// Return stack having path to max node
var find_max = function(node) {
    var stack = [];
    while (node!=null) {
        stack.push(node);
        node = node.right;
    }
    return stack;
};

var bst_delete = function(val, node, parent) {
    var child=null, successors, left_max, left_max_parent, child_new;

    // Reached bottom
    if (node==null) { return false; }

    // Target found
    if (val===node.val) {
        /* 1. Have both children */
        if (node.left!=null && node.right!=null) {
            successors = find_max(node.left);
            child = left_max = successors.pop();
            left_max_parent = successors.pop();
            // Restructure recursively
            child_new = bst_delete(left_max.val, left_max, left_max_parent);
            child.right = node.right;
            child.left = node.left===child ? child_new : node.left;
        } else /* 2. Have either child or no child below */
        if (node.left!=null) {
            child = node.left;
        } else if (node.right!=null) {
            child = node.right;
        }
        // If target is a root node, return new head
        if (parent==null) { return child; }

        if (node.val <= parent.val) {
            parent.left  = child;
        } else {
            parent.right = child;
        }
        return true;
    }

    // Search child
    if (val<node.val) {
        bst_delete(val, node.left , node);
    } else {
        bst_delete(val, node.right, node);
    }
};

root = bst_insert(7);
bst_insert(5, root);
bst_insert(8, root);
bst_insert(2, root);
bst_insert(6, root);
bst_insert(10, root);
bst_insert(1, root);
bst_insert(3, root);
bst_insert(0, root);

bst_delete(5, root);
bst_delete(3, root);

console.log(root);

var bst_sort = function(node, _ar) {
    var ar = _ar || [];
    if (node==null) { return; }
    bst_sort(node.left , ar);
    ar.push(node.val);
    bst_sort(node.right, ar);
    if (_ar==null) { return ar; }
};
console.log(bst_sort(head2));

// ********************** AVL tree *********************//
// 2014/4/19 16:20-18:00 20:00-21:00

var AvlNode = function(val) {
//    if (!this instanceof AvlNode) { return new AvlNode(); }
    this.val = val;
    this.parent = null;
    this.left   = null;
    this.right  = null;
};
AvlNode.prototype.balance = function() {
    return this.height("right")-this.height("left");
};

AvlNode.prototype.height = function(side) {
    // Side specified
    if (side!=null) {
        return this[side]==null ? 0 : this[side].height();
    }
    return Math.max(this.height("left")+1, this.height("right")+1);
};

var AVL = function() {
    this.root = null;
};

AVL.prototype.insert = function(k) {
    var newNode = new AvlNode(k);
    this._insert(this.root, newNode);
};

AVL.prototype._insert = function(node, newNode) {

    if (node==null) {
        this.root = newNode; return;
    }

    if (newNode.val<=node.val) {
        if (node.left==null) {
            node.left = newNode; newNode.parent = node;
            this.rebalance(node);
        } else {
            this._insert(node.left, newNode);
        }
    } else {
        if (node.right==null) {
            node.right = newNode; newNode.parent = node;
            this.rebalance(node);
        } else {
            this._insert(node.right, newNode);
        }
    }
};

AVL.prototype.rebalance = function(cur) {
    var balance, balance_child, newParent;

    // Reached root. Finished.
    if (cur==null) { return; }

    balance = cur.balance()

    if (Math.abs(balance) < 2) {
        this.rebalance(cur.parent);
        return;
    }

    if (balance<=-2) {
        // left > right
        balance_child = cur.left.balance();
        if (balance_child > 0) {
            cur = this.rotateRight(cur.left).parent;
        }
        newParent = this.rotateLeft(cur);
        this.rebalance(newParent.parent);
    } else {
        // right > left
        balance_child = cur.right.balance();
        if (balance_child < 0) {
            console.log("before",cur.right);
            cur = this.rotateLeft(cur.right).parent;
            console.log("after",cur);
        }
        newParent = this.rotateRight(cur);
        this.rebalance(newParent.parent);
    }

};

AVL.prototype.rotateLeft = function(cur) {
    var newParent = cur.left, grandParent;

    grandParent = newParent.parent = cur.parent;
    if (grandParent==null) {
        this.root = newParent;
    } else {
        if (grandParent.left===cur) {
            grandParent.left  = newParent;
        } else {
            grandParent.right = newParent;
        }

    }
    cur.left = newParent.right; if (cur.left!=null) { cur.left.parent = cur; }
    cur.parent = newParent; newParent.right = cur;
    return newParent;
};

AVL.prototype.rotateRight = function(cur) {
    var newParent = cur.right, grandParent;
    grandParent = newParent.parent = cur.parent;
    if (grandParent==null) {
        this.root = newParent;
    } else {
        if (grandParent.right===cur) {
            grandParent.right = newParent;
        } else {
            grandParent.left  = newParent;
        }
    }
    cur.right = newParent.left; if (cur.right!=null) { cur.right.parent = cur; }
    cur.parent = newParent; newParent.left = cur;
    return newParent;
};

// 2014/4/20 2:40-1:50

AVL.prototype.delete = function(k) {
    this._delete(this.root, k);
};

AVL.prototype._delete = function(node, k) {
    var successor, removed, child, parent;

    if (node==null) { return; }

    // current node is deleted
    if (k===node.val) {
        if (node.left!=null && node.right!=null) {
            successor = this.successor(node);
            console.log("successor",successor.val);
            node.val = successor.val;
            removed = successor;
        } else {
            removed = node;
        }
        // `removed` should have 0/1 child.
        child = removed.left==null ? removed.right : removed.left;
        parent = removed.parent;
        if (parent==null) {
            /* root is removed */
            this.root = null;
            if (child==null) { return; } /* No node in tree */
            this.root = child; child.parent = null;
        } else {
            if (parent.right===removed) {
                parent.right = child;
            } else {
                parent.left = child;
            }
            if(child!=null){ child.parent = parent; }
        }
        this.rebalance(parent);
        return;
    }

    if (k < node.val) {
        this._delete(node.left , k);
    } else if (k > node.val) {
        this._delete(node.right, k);
    }

};

AVL.prototype.successor = function(node) {
    var node = node.right;
    while (node.left!=null) {
        node = node.left;
    }
    return node;
};

var avl = new AVL();
avl.insert(5);
avl.insert(3);
avl.insert(8);
avl.insert(2);
avl.insert(4);
avl.insert(7);
avl.insert(9);
avl.insert(1);

avl.delete(5);
avl.delete(8);

console.log(avl.root);


var Heap = function(_ar) {
    this.ar = [];
    if (_ar != null) {
        this.ar = _ar;
        this.build();
    }
};
Heap.prototype.build = function() {
    var lastParentIndex=this.parentIndex(this.ar.length-1),
        i=lastParentIndex;
    for (; i>=0; i-=1) {
        this.heapify(i);
    }
};
Heap.prototype.heapify = function(i) {
    var temp,
        leftChild  = this.leftChildIndex(i),
        rightChild = this.rightChildIndex(i),
        largest = i;

    if (this.ar[leftChild]!=null && this.ar[leftChild] > this.ar[i]) {
        largest = leftChild;
    }
    if (this.ar[rightChild]!=null && this.ar[rightChild] > this.ar[i]) {
        largest = rightChild;
    }
    // Swap
    if (largest != i) {
        temp = this.ar[largest];
        this.ar[largest] = this.ar[i];
        this.ar[i] = temp;
        this.heapify(largest);
    }
};
Heap.prototype.parentIndex = function(n) {
    return Math.floor((n-1)/2);
};
Heap.prototype.leftChildIndex = function(n) {
    return 2*n+1;
};
Heap.prototype.rightChildIndex = function(n) {
    return 2*n+2;
};

var heap = new Heap([5,3,16,2,10,14]);
console.log(heap.ar);