// Helper to create linked list
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

var print = function (head) {
    var current, ar = [];
    current = head;
    while(current!==null) {
        ar.push(current.data);
        current = current.next;
    }
    console.log(ar.join("->"));
};

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

print(head);

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
print(head);
removeAfter(index[4]);
print(head);
reverse_recursive(head, head.next);
print(head);

var flatten = function(node, prev, stack) {
  var data;
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

var temp4 = insert(40).head,
    temp31 = insert(temp4).head,
    temp32 = insert(30).head,
    temp2 = insert(20).next(temp31).next(21).next(temp32).next(22).head,
    temp1 = insert(10).next(temp2).next(11).next(12).head;
    
head = insert(0).next(1).next(temp1).next(2).next(3).head;

flatten(head);
print(head);

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

var remove_duplicate_no_buffer = function(node) {
  var cur=node, data, checking, checking_prev;

  while (cur != null) {
    data = cur.data;
    checking = cur.next;
    checking_prev = cur;
    while (checking != null) {
      if (checking.data==data) {
	// remove
	checking_prev.next = checking.next;
	checking = checking.next;
	continue;
      }
      checking_prev = checking;
      checking = checking.next;
    }
    cur = cur.next;
  }
};

head = insert(3).next(1).next(2).next(5).next(3).next(5).next(3).head;
remove_duplicate(head);
print(head);

var last_nth = function(head, n) {
  var p1 = head, p2 = head, i;
  for (i=0; i<n-1; i+=1) {
    p2 = p2.next;
  }
  while (p2.next != null) {
    p2 = p2.next;
    p1 = p1.next;
  }
  return p1;
};
head = insert(3).next(1).next(2).next(5).next(3).next(5).next(3).head;

console.log(last_nth(head, 5));

var remove_middle = function(head) {
  var p1 = head, p2 = head, prev;
  while (p2!=null && p2.next!=null) {
    prev = p1;
    p1 = p1.next;
    p2 = p2.next;
    if (p2 != null && p2.next != null) p2 = p2.next;
  }
  prev.next = p1.next;
};

head = insert(3).next(1).next(2).next(5).next(3).next(5).next(3).head;
remove_middle(head);
print(head);

var add = function(n1, n2) {
  var result = {}, carrier = 0, head = result;
  while (n1!=null || n2!=null) {
    result.data = n1.data+n2.data+carrier;
    carrier = Math.floor(result.data/10);
    result.data = result.data % 10;
    if (n1!=null) n1 = n1.next;
    if (n2!=null) n2 = n2.next;
    if (n1!=null || n2!=null) {
      result.next = { data: 0, next: null };
      result = result.next;
    }
  }
  if (carrier>0) {
    result.next = { data: carrier, next: null };
  }

  return head;
};

op1 = insert(3).next(1).next(7).head;
op2 = insert(5).next(9).next(2).head;

print(add(op1,op2));

var loop_start = function(head) {
  var p1=head, p2=head;
  while (p2.next!=null) {
    p1 = p1.next;
    p2 = p2.next;
    if (p2==null) return null;
    p2 = p2.next;
    if (p1===p2) break;
  }
  if (p2==null) return null;
  
  // p2: loop start - k on the loop
  // p1: Move back to start (loop start - k as well)
  p1 = head;
  while (p1!==p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
};

var loop_start_node = {data: 4, next: null};
head = {data:1, next: {data:2, next: {data:3, next: loop_start_node}}};
loop_start_node.next = {data:5, next: {data:6, next: {data:7, next: {data:8, next: {data:9, next: {data:10, next: {data: 11, next: loop_start_node}}}}}}};

console.log(loop_start(head));
