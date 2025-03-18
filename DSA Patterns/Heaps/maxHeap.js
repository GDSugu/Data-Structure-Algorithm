class MaxHeap {
    constructor() {
        this.heap = [];
    }

    // Helper function to swap elements at indices i and j
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Maintain heap property after insertion by moving the new element up
    heapifyUp() {
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            let parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.heap[currentIndex] <= this.heap[parentIndex]) break;
            this.swap(currentIndex, parentIndex);
            currentIndex = parentIndex;
        }
    }

    // Insert a new element into the heap
    insert(val) {
        this.heap.push(val);
        this.heapifyUp();
    }

    // Maintain heap property after removal by moving the new root down
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

    // Remove and return the maximum element from the heap
    removeMax() {
        if (this.heap.length === 0) return null;
        const max = this.heap[0];
        // Replace the root with the last element
        this.heap[0] = this.heap.pop();
        // Restore the heap property if there are elements left
        if (this.heap.length > 0) {
            this.heapifyDown();
        }
        return max;
    }

    // Return the maximum element without removing it
    peek() {
        return this.heap[0];
    }

    // Return the number of elements in the heap
    size() {
        return this.heap.length;
    }
}
