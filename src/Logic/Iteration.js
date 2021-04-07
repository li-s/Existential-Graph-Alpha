import { Tree, tree_copy, CheckSubtree } from "./Tree"

const Iteration = ({ selectedFormula, tree, selectedFormulaTraversal, traversal }) => {
    // Make sure that one tree is a subtree of another's sibling
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