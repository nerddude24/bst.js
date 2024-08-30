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
}

export { Tree };
