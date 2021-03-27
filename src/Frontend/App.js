import React, {Component} from 'react'
import Submission from './Submission'
import Graph from './Graph'
import parseString from '../Logic/Parser'
import convert_to_tree from '../Logic/Tree'

class App extends Component {
  state = {
    inputFormula : '',
    parsedFormula : '',
    alphaTree : null,
  }

  handleSubmit = (form) => { 
    const{formula} = form
    this.setState({inputFormula: formula})
    this.setState({parsedFormula : parseString(formula)})
    this.setState({alphaTree : convert_to_tree(parseString(formula))})
  }

  render () {
    const{inputFormula, parsedFormula, alphaTree} = this.state

    return (
      <div className="rootPage">        
        <p>{inputFormula}</p>
        <p>{parsedFormula}</p>
        <Graph alphaTree = {alphaTree} />
        <Submission handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;
