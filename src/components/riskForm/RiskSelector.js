import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import updateRiskLevel from '../../actions/updateRiskLevel'

import Select from './../shared/Select'

function RiskSelector (){

    const dispatch = useDispatch()
    let riskLevelSelected = useSelector( store => store.riskLevel )
    
    const options = [1,2,3,4,5,6,7,8,9,10].map( (level, index) => {
        return {
            value : level,
            label : level
        }
    } )

    const updateLevelSelected = ( level ) => {
        dispatch(updateRiskLevel( { level } ));
    }

    const defaultValue = {
        value : -1,
        label : "Select risk level"
    }


    return <Select 
            label={"Select risk level"} 
            name={"risk-selector"} 
            value={riskLevelSelected.level} 
            options={options} 
            defaultValue={ defaultValue } 
            changeHandler={ ( data ) => {
                updateLevelSelected( parseInt( data ) )
            } }>
    </Select>
}

export default RiskSelector;