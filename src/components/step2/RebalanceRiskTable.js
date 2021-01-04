import React, { useCallback, useEffect, useState } from 'react'

import Input from './../shared/Input'

import riskLevelData from '../../data/riskLevelData.json'
import { useSelector } from 'react-redux'

import Button from './../shared/Button'

const rebalance = ( tagPrcent, amount, total )=>{
    const amountByPrcent = (total/100)*tagPrcent
    return [ parseFloatFixed(amountByPrcent), parseFloatFixed( amountByPrcent - amount )]
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

    const getSuggestMsj = useCallback( () => {

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
                        _msjs = [..._msjs, msjTemplate( extra.type, type, pendingAmount )]
                        pendingAmount = 0
                        extra.extraAmount = checkSum;
                    }else{
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

    },[ investmentFixes ])

    useEffect( (  ) => {
        setSuggestMsj( getSuggestMsj() )
    }, [investmentFixes, getSuggestMsj] )

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
                    <Input name={'bonds'} label={'Bonds $'} value={bonds} changeHandler={ ( value ) =>  setBonds( value )} />
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'Bonds' ][1]} disabled={true}
                    />
                    
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'Bonds' ][0]} disabled={true} />
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
                        <Input name={'largeCap'} label={'Large Cap $'} value={largeCap} changeHandler={ ( value ) =>  setLargeCap( value )} />
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'LargeCap' ][1]} disabled={true} />
                    
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'LargeCap' ][0]} disabled={true} />
                    </td>
                    
                </tr>
                <tr>
                    <td>
                        <Input name={'midCap'} label={'Mid Cap $'} value={midCap} changeHandler={ ( value ) =>  setMidCap( value )} />
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'MidCap' ][1]} disabled={true} />
                    
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'MidCap' ][0]} disabled={true} />
                    </td>
                </tr>

                <tr>
                    <td>
                        <Input name={'foreign'} label={'Foreign $'} value={foreign} changeHandler={ ( value ) =>  setForeign( value )} />
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'Foreign' ][1]} disabled={true} />
                    
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'Foreign' ][0]} disabled={true} />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Input name={'smallCap'} label={'Small Cap $'} value={smallCap} changeHandler={ ( value ) =>  setSmallCap( value )} />
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'SmallCap' ][1]} disabled={true} />
                    
                    </td>
                    <td>
                        <Input value={investmentFixes[ 'SmallCap' ][0]} disabled={true} />
                    </td>
                </tr>
            </tbody>
        </table>

        <Button bClass={'success'} onClick={  () => { callRebalance() } }>
                        rebalance
        </Button>
    </div>
}

export default RebalanceTable;