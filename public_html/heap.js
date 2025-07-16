var ds = {
    Heap: function(eq, hash) {
        this.size = 0;
        this.array = [];
        this.eq = eq;
        this.hash = hash;
        this.indexMap = {};
    }
};

ds.Heap.prototype.siftUp = function(i) {
    if (i <= 0) {
        return;
    }

    var p = (i - 1) >>> 1;
    var element = this.array[i];

    while (i > 0 && this.array[p].priority > element.priority) {
        this.array[i] = this.array[p];
        i = p;
        p = (i - 1) >>> 1;
    }

    this.indexMap[this.hash(element)] = i;
    this.array[i] = element;
};

ds.Heap.prototype.siftDown = function(i) {
    var minIndex = i;
    var node = this.array[i];

    for (;;) {
        var l = (i << 1) + 1;
        var r = l + 1;

        if (l < this.size && this.array[l].priority < node.priority) {
            minIndex = l;
        }

        if (r < this.size && this.array[r].priority < Math.min(this.array[l].priority, node.priority)) {
            minIndex = r;
        }

        if (minIndex === i) {
            this.array[i] = node;
            this.indexMap[this.hash(element)] = i;
            return;
        } else {
            this.array[i] = this.array[minIndex];
            i = minIndex;
        }
    }
};

ds.Heap.prototype.add = function(element, priority) {
    this.array.push({element: element, priority: priority});
    this.siftUp(this.size);
    this.indexMap[this.hash(element)] = this.size++;
};

ds.Heap.prototype.extractMinimum = function() {
    if (this.size <= 0) {
        return undefined;
    }

    var node = this.array[0];
    this.array[0] = this.array[--this.size];
    this.array.pop();

    if (this.size > 0) {
        this.siftDown(0);
    }

    return node.element;
};

ds.Heap.prototype.changePriority = function(element, priority) {
    var index = this.hash(element);
    
    if (!index) {
        return false;
    }

    var node = this.array[index];

    if (priority < node.priority) {
        node.priority = priority;
        this.siftUp(index);
    } else if (priority > node.priority) {
        node.priority = priority;
        this.siftDown(index);
    }

    return true;
};