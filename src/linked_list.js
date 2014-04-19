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
    reverse_(temp, next);
};

insertAfter(index[4], {data: 50, next:null});
print();
removeAfter(index[4]);
print();
reverse_recursive(head, head.next);
print();
