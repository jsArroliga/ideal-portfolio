import React from 'react'

function Table (){

    const riskLevel = {
        1 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        2 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        3 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        4 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        5 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        6 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        7 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        8 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        9 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        },
        10 : {
            bounds : 80,
            largeCap : 20,
            midCap : 0,
            foreign : 0,
            smallCap : 0,
        }
    }

    return <div>
        <table>
            <thead>
                <tr>
                    <th>Risk</th>
                    <th>Bonds %</th>
                    <th>Large Cap %</th>
                    <th>Mid Cap %</th>
                    <th>Foreign %</th>
                    <th>Small Cap</th>
                </tr>
            </thead>
            <tbody>
                {
                    Object.keys( riskLevel ).map( level => {
                        let riskData =  riskLevel[level]
                        return <tr key={ `risk-table-${level}` }>
                            <td> { level } </td>
                            <td> { riskData.bounds } </td>
                            <td> { riskData.largeCap } </td>
                            <td> { riskData.midCap } </td>
                            <td> { riskData.foreign } </td>
                            <td> { riskData.smallCap } </td>
                        </tr>
                    } )
                }
            </tbody>
        </table>
    </div>
}

export default Table;