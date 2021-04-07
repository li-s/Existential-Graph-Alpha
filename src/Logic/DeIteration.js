import { CheckSubtree, check_equals } from "./Tree"

const DeIteration = ({ mainTree, selectedFormula, tree, selectedFormulaTraversal, traversal }) => {
    // Make sure they are not the same tree
    if (tree.ID === selectedFormula.ID) {
        console.log("You cannot de-iterate the same formula!")
        return
    }
    
    // Make sure that one tree is a subtree of another's sibling
    if (!CheckSubtree(selectedFormulaTraversal, traversal)) {
        console.log("You cannot de-iterate here!")
        return
    }

    // Check if they are the same formula
    if (check_equals(selectedFormula, tree)) {
        // Cut the tree away
        var parentNode = mainTree
        for (var i = 0; i < traversal.length - 1; i++) {
            parentNode = parentNode.subtree[traversal[i]]
        }

        parentNode.subtree.splice(traversal[traversal.length - 1], 1)
    } else {
        console.log("Not the same tree!")
    }
}

export default DeIteration