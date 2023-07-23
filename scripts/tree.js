import { node } from "./node.js";

// Binary search tree factory
const tree = (array) => {
  var sortedArr = array.sort(function (a, b) {
    return a - b;
  });

  // Creates a binary search tree with the given sorted array.
  const buildTree = (array) => {
    if (array.length <= 0) {
      return;
    }

    var start = 0;
    var end = array.length - 1;
    var mid = Math.floor((start + end) / 2);

    var root = node(array[mid]);

    var leftSubtree = array.splice(start, mid);
    var rightSubtree = array.splice(1);

    root.left = buildTree(leftSubtree);
    root.right = buildTree(rightSubtree);

    return root;
  };

  var root = buildTree(sortedArr);

  // Prints a formatted binary search tree
  const prettyPrint = (node = root, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  return { prettyPrint };
};

export { tree };
