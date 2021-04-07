const RemoveDoubleCut = ({ mainTree, tree, traversal }) => {
    // Check if there is another cut below
    if (!(tree.value === "~" && (tree.subtree[0].value === "~"))) {
        console.log("There is no 2 cuts here!")
        return
    }

    // Get parent node
    var node = mainTree
    for (var i = 0; i < traversal.length - 1; i++) {
        node = node.subtree[traversal[i]]
    }
    // Cut the tree
    node.subtree.splice(traversal[traversal.length - 1], 1)
    // Get a copy of the subtree at iteration
    var subtreeCopy = tree.subtree[0].subtree[0]
    // Join the cuts together
    node.subtree.push(subtreeCopy)
}

export default RemoveDoubleCut