// Node factory for binary search tree.
// Takes in a value and returns a node.
// The default value for all values are null.
const node = (value = null, left = null, right = null) => {
  return { value: value, left: left, right: right };
};

export { node };
