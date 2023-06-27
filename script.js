function calculateMinCost() {
  // Get the input from the user
  const input = document.getElementById("rope-input").value;
  const ropes = input.split(",").map(Number);

  // Create a min-heap using the ropes array
  const minHeap = new MinHeap(ropes);

  let totalCost = 0;

  // Continue until there is only one rope left in the min-heap
  while (minHeap.size() > 1) {
    // Extract the two smallest ropes from the min-heap
    const rope1 = minHeap.extractMin();
    const rope2 = minHeap.extractMin();

    // Calculate the cost of connecting the two ropes
    const cost = rope1 + rope2;

    // Add the cost to the total cost
    totalCost += cost;

    // Insert the combined rope back into the min-heap
    minHeap.insert(cost);
  }

  // Display the minimum cost of connecting the ropes
  document.getElementById("result").innerText = totalCost;
}

// MinHeap class implementation
class MinHeap {
  constructor(arr = []) {
    this.heap = [];
    this.heapify(arr);
  }

  heapify(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.insert(arr[i]);
    }
  }

  size() {
    return this.heap.length;
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.size() > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return min;
  }

  heapifyUp(index) {
    const parentIndex = Math.floor((index - 1) / 2);

    if (parentIndex >= 0 && this.heap[parentIndex] > this.heap[index]) {
      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      this.heapifyUp(parentIndex);
    }
  }

  heapifyDown(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallest = index;

    if (
      leftChildIndex < this.size() &&
      this.heap[leftChildIndex] < this.heap[smallest]
    ) {
      smallest = leftChildIndex;
    }

    if (
      rightChildIndex < this.size() &&
      this.heap[rightChildIndex] < this.heap[smallest]
    ) {
      smallest = rightChildIndex;
    }

    if (smallest !== index) {
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];
      this.heapifyDown(smallest);
    }
  }
}

// Add event listener to the form submission
document.getElementById("rope-form").addEventListener("submit", function (e) {
  e.preventDefault();
  calculateMinCost();
});
