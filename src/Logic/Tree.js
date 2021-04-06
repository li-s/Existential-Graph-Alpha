import {index_match, find_parenthesis} from './Utils'

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

    if ((0 in toret) && (toret[0] === (str.length - 1))) {
       str = str.slice(1,str.length - 1)
    }

    // The only time we handle negation is when it is the first symbol
    if (str.toString().indexOf("~") === 0) {
        tree = new Tree("~")
        Tree.incrementCounter()
        var childTree = convert_to_tree(str.slice(1, str.length))
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
            var childTree
            if (i === 0) {
                childTree = convert_to_tree(str.slice(0, all_conjunctions[0]))
                childTree.parentID = tree.ID
                tree.subtree.push(childTree)
            } else if (i === all_conjunctions.length) {
                childTree = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, ))
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
        var level1 = new Tree("&")
        level1.parentID = tree.ID
        // Create sub trees split at the indexes of disjunction we found
        for (var i = 0; i <= all_conjunctions.length; i++) {
            Tree.incrementCounter()
            if (i === 0) {
                var level2 = new Tree("~")
                Tree.incrementCounter()
                level2.parentID = level1.ID
                var level3 = convert_to_tree(str.slice(0, all_conjunctions[0]))
                level3.parentID = level2.ID
                level2.subtree.push(level3)
                level1.subtree.push(level2)
            } else if (i === all_conjunctions.length) {
                var level2 = new Tree("~")
                Tree.incrementCounter()
                level2.parentID = level1.ID
                var level3 = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, ))
                level3.parentID = level2.ID
                level2.subtree.push(level3)
                level1.subtree.push(level2)
            } else {
                var level2 = new Tree("~")
                Tree.incrementCounter()
                level2.parentID = level1.ID
                var level3 = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, all_conjunctions[i]))
                level3.parentID = level2.ID
                level2.subtree.push(level3)
                level1.subtree.push(level2)
            }
        }
        tree.subtree.push(level1)
    } else if (str.toString().includes(">") && index_match(">", str).length > 0) {
        // First get all implication outside parenthesis
        const all_conjunctions = index_match(">", str)
        tree = new Tree("~")
        Tree.incrementCounter()
        var level1 = new Tree("&")
        level1.parentID = tree.ID
        Tree.incrementCounter()
        var level2 = new Tree("~")
        level2.parentID = level1.ID
        // Create sub trees split at the indexes of disjunction we found
        for (var i = 0; i <= all_conjunctions.length; i++) {
            Tree.incrementCounter()
            if (i === 0) {
                var level3 = convert_to_tree(str.slice(0, all_conjunctions[0]))
                level3.parentID = level2.ID
                level1.subtree.push(level3)
            } else if (i === all_conjunctions.length) {
                var level3 = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, ))
                level3.parentID = level2.ID
                level2.subtree.push(level3)
                level1.subtree.push(level2)
            } else {
                var level3 = convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, all_conjunctions[i]))
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

export {convert_to_tree, Tree}