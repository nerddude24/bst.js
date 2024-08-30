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
const startingArray = [4, 5, 1, 7, 8, 9, 2, 3, 6];
const tree = new Tree(startingArray);

prettyPrint(tree.root);

console.log("----------------------------------------");
tree.insert(0);
tree.insert(11);
tree.remove(1);
tree.remove(tree.root.val);
prettyPrint(tree.root);

console.log("----------------------------------------");
const double = (node) => (node.val *= 2);
const half = (node) => (node.val /= 2);
tree.levelOrder(double);
tree.preOrder(half);
tree.inOrder(double);
tree.postOrder(half);
try {
	// didn't provide callback, this should throw an error and run the catch.
	tree.inOrder();
} catch (error) {
	console.log("Task failed successfully.");
}
prettyPrint(tree.root);

console.log("----------------------------------------");
console.log("depth(3) == " + tree.depth(3));
console.log("height(3) == " + tree.height(3));
console.log("depth(999) == " + tree.depth(999));
console.log("isBalanced() == " + tree.isBalanced());
console.log("inserting some items to unbalance the tree...");
tree.insert(100);
tree.insert(200);
prettyPrint(tree.root);
console.log("isBalanced() == " + tree.isBalanced());

console.log("----------------------------------------");
console.log("Now we balance the tree, running rebalance()");
tree.rebalance();
prettyPrint(tree.root);
console.log("isBalanced() == " + tree.isBalanced());
