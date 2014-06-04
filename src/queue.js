
// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Q 3.5
// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Queue Using Stacks 2014/4/13 16:49-16:52

var MyQueue = function() {
  this.stack_en = [];
  this.stack_de = [];
};

MyQueue.prototype.enqueue = function(val) {
  if (this.stack_de.length>0) {
    while(this.stack_de.length>0) {
      this.stack_en.push(this.stack_de.pop());
    }
  }
  this.stack_en.push(val);
};
MyQueue.prototype.dequeue = function() {
  while(this.stack_en.length>0) {
    this.stack_de.push(this.stack_en.pop());
  }
  return this.stack_de.pop();
};

var myQueue = new MyQueue();
myQueue.enqueue(1);
myQueue.enqueue(1);
myQueue.dequeue();
myQueue.enqueue(2);
myQueue.enqueue(2);
myQueue.dequeue();
myQueue.enqueue(3);
console.log(myQueue.dequeue(),myQueue.dequeue(),myQueue.dequeue(),myQueue.dequeue());

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X
// Stack having min value

var MinStack = function() {
  this.vals = [];
  this.mins = [];
};
MinStack.prototype.push = function(val) {
  if (this.mins.length==0 || val<=this.mins[this.mins.length-1]) {
    this.mins.push(val);
  }
  this.vals.push(val);
};
MinStack.prototype.pop = function() {
  var val = this.vals.pop();
  if (val==this.mins[this.mins.length-1]) {
    this.mins.pop();
  }
  return val;
};
MinStack.prototype.min = function() {
  return this.mins[this.mins.length-1];
};

var minStack = new MinStack();
minStack.push(10);
minStack.push(5);
minStack.push(3);
minStack.push(3);
minStack.pop();
console.log(minStack.min());

// http://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/098478280X

var tower_of_hanoi = function() {
  var start = [4,3,2,1], buffer=[], target = [];
  function move(n, src, dest, buf) {
    if (n<1) return;
    move(n-1, src, buf, dest);
    dest.push(src.pop());
    console.log(start,buffer,target);
    move(n-1, buf, dest, src);
  }
  move(start.length, start, target, buffer);
};

tower_of_hanoi();