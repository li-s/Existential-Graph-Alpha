import { Tree } from "./Tree"

const DoubleCut = ({ mainTree, tree, traversal }) => {
    var node = mainTree
    for (var i = 0; i < traversal.length - 1; i++) {
        node = node.subtree[traversal[i]]
    }

    node.subtree.splice(traversal[traversal.length - 1], 1)

    Tree.incrementCounter()
    var notNode = new Tree("~")
    Tree.incrementCounter()
    var notNode2 = new Tree("~")
    notNode2.subtree.push(tree)
    notNode.subtree.push(notNode2)
    node.subtree.push(notNode)
}

export default DoubleCut