import React, { Component } from 'react'

import Submission from './Submission'
import Graph from './Graph'
import parseString from '../Logic/Parser'
import { convert_to_tree, Tree } from '../Logic/Tree'

class App extends Component {
  state = {
    inputFormula: '',
    parsedFormula: '',
    tree: null,
    selectedFormula: null,
    selectedFormulaTraversal: null,
  }

  handleSubmit = (form) => {
    const { formula } = form
    this.setState({ inputFormula: formula })
    this.setState({ parsedFormula: parseString(formula) })
    this.setState({ tree: convert_to_tree(parseString(formula)) })
  }

  handleSelect = ({ tree, traversal }) => {
    this.setState({ selectedFormula: tree })
    this.setState({ selectedFormulaTraversal: traversal })
  }

  render() {
    const { inputFormula, parsedFormula, tree, selectedFormula } = this.state

    return (
      <div className="rootPage">
        <p>Your input: {inputFormula}</p>
        <p>Your formula: {parsedFormula}</p>
        <Graph tree={tree} handleSelect={this.handleSelect} traversal={[]} />
        <Submission handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;
