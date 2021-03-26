import React, {Component} from 'react'

class Submission extends Component {
    initialState = {
        formula : '',
    }

    state = this.initialState

    handleChange = (event) => {
        const{name, value} = event.target

        this.setState({
            [name] : value,
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }

    render () {
        const{formula} = this.state

        return (
            <form>
                <label htmlFor="formula">Formula:</label>
                    <input
                    type="text"
                    name="formula"
                    id="formula"
                    value={formula}
                    onChange={this.handleChange} />
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        )
    }
}

export default Submission