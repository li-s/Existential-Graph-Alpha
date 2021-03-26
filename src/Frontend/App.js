import React, {Component} from 'react'
import Submission from './Submission'
import Graph from './Graph'
import parseString from '../Logic/Parser'

class App extends Component {
  state = {
    inputFormula : '',
    parsedFormula : '',
    alphaTree : null,
  }

  handleSubmit = (form) => { 
    const{formula} = form
    const{parsedFormula} = this.state
    this.setState({inputFormula: formula})
    this.setState({parsedFormula : parseString(formula)})
  }

  render () {
    const{inputFormula, parsedFormula} = this.state
    console.log({inputFormula})

    return (
      <div className="rootPage">        
        <p>{inputFormula}</p>
        <p>{parsedFormula}</p>
        
        <Submission handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default App;
