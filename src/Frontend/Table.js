import React, {Component} from 'react'

const TableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Graph</th>
        </tr>
      </thead>
    )
}

const TableBody = (props) => {
    return <tbody>
      <tr key ={1}>
        <td>
          {props.inputFormula}
        </td>
      </tr>
    </tbody>
  }

const Table = (props) => {
    const {inputFormula} = props
  
    return (
      <table>
        <TableHeader />
        <TableBody inputFormula={inputFormula} />
      </table>
    )
}



export default Table