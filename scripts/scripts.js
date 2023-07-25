import { tree } from "./tree.js";

// Creating array of values
var array = [5, 3, 45, 7, 6, 4, 2, 46, 24, 13, 46, 95, 72, 17, 22, 31, 90, 55];

// Creating a binary search tree from array.
var t = tree(array);

// Checking balanced
console.log("Balanced? ", t.isBalanced()); // true
console.log("\n");

// Printing tree
t.prettyPrint();
console.log("\n");

// Printing in level order traversal
var levelOrder = t.levelOrder();
console.log("Level order");
console.log(levelOrder);

// Printing preorder traversal
var preOrder = t.preorder();
console.log("Preorder");
console.log(preOrder);

// Printing postorder traversal
var postOrder = t.postorder();
console.log("Postorder");
console.log(postOrder);

// Printing inorder traversal
var inOrder = t.inorder();
console.log("Inorder");
console.log(inOrder);

// Adding multiple nodes to unbalance tree
t.insertNode(200);
t.insertNode(431);
t.insertNode(128);
t.insertNode(195);
t.insertNode(742);
t.insertNode(236);
t.insertNode(384);
console.log("\n");

// Printing tree
t.prettyPrint();
console.log("\n");

// Checking balanced
console.log("Balanced? ", t.isBalanced()); // false
console.log("\n");

// Rebalancing tree
t.rebalance();

// Printing tree
t.prettyPrint();
console.log("\n");

// Checking balanced
console.log("Balanced? ", t.isBalanced()); // false
console.log("\n");

// Printing in level order traversal
var levelOrder = t.levelOrder();
console.log("Level order");
console.log(levelOrder);

// Printing preorder traversal
var preOrder = t.preorder();
console.log("Preorder");
console.log(preOrder);

// Printing postorder traversal
var postOrder = t.postorder();
console.log("Postorder");
console.log(postOrder);

// Printing inorder traversal
var inOrder = t.inorder();
console.log("Inorder");
console.log(inOrder);
