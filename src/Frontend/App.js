import React, { Component } from 'react'

import Submission from './Submission'
import Graph from './Graph'
import parseString from '../Logic/Parser'
import { convert_to_tree } from '../Logic/Tree'
import Iteration from '../Logic/Iteration'
import DeIteration from '../Logic/DeIteration'

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

  render() {
    const { inputFormula, parsedFormula, mainTree } = this.state

    return (
      <div className="rootPage">
        <p>Your input: {inputFormula}</p>
        <p>Your formula: {parsedFormula}</p>
        <Graph tree={mainTree} handleSelect={this.handleSelect} handleIterate={this.handleIterate} 
          handleDeIterate={this.handleDeIterate} traversal={[]} />
        <Submission handleSubmit={this.handleSubmit} />
        <button onClick={this.useForceUpdate}>
          click to re-render
        </button>
      </div>
    )
  }
}

export default App;
