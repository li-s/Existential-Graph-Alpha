const convert_to_flatTree = (tree, index, parent) => {
    var flatTree = []
    var node = {}
    node.id = index + 1
    node.text = tree.value
    if (typeof tree.value != "string") {
        node.text = tree.value.value
    }
    node.parentId = parent
    flatTree.push(node)
    var counter = 1
    for(var i = 0; i < tree.subtree.length; i++) {
        var insideTree = convert_to_flatTree(tree.subtree[i], index + counter, node.id)
        counter += insideTree.length
        flatTree = flatTree.concat(insideTree)
    }

    return flatTree
}

const add_field = (flatTree) => {
    return flatTree.map((item) => ({
        ...item,
        hasChildren:
            flatTree.filter((i) => i.parentId === item.id).length > 0,
    }))
}

export {convert_to_flatTree, add_field}