import React, { Component } from 'react'

import Container from './components/Container'
import Prop from './components/Prop'
import './Graph.css'

const GraphHeader = () => {
    return (
        <thread>
            <tr>
                <th>Graph</th>
            </tr>
        </thread>
    )
}

class Graph extends Component {
    render() {
        const { tree, handleSelect, traversal } = this.props
        //console.log("tree = ", tree)
        //console.log("traversal = ", traversal)

        const prop = [
            {
                text: 'select',
                onClick: () => {
                    handleSelect({ tree, traversal })
                }
            },
            {
                text: 'Iteration',
                onClick: () => {
                    console.log('Iteration!')
                    console.log(tree)
                }
            },
            {
                text: 'Insert Double Cut around',
                onClick: () => {
                    console.log('Insert Double Cut!')
                }
            },
            {
                text: "prop",
                onClick: () => { console.log("prop") }
            }
        ]

        const and = [
            {
                text: 'select',
                onClick: () => {
                    console.log('selected!')
                    handleSelect({ tree, traversal })
                }
            },
            {
                text: 'Insert Double Cut around',
                onClick: () => { console.log('Insert Double Cut!') }
            },
            {
                text: "and",
                onClick: () => { console.log("and") }
            }
        ]

        const not = [
            {
                text: 'select',
                onClick: () => {
                    handleSelect({ tree, traversal })
                }
            },
            {
                text: 'Insert Double Cut around',
                onClick: () => { console.log('Insert Double Cut!') }
            },
            {
                text: "not",
                onClick: () => { console.log("not") }
            }
        ]

        const GraphBody = (props) => {
            const { tree, handleSelect, traversal } = props
            if (tree) {
                if (tree.value == "&") {
                    var leftTraversal = Array.from(traversal)
                    var rightTraversal = Array.from(traversal)
                    leftTraversal.push(0)
                    rightTraversal.push(1)
                    return (
                        <Prop menuItems={and} tree={tree} handleSelect={handleSelect} traversal={traversal}>
                            <Graph tree={tree.subtree[0]} handleSelect={handleSelect} traversal={leftTraversal} />
                            <Graph tree={tree.subtree[1]} handleSelect={handleSelect} traversal={rightTraversal} />
                        </Prop>
                    )
                } else if (tree.value == "~") {
                    var downTraversal = Array.from(traversal)
                    downTraversal.push(0)
                    return (
                        <Container menuItems={not} >
                            <Graph tree={tree.subtree[0]} handleSelect={handleSelect} traversal={downTraversal} />
                        </Container>
                    )
                } else {
                    return (
                        <Prop menuItems={prop}>
                            {tree.value}
                        </Prop>
                    )
                }

            } else {
                return (
                    <></>
                )
            }
        }

        return (
            <GraphBody tree={tree} handleSelect={handleSelect} traversal={traversal} />
        )
    }
}

export default Graph
