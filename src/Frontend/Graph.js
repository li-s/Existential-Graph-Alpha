import React, {Component} from 'react'

import Container from'./components/Container'
import Prop from './components/Prop'
import './Graph.css'

import {convert_to_tree, Tree} from'../Logic/Tree'

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
    const{tree} = props
    if (tree) {
        console.log("tree value = ", tree.value)
        if (tree.value == "&") {
            return (
                <Prop menuItems={and}>
                    <Graph tree = {tree.subtree[0]} />
                    <Graph tree = {tree.subtree[1]} />
                </Prop>
            )
        } else if (tree.value == "~") {
            return (
                <Container menuItems={not} style={{border: '1px solid black',}}>
                    <Graph tree = {tree.subtree[0]} />
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

const prop = [
    {
        text: 'select',
        onClick: (e) => { console.log('selected!') }
    },
    {
        text: 'Insert Double Cut',
        onClick: (e) => { console.log('Insert Double Cut!') }
    },
    {
        text: "prop",
        onClick: (e) => {console.log("prop")}
    }
]

const and = [
    {
        text: 'select',
        onClick: (e) => { console.log('selected!') }
    },
    {
        text: 'Insert Double Cut',
        onClick: (e) => { console.log('Insert Double Cut!') }
    },
    {
        text: "and",
        onClick: (e) => {console.log("and")}
    }
]

const not = [
    {
        text: 'select',
        onClick: (e) => { console.log('selected!') }
    },
    {
        text: 'Insert Double Cut',
        onClick: (e) => { console.log('Insert Double Cut!') }
    },
    {
        text: "not",
        onClick: (e) => {console.log("not")}
    }
]

class Graph extends Component {
    render () {
        const{tree} = this.props
        return(
            <GraphBody tree = {tree} />
        )
    }
}

export default Graph
