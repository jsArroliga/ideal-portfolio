import React from "react";

import { useSelector } from 'react-redux'

import Chart from "react-google-charts";

import riskLevelData from '../../data/riskLevelData.json'

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
      
      pieHole: 0.3,
      is3D: false,
      pieSliceText: 'label',
    };

    return riskLevelData[ riskLevelSelected.level ] ? <Chart
            chartType="PieChart"
            width="100%"
            height="auto"
            data={ [ ["Name", "Amount porcent"], ...riskChartData( ) ] }
            options={options}
          /> : <h5 className={'text-center'}> Please , select a risk level </h5>
}


export default ChartRisk;