import mergeSort from "./merge-sort.js";

class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		// first clone the inputted array, then remove duplicates, then sort it.
		const array = mergeSort([...new Set(arr.slice())]);
		this.root = this.buildTree(array, 0, array.length - 1);
	}

	buildTree(arr, start, end) {
		if (start > end) return null;

		const mid = parseInt((start + end) / 2);
		const root = new TreeNode(arr[mid]);

		root.left = this.buildTree(arr, start, mid - 1);
		root.right = this.buildTree(arr, mid + 1, end);

		return root;
	}
}

export { Tree };
