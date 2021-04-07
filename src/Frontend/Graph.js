import React, { Component } from 'react'

import Container from './components/Container'
import Prop from './components/Prop'
import './Graph.css'

class Graph extends Component {
    render() {
        const { tree, handleSelect, handleIterate, handleDeIterate, handleErasure, traversal } = this.props
        //console.log("tree = ", tree)
        //console.log("traversal = ", traversal)

        const prop = [
            {
                text: "prop",
                onClick: () => { console.log("prop") }
            },
            {
                text: 'Select Prop',
                onClick: () => {
                    handleSelect({ tree, traversal })
                }
            },
            {
                text: 'Erase Prop',
                onClick: () => {
                    handleErasure({ tree, traversal })
                }
            },
            {
                text: 'Deiterate selected from here',
                onClick: () => {
                    handleDeIterate({ tree, traversal })
                }
            },
        ]

        const and = [
            {
                text: "Conjunction",
                onClick: () => { console.log("and") }
            },
            {
                text: 'Select Conjunction',
                onClick: () => {
                    console.log('selected!')
                    handleSelect({ tree, traversal })
                }
            },
            {
                text: 'Erase Conjunction',
                onClick: () => {
                    handleErasure({ tree, traversal })
                }
            },
            {
                text: 'Deiterate selected from here',
                onClick: () => {
                    handleDeIterate({ tree, traversal })
                }
            },
        ]

        const not = [
            {
                text: "Negation",
                onClick: () => { console.log("not") }
            },
            {
                text: 'Select Negation',
                onClick: () => {
                    handleSelect({ tree, traversal })
                }
            },
            {
                text: 'Erase Negation',
                onClick: () => {
                    handleErasure({ tree, traversal })
                }
            },
            {
                text: 'Iterate selected here',
                onClick: () => {
                    handleIterate({ tree, traversal })
                }
            },
            {
                text: 'Deiterate selected from here',
                onClick: () => {
                    handleDeIterate({ tree, traversal })
                }
            },
        ]

        const GraphBody = (props) => {
            const { tree, handleSelect, handleIterate, traversal } = props
            if (tree) {
                if (tree.value === "&") {
                    var leftTraversal = Array.from(traversal)
                    var rightTraversal = Array.from(traversal)
                    leftTraversal.push(0)
                    rightTraversal.push(1)
                    return (
                        <Prop menuItems={and}>
                            <Graph tree={tree.subtree[0]} handleSelect={handleSelect}
                                handleIterate={handleIterate}
                                handleDeIterate={handleDeIterate}
                                handleErasure={handleErasure}
                                traversal={leftTraversal} />
                            <Graph tree={tree.subtree[1]} handleSelect={handleSelect}
                                handleIterate={handleIterate}
                                handleDeIterate={handleDeIterate}
                                handleErasure={handleErasure}
                                traversal={rightTraversal} />
                        </Prop>
                    )
                } else if (tree.value === "~") {
                    var downTraversal = Array.from(traversal)
                    downTraversal.push(0)
                    return (
                        <Container menuItems={not} >
                            <Graph tree={tree.subtree[0]} handleSelect={handleSelect}
                                handleIterate={handleIterate}
                                handleDeIterate={handleDeIterate}
                                handleErasure={handleErasure}
                                traversal={downTraversal} />
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
            <GraphBody tree={tree} handleSelect={handleSelect} handleIterate={handleIterate}
                handleDeIterate={handleDeIterate} 
                handleErasure={handleErasure}
                traversal={traversal} />
        )
    }
}

export default Graph
