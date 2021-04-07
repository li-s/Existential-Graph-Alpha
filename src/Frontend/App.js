import React, { Component } from 'react'

import Submission from './Submission'
import Graph from './Graph'
import parseString from '../Logic/Parser'
import { convert_to_tree } from '../Logic/Tree'
import Iteration from '../Logic/Iteration'
import DeIteration from '../Logic/DeIteration'
import DoubleCutAround from '../Logic/DoubleCutAround'
import Erasure from '../Logic/Erasure'
import Insertion from '../Logic/Insertion'
import RemoveDoubleCut from '../Logic/RemoveDoubleCut'

class App extends Component {
  state = {
    inputFormula: '',
    parsedFormula: '',
    mainTree: null,
    selectedFormula: null,
    selectedFormulaTraversal: null,
  }

  handleSubmit = (form) => {
    const { formula } = form
    this.setState({ inputFormula: formula })
    this.setState({ parsedFormula: parseString(formula) })
    this.setState({ mainTree: convert_to_tree(parseString(formula)) })
  }

  handleSelect = ({ tree, traversal }) => {
    this.setState({ selectedFormula: tree })
    this.setState({ selectedFormulaTraversal: traversal })
  }

  handleIterate = ({ tree, traversal }) => {
    const { mainTree, selectedFormula, selectedFormulaTraversal } = this.state
    Iteration({ selectedFormula, tree, selectedFormulaTraversal, traversal })
    this.setState({ mainTree: mainTree })
  }

  handleDeIterate = ({ tree, traversal }) => {
    const { mainTree, selectedFormula, selectedFormulaTraversal } = this.state
    DeIteration({ mainTree, selectedFormula, tree, selectedFormulaTraversal, traversal })
    this.setState({ mainTree: mainTree })
  }

  handleDoubleCutAround = ({ tree, traversal }) => {
    const { mainTree } = this.state
    DoubleCutAround({ mainTree, tree, traversal })
    this.setState({ mainTree: mainTree })
  }

  removeDoubleCut = ({ tree, traversal }) => {
    const { mainTree } = this.state
    RemoveDoubleCut({ mainTree, tree, traversal })
    this.setState({ mainTree: mainTree })
  }

  handleInsertion = ({ tree, traversal }) => {
    const { mainTree, selectedFormula, selectedFormulaTraversal } = this.state
    Insertion({ mainTree, selectedFormula, tree, selectedFormulaTraversal, traversal })
    this.setState({ mainTree: mainTree })
  }

  handleErasure = ({ tree, traversal }) => {
    const { mainTree } = this.state
    Erasure({ mainTree, traversal })
    this.setState({ mainTree: mainTree })
  }

  render() {
    const { inputFormula, parsedFormula, mainTree, selectedFormula } = this.state

    return (
      <div className="rootPage">
        <p>Your input: {inputFormula}</p>
        <p>Your formula: {parsedFormula}</p>
        <p>Graph</p>
        <Graph tree={mainTree} handleSelect={this.handleSelect} handleIterate={this.handleIterate}
          handleDeIterate={this.handleDeIterate}
          handleErasure={this.handleErasure}
          handleDoubleCutAround={this.handleDoubleCutAround}
          removeDoubleCut={this.removeDoubleCut}
          traversal={[]} />

        <p></p>
        <p>Selected Graph</p>
        <Graph tree={selectedFormula} handleSelect={this.handleSelect} handleIterate={this.handleIterate}
          handleDeIterate={this.handleDeIterate}
          handleErasure={this.handleErasure}
          handleDoubleCutAround={this.handleDoubleCutAround}
          removeDoubleCut={this.removeDoubleCut}
          traversal={[]} />

        <p></p>
        <Submission handleSubmit={this.handleSubmit} />
        <button onClick={this.useForceUpdate}>
          click to re-render
        </button>
      </div>
    )
  }
}

export default App;
