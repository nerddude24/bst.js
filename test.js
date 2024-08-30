import { Tree } from "./bst.js";

function prettyPrint(node, prefix = "", isLeft = true) {
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
}

function printTreeArrays(tree) {
	let nodeArr = [];

	console.log("All elements in level order: ");
	tree.levelOrder((node) => nodeArr.push(node.val));
	console.log(nodeArr);

	console.log();

	console.log("All elements in pre order: ");
	nodeArr = [];
	tree.preOrder((node) => nodeArr.push(node.val));
	console.log(nodeArr);

	console.log();

	console.log("All elements in order: ");
	nodeArr = [];
	tree.inOrder((node) => nodeArr.push(node.val));
	console.log(nodeArr);

	console.log();

	console.log("All elements in post order: ");
	nodeArr = [];
	tree.postOrder((node) => nodeArr.push(node.val));
	console.log(nodeArr);

	console.log();
}

function genRandomArr(size, maxNum = 100) {
	const arr = [];
	for (let i = 0; i < size; i++) arr.push(Math.floor(Math.random() * maxNum));
	return arr;
}

const tree = new Tree(genRandomArr(100, 100));
console.log("is tree balanced? > " + tree.isBalanced());

printTreeArrays(tree);

console.log();
console.log();

console.log("Adding a few large numbers to imbalance the tree...");
tree.insert(200);
tree.insert(300);
tree.insert(400);

console.log("is tree balanced? > " + tree.isBalanced());

console.log("Rebalancing the tree...");
tree.rebalance();

console.log("is tree balanced? > " + tree.isBalanced());

printTreeArrays(tree);

console.log("-------------------------------------");
console.log("Final tree:");
prettyPrint(tree.root);
