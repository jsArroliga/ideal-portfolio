import React, { useEffect, useState } from 'react'

import riskLevelData from '../../data/riskLevelData.json'
import { useSelector } from 'react-redux'

function RebalanceTable(  ){

    const [ bonds, setBonds ] = useState(0)
    const [ largeCap, setLargeCap ] = useState(0)
    const [ midCap, setMidCap ] = useState(0)
    const [ foreign, setForeign ] = useState(0)
    const [ smallCap, setSmallCap ] = useState(0)

    const [ investmentFixes, setInvestmentFixes ] = useState({
        Bonds : [0,0],
        LargeCap : [0,0],
        MidCap : [0,0],
        Foreign : [0,0],
        SmallCap : [0,0]
    })

    const [ suggestMsj, setSuggestMsj ] = useState([])

    
    let riskLevelSelected = useSelector( store => store.riskLevel )
    let riskDataSelected = riskLevelData[ riskLevelSelected.level ]

    const headers = ["Current Amount", "Difference", "New Amount", "Recommended Transfers"]
    const tableName="rebalance"

    const rebalance = ( tagPrcent, amount, total )=>{
        const amountByPrcent = (total/100)*tagPrcent
        return [ parseFloatFixed(amountByPrcent), parseFloatFixed( amountByPrcent - amount )]
    }

    useEffect( ( ) => {
        setSuggestMsj( getSugerences() )
    },[ investmentFixes, setSuggestMsj ] )

    let callRebalance = (  ) => {
        let list = [
            ['Bonds', bonds],
            ['LargeCap', largeCap],
            ['MidCap', midCap],
            ['Foreign', foreign],
            ['SmallCap',smallCap]
        ]
        const total = list.reduce( ( prevValue, currentValue )=>{   
            return prevValue + parseFloatFixed(currentValue[1])
         }, 0 )
        
        setInvestmentFixes( list.reduce( (prevValue, currentValue) => {
            return {...prevValue, [currentValue[0]] : rebalance( riskDataSelected[currentValue[0]],  currentValue[1], total )}
        },{} ) )
        
    }
    
    const parseFloatFixed = ( n ) => {
        
        try {
            let parsed = parseFloat( parseFloat(n).toFixed(1) );
            return isNaN(parsed) ? 0 : parsed
        }catch(e){
            console.log(e)
        }
        return 0
    }

    const getSugerences = () => {
        let investmentWithExtra = Object.keys(investmentFixes).filter( investment => {
            return investmentFixes[investment][1] < 0
        } ).reduce( ( prevValue, investmentType )=>{ 
            return [...prevValue,  {type : investmentType, extraAmount : investmentFixes[investmentType][1] * -1 } ] 
        },[] ).sort( (itemA, itemB) =>  { return itemA.extraAmount < itemB.extraAmount ? 1 : -1 })

        let investmentToValance = Object.keys(investmentFixes).filter( investment => {
            return investmentFixes[investment][1] > 0
        } ).reduce( ( prevValue, investmentType )=>{ 
            return [...prevValue,  {type : investmentType, pendingAmount : investmentFixes[investmentType][1] } ] 
        },[] ).sort( (itemA, itemB) =>  { return itemA.pendingAmount < itemB.pendingAmount ? 1 : -1 })

        const msjTemplate = ( from, to, amount ) => { return `Transfer $${amount} from ${from} to ${to}.` }

        return investmentToValance.reduce( (prevValue, toValance)=>{
            let {pendingAmount, type } = toValance
            let _msjs = []
            let indexExtraAmount = 0;
            
            while( pendingAmount > 0 && indexExtraAmount < investmentWithExtra.length ){
                let extra = investmentWithExtra[indexExtraAmount]
                
                let checkSum = parseFloatFixed( extra.extraAmount - pendingAmount );
                if( extra.extraAmount > 0 ){
                    if( checkSum === 0 ){
                        _msjs = _msjs = [..._msjs, msjTemplate( extra.type, type, extra.extraAmount )]
                        extra.extraAmount = 0
                        pendingAmount = 0
                    }else if( checkSum > 0 ){
                        console.log( msjTemplate( extra.type, type, pendingAmount ) )
                        _msjs = [..._msjs, msjTemplate( extra.type, type, pendingAmount )]
                        pendingAmount = 0
                        extra.extraAmount = checkSum;
                    }else{
                        console.log( msjTemplate( extra.type, type, parseFloatFixed(extra.extraAmount) ) )
                        _msjs = [..._msjs, msjTemplate( extra.type, type, parseFloatFixed(extra.extraAmount) )]
                        extra.extraAmount = 0;
                        pendingAmount = checkSum * -1
                    }
                }else{
                    indexExtraAmount+=1
                }
            }

            return [...prevValue,..._msjs]
            
        }, [] )

    }

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
                <tr>
                    <td>
                    <div className="input-group">
                            <span className="input-group-label" >Bonds $</span>
                            <input className="input-group-field" value={bonds} onChange={ ( e ) => {
                                setBonds( e.target.value )
                            } }></input>
                        </div>
                    </td>
                    <td>
                    <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'Bonds' ][1]} disabled></input>
                        </div>
                    </td>
                    <td>
                        <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'Bonds' ][0]} disabled></input>
                        </div>
                    </td>
                    <td rowSpan={5}>
                            <ul>
                                {
                                suggestMsj.map( (msj, index) =>(
                                    <li key={`msj-list-${index}`}> { msj } </li>
                                ) )}
                            </ul>
                    </td>
                </tr>
                <tr>
                    <td>
                    <div className="input-group">
                            <span className="input-group-label" >Large Cap $</span>
                            <input className="input-group-field" value={largeCap} onChange={ ( e ) => {
                                setLargeCap( e.target.value )
                            } }></input>
                        </div>
                    </td>
                    <td>
                    <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'LargeCap' ][1]} disabled></input>
                        </div>
                    </td>
                    <td>
                        <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'LargeCap' ][0]} disabled></input>
                        </div>
                    </td>
                    
                </tr>
                <tr>
                    <td>
                    <div className="input-group">
                            <span className="input-group-label" >Mid Cap $</span>
                            <input className="input-group-field" value={midCap} onChange={ ( e ) => {
                                setMidCap( e.target.value )
                            } }></input>
                        </div>
                    </td>
                    <td>
                    <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'MidCap' ][1]} disabled></input>
                        </div>
                    </td>
                    <td>
                        <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'MidCap' ][0]} disabled></input>
                        </div>
                    </td>
                    
                </tr>
                <tr>
                    <td>
                    <div className="input-group">
                            <span className="input-group-label" >Foreign $</span>
                            <input className="input-group-field" value={foreign} onChange={ ( e ) => {
                                
                                setForeign( e.target.value )
                            } }></input>
                        </div>
                    </td>
                    <td>
                    <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'Foreign' ][1]} disabled></input>
                        </div>
                    </td>
                    <td>
                        <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'Foreign' ][0]} disabled></input>
                        </div>
                    </td>
                    
                </tr>
                <tr>
                    <td>
                    <div className="input-group">
                            <span className="input-group-label" >Small Cap $</span>
                            <input className="input-group-field" value={smallCap} onChange={ ( e ) => {
                                setSmallCap( e.target.value )
                            } }></input>
                        </div>
                    </td>
                    <td>
                    <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'SmallCap' ][1]} disabled></input>
                        </div>
                    </td>
                    <td>
                        <div className="input-group">
                            <input className="input-group-field" value={investmentFixes[ 'SmallCap' ][0]} disabled></input>
                        </div>
                    </td>
                    
                </tr>
            </tbody>
        </table>

        <button onClick={  () => { callRebalance() } }>
                        rebalance
        </button>
    </div>
}

export default RebalanceTable;