import React from 'react'
import { useSelector } from 'react-redux'

import Table from '../shared/Table'

import riskLevelData from '../../data/riskLevelData.json'

function RiskTableList (){

    let riskSelected = useSelector( store => store.riskLevel )

    const getTHeaders = () => [ "Risk", "Bonds %", "Large Cap %", "Mid Cap %", "Foreign %", "Small Cap %"];
    const getTRows = () => {
        return Object.keys( riskLevelData ).map( level => {
            let riskData =  riskLevelData[level]
            return [
                level,
                riskData.Bonds,
                riskData.LargeCap,
                riskData.MidCap,
                riskData.Foreign,
                riskData.SmallCap
            ] 
        } )}

    return <Table name={'risk-table'} rowIsActive={  row => {
        return parseInt(row[0]) === riskSelected.level
    } } headers={ getTHeaders() } rows={ getTRows() }></Table>
}

export default RiskTableList