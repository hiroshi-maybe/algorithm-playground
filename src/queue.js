
// http://courses.csail.mit.edu/iap/interview/Hacking_a_Google_Interview_Practice_Questions_Person_B.pdf
// Question: Queue Using Stacks 2014/4/13 16:49-16:52

var stack_en = [],
	stack_de = [];

var enqueue = function(v) {
	while (stack_de.length!=0) {
		stack_en.push(stack_de.pop);
	}
	stack_en.push(v);
};

var dequeue = function() {
	while (stack_en.length!=0) {
		stack_de.push(stack_en.pop());
	}
	return stack_de.pop();
}

enqueue(1);
enqueue(2);
enqueue(3);
console.log(dequeue(), stack_en, stack_de);

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