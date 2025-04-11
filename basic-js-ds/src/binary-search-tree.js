const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }
  
  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);
    if (!this._root) {
      this._root = newNode;
      return;
    }
    
    let current = this._root;
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) return current;
      current = data < current.data ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    this._root = this._removeNode(this._root, data);
  }

  _removeNode(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this._removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this._removeNode(node.right, data);
      return node;
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      let minNode = this._minNode(node.right);
      node.data = minNode.data;
      node.right = this._removeNode(node.right, minNode.data);
      return node;
    }
  }

  min() {
    return this._minNode(this._root)?.data || null;
  }

  _minNode(node) {
    while (node?.left) {
      node = node.left;
    }
    return node;
  }

  max() {
    return this._maxNode(this._root)?.data || null;
  }

  _maxNode(node) {
    while (node?.right) {
      node = node.right;
    }
    return node;
  }
}

module.exports = {
  BinarySearchTree
};