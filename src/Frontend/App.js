import React, {Component} from 'react'

import Submission from './Submission'
import Graph from './Graph'
import parseString from '../Logic/Parser'
import {convert_to_tree} from '../Logic/Tree'

class App extends Component {
  state = {
    inputFormula : '',
    parsedFormula : '',
    tree : null,
    selectedFormula : null,
  }

  handleSubmit = (form) => { 
    const{formula} = form
    this.setState({inputFormula: formula})
    this.setState({parsedFormula : parseString(formula)})
    this.setState({tree : convert_to_tree(parseString(formula))})
  }

  render () {
    const{inputFormula, parsedFormula, tree, selectedFormula} = this.state

    return (
      <div className="rootPage">        
        <p>Your input: {inputFormula}</p>
        <p>Your formula: {parsedFormula}</p>
        <Graph tree = {tree} />
        <Submission handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;
