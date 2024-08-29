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
tree.insert(10);
prettyPrint(tree.root);
