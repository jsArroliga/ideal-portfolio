import React from 'react'

function Table( props ){

    const { tableName, headers , rows, rowIsActive = ()=>{} } = props;

    return <div className="table-scroll">
        <table >
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
                        return <tr className={ rowIsActive( col ) ? 'row-active' : ''} key={ `table-${tableName}-row-${index}` }>
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