import { mergeSort, removeDupes } from "./util.js";

class Queue {
	constructor() {
		this._array = [];
	}

	enqueue(val) {
		this._array.push(val);
	}

	pop() {
		return this._array.shift();
	}

	length() {
		return this._array.length;
	}

	isEmpty() {
		return this._array.length === 0;
	}
}

class TreeNode {
	constructor(val) {
		this.val = val;
		this.left = null;
		this.right = null;
	}
}

class Tree {
	constructor(arr) {
		// first remove duplicates from array, then sort it.
		// (faster than the other way around).
		const array = mergeSort(removeDupes(arr));
		this.root = this._buildTree(array);
	}

	_buildTree(arr, start = 0, end = arr.length - 1) {
		if (start > end) return null;

		const mid = parseInt((start + end) / 2);
		const root = new TreeNode(arr[mid]);

		root.left = this._buildTree(arr, start, mid - 1);
		root.right = this._buildTree(arr, mid + 1, end);

		return root;
	}

	insert(val) {
		let current = this.root;

		while (true) {
			if (val == current.val) return; // no duplicates

			if (val < current.val) {
				// if the left is empty, insert the node and return
				if (current.left == null) {
					const node = new TreeNode(val);
					current.left = node;
					return;
				}
				// else move to the left and continue
				current = current.left;
			} else {
				// if the right is empty, insert the node and return
				if (current.right == null) {
					const node = new TreeNode(val);
					current.right = node;
					return;
				}
				// else move to the right and continue
				current = current.right;
			}
		}
	}

	remove(target, root = this.root) {
		if (root === null) return null; // Base case

		if (root.val > target) {
			root.left = this.remove(target, root.left);
		} else if (root.val < target) {
			root.right = this.remove(target, root.right);
		} else {
			// If root matches with the given key

			// Case 1: root has 0 children OR only right child.
			if (root.left === null) return root.right;

			// Case 2: root has only left child.
			if (root.right === null) return root.left;

			// Case 3: root has both children
			let successor = this._getSuccessor(root);
			root.val = successor.val;
			root.right = this.remove(successor.val, root.right);
		}

		return root;
	}

	// returns the successor of the given node. It's only used by remove().
	_getSuccessor(current) {
		current = current.right;
		while (current !== null && current.left !== null) {
			current = current.left;
		}
		return current;
	}

	find(target, root = this.root) {
		// base cases
		if (root === null) return null;
		if (root.val === target) return root;

		if (target < root.val) return this.find(target, root.left);
		else return this.find(target, root.right);
	}

	// These 'order' methods are basically forEach for trees.
	// This is a level order variant.
	// More info here: https://youtu.be/86g8jAQug04
	levelOrder(cb) {
		if (cb == null)
			throw new Error(
				"Error in Tree class: Called levelOrder but didn't provide callback!"
			);

		const nodeQueue = new Queue();
		nodeQueue.enqueue(this.root);

		while (!nodeQueue.isEmpty()) {
			const node = nodeQueue.pop();
			if (node == null) continue;

			cb(node);

			nodeQueue.enqueue(node.left);
			nodeQueue.enqueue(node.right);
		}
	}

	// This is the pre-order variant
	// More info here: https://youtu.be/gm8DUJJhmY4
	preOrder(cb, root = this.root) {
		if (cb == null)
			throw new Error(
				"Error in Tree class: Called preOrder but didn't provide callback!"
			);

		if (root == null) return;

		cb(root);
		this.preOrder(cb, root.left);
		this.preOrder(cb, root.right);
	}

	// This is the in-order variant
	inOrder(cb, root = this.root) {
		if (cb == null)
			throw new Error(
				"Error in Tree class: Called inOrder but didn't provide callback!"
			);

		if (root == null) return;

		this.inOrder(cb, root.left);
		cb(root);
		this.inOrder(cb, root.right);
	}

	// This is the post-order variant
	postOrder(cb, root = this.root) {
		if (cb == null)
			throw new Error(
				"Error in Tree class: Called postOrder but didn't provide callback!"
			);

		if (root == null) return;

		this.postOrder(cb, root.left);
		this.postOrder(cb, root.right);
		cb(root);
	}

	depth(target, root = this.root) {
		if (root === null) return NaN;
		if (root.val === target) return 0;

		if (target < root.val) return 1 + this.depth(target, root.left);
		else return 1 + this.depth(target, root.right);
	}

	height(target, root = this.find(target)) {
		if (root === null) return -1;

		return (
			1 +
			Math.max(this.height(target, root.left), this.height(target, root.right))
		);
	}

	isBalanced() {
		const leftHeight = this.height(this.root.left.val);
		const rightHeight = this.height(this.root.right.val);

		return Math.abs(leftHeight - rightHeight) <= 1;
	}

	rebalance() {
		if (this.isBalanced()) return;

		let treeArray = [];
		this.levelOrder((node) => treeArray.push(node.val));
		treeArray = mergeSort(treeArray); // no need to remove dupes

		this.root = this._buildTree(treeArray);
	}
}

export { Tree };
