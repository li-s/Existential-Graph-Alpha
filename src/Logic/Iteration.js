import { Tree, tree_copy } from "./Tree"

const CheckSubtree = (traversal, traversalSubTree) => {
    // traversal.length <= traversalSubTree.length
    // For it to be a subtree
    if (traversal.length - 1 > traversalSubTree.length - 1) {
        return false
    }
    for (var i = 0; i < traversal.length - 1; i++) {
        if (traversal[i] != traversalSubTree[i]) {
            return false
        }
    }

    return true
}

const Iteration = ({ mainTree, selectedFormula, tree, selectedFormulaTraversal, traversal }) => {
    //console.log(mainTree, selectedFormula, tree, selectedFormulaTraversal, traversal)
    if (!CheckSubtree(selectedFormulaTraversal, traversal)) {
        console.log("You cannot iterate here!")
        return
    }

    // Get a copy of the subtree at iteration
    var subtreeCopy = tree.subtree[0]

    // Cut the tree at the traversal
    tree.subtree.splice(0, 1)

    // Put an "and node"
    Tree.incrementCounter()
    var andNode = new Tree("&")
    // put the first subtree back
    andNode.subtree.push(subtreeCopy)
    // Put the new iterated subtree in
    andNode.subtree.push(tree_copy(selectedFormula))

    tree.subtree.push(andNode)
}

export default Iteration