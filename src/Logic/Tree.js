import {index_match, find_parenthesis} from './Utils'

class Tree {
    constructor(value) {
        this.value = value;
        this.subtree = [];
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
        tree.subtree.push(convert_to_tree(str.slice(1, str.length)))
    // Then we handle and by finding all conjunction outside of parenthesis
    } else if (str.toString().includes("&") && index_match("&", str).length > 0) {
        // First get all conjunction outside parenthesis
        const all_conjunctions = index_match("&", str)
        tree = new Tree("&")
        // Create sub trees split at the indexes of conjunction we found
        for (var i = 0; i <= all_conjunctions.length; i++) {
            if (i === 0) {
                tree.subtree.push(convert_to_tree(str.slice(0, all_conjunctions[0])))
            } else if (i === all_conjunctions.length) {
                tree.subtree.push(convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, )))
            } else {
                tree.subtree.push(convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, all_conjunctions[i])))
            }
        }
    } else if (str.toString().includes("|") && index_match("|", str).length > 0) {
        // First get all disjunction outside parenthesis
        const all_conjunctions = index_match("|", str)
        tree = new Tree("|")
        // Create sub trees split at the indexes of disjunction we found
        for (var i = 0; i <= all_conjunctions.length; i++) {
            if (i === 0) {
                tree.subtree.push(convert_to_tree(str.slice(0, all_conjunctions[0])))
            } else if (i === all_conjunctions.length) {
                tree.subtree.push(convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, )))
            } else {
                tree.subtree.push(convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, all_conjunctions[i])))
            }
        }
    } else if (str.toString().includes(">") && index_match(">", str).length > 0) {
        // First get all implication outside parenthesis
        const all_conjunctions = index_match(">", str)
        tree = new Tree(">")
        // Create sub trees split at the indexes of disjunction we found
        for (var i = 0; i <= all_conjunctions.length; i++) {
            if (i === 0) {
                tree.subtree.push(convert_to_tree(str.slice(0, all_conjunctions[0])))
            } else if (i === all_conjunctions.length) {
                tree.subtree.push(convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, )))
            } else {
                tree.subtree.push(convert_to_tree(str.slice(all_conjunctions[i - 1] + 1, all_conjunctions[i])))
            }
        }
    } else {
        tree = new Tree(str)
    }

    return tree
}

export {convert_to_tree, Tree}