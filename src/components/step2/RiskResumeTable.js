import React from 'react'

import { useSelector } from 'react-redux'

import Table from '../shared/Table'

import riskLevelData from '../../data/riskLevelData.json'

function RiskResumeTable (){

    let riskLevelSelected = useSelector( store => store.riskLevel )
    let riskData =  riskLevelData[riskLevelSelected.level]

    const getTHeaders = ()=>[ "Bonds %", "Large Cap %", "Mid Cap %", "Foreign", "Small Cap %"];
    const getTRows = () => {
        return riskData ? [[
            riskData.Bonds,
            riskData.LargeCap,
            riskData.MidCap,
            riskData.Foreign,
            riskData.SmallCap
        ]] : []
    }

    return riskData ? <Table name={'resume-risk-table'} headers={ getTHeaders() } rows={ getTRows() }></Table> : null
}

export default RiskResumeTable;