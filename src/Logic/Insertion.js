import { check_even_cut } from "./Tree"

const Insertion = ({ mainTree, selectedFormula, tree, selectedFormulaTraversal, traversal }) => {
    // Check if odd depth
    if (check_even_cut(mainTree, traversal)) {
        console.log("Not odd depth")
        return
    }

    
}

export default Insertion