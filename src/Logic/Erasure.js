import { check_even_cut } from "./Tree"

const Erasure = ({ mainTree, traversal }) => {
    // Check if even depth
    if (!check_even_cut(mainTree, traversal)) {
        console.log("Not even depth")
        return
    }

    // Delete the sub tree
    var node = mainTree
    for (var i = 0; i < traversal.length - 1; i++) {
        node = node.subtree[traversal[i]]
    }

    node.subtree.splice(traversal[traversal.length - 1], 1)
}

export default Erasure