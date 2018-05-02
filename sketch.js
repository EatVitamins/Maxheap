window.onload = function() {

    function MaxHeap(){
        this.heap = [];
    }

    function find(i, arr, val){
        //if value is less than right and left then go down both recurse
        //if value is less than right and greater than left go down right recurse
        //if value is less than left and greater than right do down left recurs

        if(i > arr.length - 1 && arr[i] == val){
            return i;
        } else {
            if(val <= arr[i * 2 + 1] && val <= arr[i * 2 + 2]){
                console.log("double")
                return find(i * 2 + 1, arr, val) || find(i * 2 + 2, arr, val);

            }

            if(val <= arr[i * 2 + 1]){
                console.log("left");
                return find(i * 2 + 1, arr, val);
            }

            if(val <= arr[i * 2 + 2]){
                console.log("right");
                return find(i * 2 + 2, arr, val);
            }
        }

        if(arr[i] == val){
            return i;
        } else {
            return null;
        }
    }

    MaxHeap.prototype.remove = function(valu){

        var index = find(0,this.heap,valu,0);

        //swap
        this.heap[index] = this.heap[this.heap.length - 1];
        //this.heap[this.heap.length - 1] = valu;
        this.heap.pop();

        //reorganize

        var rChild = index * 2 + 2;
        var lChild = index * 2 + 1;


        while(this.heap[index] < this.heap[rChild] || this.heap[index] < this.heap[lChild]){
            if(this.heap[rChild] < this.heap[lChild]){
                //Left child is bigger than right
                var temp = this.heap[index];
                this.heap[index] = this.heap[lChild];
                this.heap[lChild] = temp;
                index = lChild;
                rChild = index * 2 + 2;
                lChild = index * 2 + 1;
            } else {
                var temp = this.heap[index];
                this.heap[index] = this.heap[rChild];
                this.heap[rChild] = temp;
                index = rChild;
                rChild = index * 2 + 2;
                lChild = index * 2 + 1;
            }

        }

        //start at the end
        //take the node with the value you want to remove then swap it with the value at the last index of the array
        // then move the swapped value to its correct place.
        // check children if they are bigger swap with the biggest child. -- moving down the tree
        //c1: if the valu = value at end of array remove and return
        //c2:
    }

    MaxHeap.prototype.add = function(valu){
        //var full;
        //var hold = this.heap.length + 1;
        /*while(true){
            if(hold == 1){
                full = true;
                break;
            } else if(hold % 2 != 0){
                full = false;
                break;
            } else {
                hold = hold / 2;
            }
        }*/


        this.heap.push(valu);
        var cIndex = this.heap.length - 1;
        var parent = Math.floor((cIndex - 1) / 2);
        // add valu to the end of the heap[]
        //check if the valu is greater than or less than the parent
        //c1: valu < parent; keep it at the end of the array.
        //c2: valu > parent; switch with parent then check again

        if(this.heap[parent] <= valu){
            while(this.heap[cIndex] > this.heap[parent]){
                println(this.heap);
                this.heap[cIndex] = this.heap[parent];
                this.heap[parent] = valu;
                cIndex = parent;
                parent = Math.floor((cIndex - 1) / 2);
            }

        }
        /*if(arrlength == 0){
            this.heap.push(valu);
        } else {
            for(var i = 0 ; i < arrlength ; i++){

                if(valu < this.heap[i]){
                    //valu is less than current
                } else if(valu > this.heap[i]){
                    //valu is greater than current
                }

            }
        }*/
    }

    function swap(x,y,heap){
        var temp = heap.heap[x];
        heap.heap[x] = heap.heap[y];
        heap.heap[y] = temp;
        return heap;
    }

    function buildMaxheap(arr){
        var heap = new MaxHeap();
        for(var i = 0; i < arr.length; i++){
            heap.add(arr[i]);
        }
        return heap;
    }

    function heapify(arr){ //turn every given array into a heap
        //part 1 - turn array into MaxHeap
        var h = buildMaxheap(arr);
        //part 2 - sort the heap from greatest to smallest
        var sorted = [];
        var index = 0;
        var rChild = index * 2 + 2;
        var lChild = index * 2 + 1;

        for(var i = 0; i < arr.length; i++){
            h = swap(h.heap.length - 1, 0,h);
            sorted.push(h.heap.pop());
            h = buildMaxheap(h.heap);
        }
        return sorted;
    }

    function start(){
        var test = new MaxHeap();
        for(var i = 0 ; i < 10; i++){
            test.add(Randomizer.nextInt(1,100));
        }
        console.log(test.heap);
        console.log(heapify(test.heap));

    }

if (typeof start === 'function') {
    start();
    }
};
