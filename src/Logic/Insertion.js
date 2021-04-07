import { Tree, check_even_cut } from "./Tree"

const Insertion = ({ mainTree, tree, traversal, formulaToInsert }) => {
    if (!formulaToInsert) {
        console.log("No formula detected")
        return
    }

    // Check if odd depth
    if (check_even_cut(mainTree, traversal)) {
        console.log("Not odd depth")
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
    // Put the new inserted subtree in
    andNode.subtree.push(formulaToInsert)
    tree.subtree.push(andNode)
}

export default Insertion