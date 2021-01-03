import React from "react";

import { useSelector } from 'react-redux'

import Chart from "react-google-charts";

import riskLevelData from './../../data/riskLevelData.json'

function ChartRisk( ){

    let riskLevelSelected = useSelector( store => store.riskLevel )

    const tagToLabel = ( tag  ) => {
        return tag.replace(/([a-z])([A-Z])/g, '$1 $2')
    }

    const riskChartData = (  )=>{
        const riskData = riskLevelData[ riskLevelSelected.level ]
        return Object.keys( riskData ).map( ( RiskProperty ) => {
            return [ tagToLabel( RiskProperty ), riskData[RiskProperty] ]
        } )
    }

    const options = {
      title: "Investment Portfolio",
      pieHole: 0.4,
      is3D: false,
      pieSliceText: 'label',
    };

    const chart = () => ( <div className="App">
          <Chart
            chartType="PieChart"
            width="100%"
            height="450px"
            data={ [ ["Name", "Amount porcent"], ...riskChartData( ) ] }
            options={options}
          />
        </div>)

    return riskLevelData[ riskLevelSelected.level ] ? chart() : null
}


export default ChartRisk;