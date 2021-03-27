import React, {Component} from 'react'


const GraphHeader = () => {
    return (
        <thread>
            <tr>
                <th>Graph</th>
            </tr>
        </thread>
    )
}

const GraphBody = (props) => {
}

class Graph extends Component {
    render () {
        return(
            <GraphHeader />
        )
    }
}

export default Graph
