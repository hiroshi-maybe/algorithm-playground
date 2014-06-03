// 2014/4/11 1:04-2:24

var head;
var index = [];
for (var i=0; i<10; i+=1) {
    index[i] = {
      data: i,
      next: null
    };
}

index.forEach(function(node,i) {
    if (i<10-1) {
      node.next = index[i+1];
    }
});

head = index[0];

var print = function () {
    var current, ar = [];
    current = head;
    while(current!==null) {
        ar.push(current.data);
        current = current.next;
    }
    console.log(ar.join("->"));
};

print();

var insertAfter = function(node, newNode) {
    var temp = node.next;
    node.next = newNode;
    newNode.next = temp;
};

var removeAfter = function(node) {
    var newNext, removed = node.next;
    if (!removed) { return; }
    newNext = removed.next;
    node.next = newNext;
};

var reverse = function() {
    var next_t, next2, next, cur;
    cur = head;
    next = head.next;
    head.next = null;
    while(next !== null) {
        next_t = next;
        next = next_t.next;
        next_t.next = cur;
        cur = next_t;
    }
    head = cur;
};

var reverse_recursive = function(cur, next) {
    var temp = next;
    if (next == null) { head = cur; return; }
    if (cur===head) { cur.next = null; }
    next = temp.next;
    temp.next = cur;
    reverse_recursive(temp, next);
};

insertAfter(index[4], {data: 50, next:null});
print();
removeAfter(index[4]);
print();
reverse_recursive(head, head.next);
print();

var flatten = function(node, prev, stack) {
  var data;
console.log(prev&&prev.data, node&&node.data);
  if (node==null) {
    // append from stack
    if (stack.length==0) return;
    data = stack.pop();
    prev.next = data;
    flatten(data, prev, stack);
    return;
  }
  if (stack==null) stack = [];
  data = node.data;
  if (typeof data == "number") {
    flatten(node.next, node, stack);
    return;
  }
  // branch node
  prev.next = data;
  if (node.next!=null) stack.push(node.next);
  flatten(data, prev, stack);
};

var insert = function(head) {
  var Insertable = function(data) {
	var head = {data:data, next:null};
	this.head=head;
	this.cur=head;
      };
  Insertable.prototype.next = function(data) {
    this.cur.next = {data: data, next: null};
    this.cur = this.cur.next;
    return this;
  };
  return new Insertable(head);
};
var temp4 = insert(40).head,
    temp31 = insert(temp4).head,
    temp32 = insert(30).head,
    temp2 = insert(20).next(temp31).next(21).next(temp32).next(22).head,
    temp1 = insert(10).next(temp2).next(11).next(12).head;
    
head = insert(0).next(1).next(temp1).next(2).next(3).head;

flatten(head);
print();

var remove_duplicate = function(node, prev, set) {
  set = set || {};
  if (node==null) return;

  if (set[node.data]) {
    // Duplicate
    prev.next = node.next;
    remove_duplicate(node.next, prev, set);
  } else {
    set[node.data] = true;
    remove_duplicate(node.next, node, set);
  }
};

head = insert(3).next(1).next(2).next(5).next(3).next(5).next(3).head;
remove_duplicate(head);
print();