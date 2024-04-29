/***   sort   ***/

function sort(array) {
  array.sort((a, b) => {
    return a - b;
  });
  for (let i = 0; i < array.length; i++) {
    if (array.includes(array[i], i + 1)) {
      array.splice(i, 1);
    }
  }
  return array;
}

/***   nodes   ***/

function node() {
  let data;
  let left;
  let right;

  return { data, left, right };
}

function newNode(data) {
  let nodes = node();
  nodes.data = data;
  nodes.left = null;
  nodes.right = null;

  return nodes;
}

/***   Tree   ***/

function Tree(array) {
  /** insert & delete  **/

  function Insert(root, value) {
    if (!root) {
      return newNode(value);
    }

    if (value > root.data) {
      root.right = Insert(root.right, value);
    } else if (value < root.data) {
      root.left = Insert(root.left, value);
    }

    return root;
  }

  function deleteNode(root, k) {
    if (root === null) {
      return root;
    }

    if (root.data > k) {
      root.left = deleteNode(root.left, k);
      return root;
    } else if (root.data < k) {
      root.right = deleteNode(root.right, k);
      return root;
    }

    if (root.left === null) {
      let temp = root.right;
      delete root;
      return temp;
    } else if (root.right === null) {
      let temp = root.left;
      delete root;
      return temp;
    } else {
      let succParent = root;

      let succ = root.right;
      while (succ.left !== null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent !== root) {
        succParent.left = succ.right;
      } else {
        succParent.right = succ.right;
      }

      root.data = succ.data;

      delete succ;
      return root;
    }
  }

  /** build tree  **/

  function buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = parseInt((start + end) / 2);

    let root = newNode(arr[mid]);

    root.left = buildTree(arr, start, mid - 1);

    root.right = buildTree(arr, mid + 1, end);

    return root;
  }

  /** sort nodes  **/

  function sortNodes(root, arr) {
    if (root === null) return;

    sortNodes(root.left, arr);

    arr.push(root);

    sortNodes(root.right, arr);
  }

  /** rebalance  **/

  function reBalance(root) {
    let arr = [];
    sortNodes(root, arr);
    let n = arr.length;
    let r = buildTree(arr, 0, n - 1);
    return r;
  }

  /** preorder **/

  function preOrder(node) {
    if (node == null) {
      return;
    }

    console.log(node.data);

    preOrder(node.left);

    preOrder(node.right);
  }

  /** level order **/

  function levelOrder(root) {
    if (root == null) {
      return;
    } else {
      let arr = [];
      arr.push(root);

      while (!arr.length == 0) {
        let current = arr[0];
        console.log(current.data);

        if (current.left !== null) {
          arr.push(current.left);
        }
        if (current.right !== null) {
          arr.push(current.right);
        }
        arr.shift();
      }
    }
  }

  /** inorder **/

  function inOrder(root) {
    if (root == null) return;

    inOrder(root.left);

    console.log(root.data);

    inOrder(root.right);
  }

  /** postorder **/

  function postOrder(root) {
    if (root == null) return;

    postOrder(root.left);

    postOrder(root.right);
    console.log(root.data);
  }

  let sortedArr = sort(array);

  let n = array.length;

  let root = buildTree(sortedArr, 0, n - 1);

  function find(value) {
    function traverse(node, val) {
      if (node.data === val) {
        return node;
      } else if (node.data > val) {
        return traverse(node.left, val);
      } else if (node.data < val) {
        return traverse(node.right, val);
      }
    }

    return traverse(root, value);
  }

  /** height **/

  function height(root) {
    if (root === null) {
      return -1;
    }
    let lt = height(root.left);
    let rt = height(root.right);

    let ans = lt > rt ? lt + 1 : rt + 1;
    return ans;
  }

  /** depth **/

  function depth(root, node) {
    if (root === null) {
      return 0;
    }
    if (root.data == node) {
      return 1;
    }

    let left = depth(root.left, node);
    if (left !== 0) {
      return 1 + left;
    }

    let right = depth(root.right, node);
    if (right !== 0) {
      return 1 + right;
    }

    return Math.max(left, right);
  }

  /** isbalanced **/

  function isBalanced(root) {
    if (root == null) {
      return true;
    }

    let lh = height(root.left);
    let rh = height(root.right);

    if (
      Math.abs(lh - rh) <= 1 &&
      isBalanced(root.left) == true &&
      isBalanced(root.right) == true
    ) {
      return true;
    }
    return false;
  }

  return {
    root,
    newNode,
    Insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    reBalance,
  };
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }

  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }

  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

//prettyPrint(Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]).root);

function arrayMaker() {
  let arr = [];
  let idx = 10;
  let i = 0;

  while (i < idx) {
    let rand = Math.floor(Math.random() * 100 + 1);
    arr.push(rand);
    i++;
  }
  return arr;
}

function treeMaker(arr) {
  let array = sort(arr);
  let tree = Tree(array);
  prettyPrint(tree.root);
  console.log("Is this tree balanced : " + tree.isBalanced(tree.root));
  console.log("Level Order:");
  tree.levelOrder(tree.root);

  console.log("Pre Order:");
  tree.preOrder(tree.root);

  console.log("Post Order:");
  tree.postOrder(tree.root);

  console.log("In Order:");
  tree.inOrder(tree.root);

  //unbalance tree
  for (let i = 0; i < 5; i++) {
    tree.Insert(tree.root, Math.floor(Math.random() * 20));
  }
  prettyPrint(tree.root);
  console.log("Is this tree balanced : " + tree.isBalanced(tree.root));
  tree.root = tree.reBalance(tree.root);
  console.log("Is this tree balanced : " + tree.isBalanced(tree.root));
}

treeMaker(arrayMaker());
