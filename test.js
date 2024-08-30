import { Tree } from "./bst.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
prettyPrint(tree.root);

console.log("----------------------------------------");
tree.insert(0);
tree.insert(11);
tree.remove(1);
prettyPrint(tree.root);

console.log("----------------------------------------");
tree.remove(tree.root.val);
prettyPrint(tree.root);

console.log("----------------------------------------");
const double = (node) => (node.val *= 2);
tree.levelOrder(double);
prettyPrint(tree.root);

console.log("----------------------------------------");
const half = (node) => (node.val /= 2);
tree.preOrder(half);
tree.inOrder(double);
tree.postOrder(half);
prettyPrint(tree.root);
