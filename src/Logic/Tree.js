import { index_match, find_parenthesis } from './Utils'

class Tree {
    constructor(value) {
        this.ID = Tree.getCount();
        this.value = value;
        this.subtree = [];
        this.parentID = null;
    }

    static incrementCounter() {
        this.counter = this.getCount() + 1
    }

    static getCount() {
        return this.counter || 0
    }
}

const convert_to_tree = (str) => {
    var tree
    var toret = find_parenthesis(str)
    var childTree = null
    var level1 = null
    var level2 = null
    var level3 = null

    if ((0 in toret) && (toret[0] === (str.length - 1))) {
        str = str.slice(1, str.length - 1)
    }

    // The only time we handle negation is when it is the first symbol
    if (str.toString().indexOf("~") === 0) {
        tree = new Tree("~")
        Tree.incrementCounter()
        childTree = convert_to_tree(str.slice(1, str.length))
        childTree.parentID = tree.ID
        tree.subtree.push(childTree)
        // Then we handle and by finding all conjunction outside of parenthesis
    } else if (str.toString().includes("&") && index_match("&", str).length > 0) {
        // First get all conjunction outside parenthesis
        const all_conjunctions = index_match("&", str)
        tree = new Tree("&")
        // Create sub trees split at the indexes of conjunction we found
        for (var i = 0; i <= all_conjunctions.length; i++) {
            Tree.incrementCounter()
            childTree = null
            if (i === 0) {
                childTree = convert_to_tree(str.slice(0, all_conjunctions[0]))
                childTree.parentID = tree.ID
                tree.subtree.push(childTree)
            } else if (i === all_conjunctions.length) {
                childTree = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1,))
                childTree.parentID = tree.ID
                tree.subtree.push(childTree)
            } else {
                childTree = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, all_conjunctions[i]))
                childTree.parentID = tree.parentID
                tree.subtree.push(childTree)
            }
        }
    } else if (str.toString().includes("|") && index_match("|", str).length > 0) {
        // First get all disjunction outside parenthesis
        const all_conjunctions = index_match("|", str)
        tree = new Tree("~")
        Tree.incrementCounter()
        level1 = new Tree("&")
        level1.parentID = tree.ID
        // Create sub trees split at the indexes of disjunction we found
        for (var j = 0; j <= all_conjunctions.length; j++) {
            Tree.incrementCounter()
            level2 = new Tree("~")
            Tree.incrementCounter()
            level2.parentID = level1.ID
            level3 = null
            if (j === 0) {
                level3 = convert_to_tree(str.slice(0, all_conjunctions[0]))
            } else if (j === all_conjunctions.length) {
                level3 = convert_to_tree(str.slice(all_conjunctions[j - 1] + 1,))
            } else {
                level3 = convert_to_tree(str.slice(all_conjunctions[j - 1] + 1, all_conjunctions[j]))
            }
            level3.parentID = level2.ID
            level2.subtree.push(level3)
            level1.subtree.push(level2)
        }
        tree.subtree.push(level1)
    } else if (str.toString().includes(">") && index_match(">", str).length > 0) {
        // First get all implication outside parenthesis
        const all_conjunctions = index_match(">", str)
        tree = new Tree("~")
        Tree.incrementCounter()
        level1 = new Tree("&")
        level1.parentID = tree.ID
        Tree.incrementCounter()
        level2 = new Tree("~")
        level2.parentID = level1.ID
        // Create sub trees split at the indexes of disjunction we found
        for (var k = 0; k <= all_conjunctions.length; k++) {
            Tree.incrementCounter()
            if (k === 0) {
                level3 = convert_to_tree(str.slice(0, all_conjunctions[0]))
                level3.parentID = level2.ID
                level1.subtree.push(level3)
            } else if (k === all_conjunctions.length) {
                level3 = convert_to_tree(str.slice(all_conjunctions[k - 1] + 1,))
                level3.parentID = level2.ID
                level2.subtree.push(level3)
                level1.subtree.push(level2)
            } else {
                level3 = convert_to_tree(str.slice(all_conjunctions[k - 1] + 1, all_conjunctions[k]))
                level3.parentID = level2.ID
                level2.subtree.push(level3)
                level1.subtree.push(level2)
            }
        }
        tree.subtree.push(level1)
    } else {
        tree = new Tree(str)
    }

    return tree
}

const CheckSubtree = (traversal, traversalSubTree) => {
    // traversal.length <= traversalSubTree.length
    // For it to be a subtree
    if (traversal.length - 1 > traversalSubTree.length - 1) {
        return false
    }
    for (var i = 0; i < traversal.length - 1; i++) {
        if (traversal[i] !== traversalSubTree[i]) {
            return false
        }
    }

    return true
}

const tree_copy = (tree) => {
    if (!tree) {
        return
    }

    var node
    Tree.incrementCounter()

    if (tree.value === "&") {
        node = new Tree("&")
    } else if (tree.value === "~") {
        node = new Tree("~")
    } else {
        node = new Tree(tree.value)
    }

    for (var i = 0; i < tree.subtree.length; i++) {
        node.subtree.push(tree_copy(tree.subtree[i]))
    }

    return node
}

const check_equals = (tree1, tree2) => {
    if (!tree1 && !tree2) {
        return true
    } else if (!tree1 || !tree2) {
        return false
    }

    if ((tree1.value === tree2.value) && (tree1.subtree.length === tree2.subtree.length)) {
        for (var i = 0; i < tree1.subtree.length; i++) {
            if (!check_equals(tree1.subtree[i], tree2.subtree[i])) {
                return false
            }
        }

        return true
    }

    return false
}

const check_even_cut = (tree, traversal) => {
    var cutSeen = 0
    if (traversal.length === 0 || !tree) {
        return true
    }

    var node = tree
    for (var i = 0; i < traversal.length; i++) {
        if (node.value === "~") {
            cutSeen += 1
        }
        node = node.subtree[traversal[i]]
    }
    console.log(cutSeen)
    var aaa = cutSeen % 2 === 0
    console.log(aaa)

    return cutSeen % 2 === 0
}

export { convert_to_tree, Tree, tree_copy, CheckSubtree, check_equals, check_even_cut }