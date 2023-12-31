import { node } from "./node.js";

// Binary search tree factory
const tree = (array) => {
  var root;
  var sortedArr = array.sort(function (a, b) {
    return a - b;
  });

  // Creates a binary search tree with the given sorted array.
  const buildTree = (array) => {
    if (array.length <= 0) {
      return null;
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
  root = buildTree(sortedArr);

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

  // Inserts a new node into the tree.
  const insertNode = (value, insertAfter = root) => {
    var newNode = node(value);

    if (!insertAfter) {
      return;
    }

    var prevNode = null;
    var tempNode = insertAfter;

    while (tempNode !== null) {
      if (tempNode.value > value) {
        prevNode = tempNode;
        tempNode = tempNode.left;
      } else if (tempNode.value < value) {
        prevNode = tempNode;
        tempNode = tempNode.right;
      }
    }

    if (prevNode.value > value) {
      prevNode.left = newNode;
    } else {
      prevNode.right = newNode;
    }
  };

  // Deletes a node of a given value in the tree.
  const deleteNode = (value, currNode = root) => {
    // If empty tree
    if (!currNode) {
      console.log("empty tree");
      return currNode;
    }

    // Go through tree to find the node to delete.
    // Keep track of previous node.
    var prevNode = root;
    while (currNode !== null && currNode.value !== value) {
      // Go left
      if (currNode.value > value) {
        prevNode = currNode;
        currNode = currNode.left;
        // Go right
      } else if (currNode.value < value) {
        prevNode = currNode;
        currNode = currNode.right;
      }
    }

    // If value is not in tree
    if (!currNode) {
      console.log("value does not exist");
      return currNode;
    }

    // If node to delete has no children
    if (currNode.left === null && currNode.right === null) {
      if (prevNode.left && prevNode.left.value === value) {
        prevNode.left = null;
      } else if (prevNode.right && prevNode.right.value === value) {
        prevNode.right = null;
      }

      currNode = null;
    }
    // // Has 1 child
    else if (!currNode.left || !currNode.right) {
      // Reassigns prevNode's left
      if (prevNode.left.value === value) {
        if (currNode.left) {
          prevNode.left = currNode.left;
        } else {
          prevNode.left = currNode.right;
        }
      }
      // Reassigns prevNode's right
      else if (prevNode.right.value === value) {
        if (currNode.left) {
          prevNode.right = currNode.left;
        } else {
          prevNode.right = currNode.right;
        }
      }

      currNode = null;
    }
    // Has 2 children
    else if (currNode.left && currNode.right) {
      var minNode = findMin(currNode.right);
      var minValue = minNode.value;

      deleteNode(minNode.value, root);

      currNode.value = minValue;

      currNode = null;
    }

    return root;
  };

  // Finds the minimum node of a given tree
  const findMin = (tree = root) => {
    var min = tree;

    while (min.left) {
      min = min.left;
    }

    return min;
  };

  // Takes a value and returns the node in the tree with that value
  const find = (value) => {
    var currNode = root;
    // If empty tree
    if (!currNode) {
      console.log("empty tree");
      return currNode;
    }

    // Iterate through tree until node with the value is found.
    while (currNode !== null && currNode.value !== value) {
      // Go left
      if (currNode.value > value) {
        currNode = currNode.left;
        // Go right
      } else if (currNode.value < value) {
        currNode = currNode.right;
      }
    }

    // If value is not in tree
    if (!currNode) {
      console.log("value does not exist");
      return currNode;
    }

    return currNode;
  };

  // Returns an array of nodes of the tree in level order traversal.
  const levelOrder = () => {
    var currNode = root;

    // Return null if tree is empty
    if (!currNode) {
      return currNode;
    }

    // queue stores nodes waiting to be read.
    var queue = [];
    // levelOrderArr stores the tree values in level order traversal
    var levelOrderArr = [];

    queue.push(currNode);

    // While the queue has remaining items.
    while (queue.length !== 0) {
      var node = queue.shift();

      // Adds current node
      levelOrderArr.push(node);

      // If node has any children, append them to the queue.
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    return levelOrderArr;
  };

  // Returns an array of nodes of the tree in inorder traversal.
  const inorder = (currNode = root, nodeArray = []) => {
    if (!currNode) {
      return currNode;
    }

    inorder(currNode.left, nodeArray);
    nodeArray.push(currNode);
    inorder(currNode.right, nodeArray);

    return nodeArray;
  };

  // Returns an array of nodes of the tree in preorder traversal.
  const preorder = (currNode = root, nodeArray = []) => {
    if (!currNode) {
      return;
    }

    nodeArray.push(currNode);
    preorder(currNode.left, nodeArray);
    preorder(currNode.right, nodeArray);

    return nodeArray;
  };

  // Returns an array of nodes of the tree in postorder traversal
  const postorder = (currNode = root, nodeArray = []) => {
    if (!currNode) {
      return;
    }

    postorder(currNode.left, nodeArray);
    postorder(currNode.right, nodeArray);
    nodeArray.push(currNode);

    return nodeArray;
  };

  // Accepts a node or value and returns it's height.
  // Height is the distance from the node to a leaf node.
  const height = (nodeValue = root) => {
    var findNode;
    // If value was passed, find it's node.
    if (Number.isInteger(nodeValue)) {
      findNode = find(nodeValue);
    } else {
      findNode = nodeValue;
    }

    // If node does not exist in tree.
    if (findNode === null) {
      return null;
    }

    // Get height of node.
    var height = treeHeight(findNode);

    return height;
  };

  // Helper function for height()
  // Returns the height of the tree.
  // Returns -1 if tree doesn't exist.
  // NOTE: Returning -1 is mandatory in order to calculate the height.
  const treeHeight = (currNode = root) => {
    if (!currNode) {
      return -1;
    }

    return Math.max(treeHeight(currNode.left), treeHeight(currNode.right)) + 1;
  };

  // Accepts a node or value and returns it's depth.
  // Depth is the distance from the node and the tree's root node.
  const depth = (nodeValue = root) => {
    var findNode;
    // If value was passed, find it's node.
    if (Number.isInteger(nodeValue)) {
      findNode = find(nodeValue);
    } else {
      findNode = nodeValue;
    }

    // If node does not exist in tree.
    if (findNode === null) {
      return null;
    }

    var depth = 0;
    var currNode = root;

    // Start from the root, find the given value while counting the depth.
    while (findNode.value !== currNode.value) {
      if (currNode.value > findNode.value) {
        currNode = currNode.left;
      } else if (currNode.value < findNode.value) {
        currNode = currNode.right;
      }

      if (currNode === null) {
        return null;
      }

      depth += 1;
    }

    return depth;
  };

  // Returns true if the tree is balanced.
  const isBalanced = (currNode = root) => {
    if (currNode === null) {
      return true;
    }

    var leftHeight = height(currNode.left);
    var rightHeight = height(currNode.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      isBalanced(currNode.left) === true &&
      isBalanced(currNode.right) === true
    ) {
      return true;
    }

    return false;
  };

  // Rebalanced the tree.
  // Returns the root of the new tree.
  const rebalance = () => {
    // Creates a new array from inorder()
    var newArr = inorder();

    // Turns the array from an array of nodes to an array of values.
    var valueArr = newArr.map((node) => node.value);

    // Creates a Set, which can only contain unique elements.
    // The spread operator turns it back to an array.
    // Is then sorted.
    var sortedUniqArr = [...new Set(valueArr)].sort();

    // Creating new tree
    root = buildTree(sortedUniqArr);
  };

  return {
    prettyPrint,
    insertNode,
    deleteNode,
    findMin,
    find,
    levelOrder,
    inorder,
    preorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

export { tree };
