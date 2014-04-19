
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