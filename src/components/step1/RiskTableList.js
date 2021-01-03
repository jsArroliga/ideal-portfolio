import React from 'react'

import Table from '../shared/Table'

import riskLevelData from '../../data/riskLevelData.json'

import './../../style/index.scss'

function RiskTableList (){

    const getTHeaders = () => [ "Risk", "Bonds %", "Large Cap %", "Mid Cap %", "Foreign", "Small Cap %"];
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

    return <Table name={'risk-table'} headers={ getTHeaders() } rows={ getTRows() }></Table>
}

export default RiskTableList;