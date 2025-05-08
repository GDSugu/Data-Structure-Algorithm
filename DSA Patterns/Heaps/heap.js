// NOTE: The main use case of a max heap is to quickly get and remove the maximum element while maintaining the heap structure.

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Helper function to swap two elements in the heap
  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // Helper function to maintain heap property after insertion
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] <= this.heap[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // Insert an element into the heap
  insert(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  // Helper function to maintain heap property after removal
  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    while (index < length) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let largest = index;

      if (leftChildIndex < length && this.heap[leftChildIndex] > this.heap[largest]) {
        largest = leftChildIndex;
      }

      if (rightChildIndex < length && this.heap[rightChildIndex] > this.heap[largest]) {
        largest = rightChildIndex;
      }

      if (largest === index) break;
      this.swap(index, largest);
      index = largest;
    }
  }

  // Remove the largest element from the heap (max-heap)
  removeMax() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return max;
  }


 removeMax(){
}

  // Peek at the largest element in the heap (without removing it)
  peek() {
    return this.heap[0];
  }

  // Get the size of the heap
  size() {
    return this.heap.length;
  }
}



function sumKLargest(arr, k) {
  const maxHeap = new MaxHeap();

  for (let num of arr) {
    maxHeap.insert(num);
    if (maxHeap.size() > k) {
      maxHeap.removeMax(); // Remove the largest element if heap size exceeds K
    }
  }

  let sum = 0;
  while (maxHeap.size() > 0) {
    sum += maxHeap.removeMax(); // Pop and sum the K largest elements
  }

  return sum;
}




class MinHeap {
    constructor() {
      this.heap = [];
    }
  
    // Helper function to swap two elements in the heap
    swap(i, j) {
      [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
  
    // Helper function to maintain heap property after insertion
    heapifyUp() {
      let index = this.heap.length - 1;
      while (index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        if (this.heap[index] >= this.heap[parentIndex]) break;
        this.swap(index, parentIndex);
        index = parentIndex;
      }
    }
  
    // Insert an element into the heap
    insert(val) {
      this.heap.push(val);
      this.heapifyUp();
    }
  
    // Helper function to maintain heap property after removal
    heapifyDown() {
      let index = 0;
      const length = this.heap.length;
      while (index < length) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;
        let smallest = index;
  
        if (leftChildIndex < length && this.heap[leftChildIndex] < this.heap[smallest]) {
          smallest = leftChildIndex;
        }
  
        if (rightChildIndex < length && this.heap[rightChildIndex] < this.heap[smallest]) {
          smallest = rightChildIndex;
        }
  
        if (smallest === index) break;
        this.swap(index, smallest);
        index = smallest;
      }
    }
  
    // Remove the smallest element from the heap (min-heap)
    removeMin() {
      if (this.heap.length === 0) return null;
      const min = this.heap[0];
      const last = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = last;
        this.heapifyDown();
      }
      return min;
    }
  
    // Peek at the smallest element in the heap (without removing it)
    peek() {
      return this.heap[0];
    }
  
  size() {
      return this.heap.length;
    }
  }
  