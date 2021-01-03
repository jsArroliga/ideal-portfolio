import React from 'react'

import './../../style/index.scss'

function Table( props ){

    const { tableName, headers , rows } = props;

    return <div>
        <table>
            <thead>
                <tr>
                    {
                        headers.map( (label, index) => (
                            <th key={ `table-${tableName}-header-${index}` }> {label} </th>
                        ) )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    rows.map( (col, index) => {
                        return <tr key={ `table-${tableName}-row-${index}` }>
                            { col.map( (cell, i) => (
                                <td key={`table-${tableName}-row-cell-${index}-${i}`}> { cell } </td>
                             ) )}
                        </tr>
                    } )
                }
            </tbody>
        </table>
    </div>
}

export default Table;