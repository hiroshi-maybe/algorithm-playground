// 2014/4/15 00:00-00:16 11:00-11:24 (except rehash)

var Hash = function() {
	this.array = [];
	this.max_size = 2;
	this.size = 0;
};

var hashCode = function(str) {
	return (""+str).split("").reduce(function(acc,ch,i) {
		return acc+(i+1)*ch.charCodeAt(0);
	}, 0);
};

Hash.prototype.index = function(hash) {
	return hash % this.max_size;
};

var chain = {
	set: function(key, val) {
		var hash  = hashCode(key),
			index = this.index(hash),
			node;

		if (this.array[index]==null) {
			this.size += 1;
			if (this.size > this.max_size*0.8) {
				this.rehash();
			}
			// Recompute index after rehash
			index = this.index(hash);			
			this.array[index] = {key: key, val: val, next: null};
			return;
		}
		node = this.array[index];
		if (node.key==key) { node.val = val; return; }

		while (node.next!=null) {
			node = node.next;
			if (node.key==key) { node.val = val; return; }
		}
		this.size += 1;
		node.next = {key: key, val: val, next: null};		
	},
	get: function(key) {
		var hash = hashCode(key), index, node;
		index = this.index(hash);
		node = this.array[index];
		if (node==null) { return null; }
		while (node.key!=key) {
			node = node.next;
			if (node==null) { return null; }
		}
		return node.val;
	},
	rehash: function() {
		var data = [];
		this.array.forEach(function(v,i) {
			var node = v;
			if (node!=null) { data.push(node); }
			else { return; }

			while (node.next!=null) {
				node = node.next;
				data.push(node);
			}
		}, this);

		this.array = [];
		this.max_size *= 2;
		this.size = 0;
		data.forEach(function(node) {
			this.set(node.key, node.val);
		}, this);
	}
}

Hash.prototype.set = chain.set;
Hash.prototype.get = chain.get;
Hash.prototype.rehash = chain.rehash;

var hash = new Hash();
hash.set("abc", 10);
hash.set("火遁", 11);
hash.set("雷神", 12);
hash.set("水遁", 13);
hash.set("忍者", 14);
hash.set("fgh", 15);
hash.set("水影", 16);
hash.set("ijk", 16);
hash.set("lmn", 16);
hash.set("opq", 16);
hash.set("rst", 16);

console.log(hash.get("xyz"));
console.log(hash.get("fgh"));
