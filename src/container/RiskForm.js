
import React from 'react'
import { useSelector } from 'react-redux'

import Tabs from './../components/shared/Tabs'
import Stepper from './../components/stepper/Stepper'

import RiskSelector from '../components/riskForm/RiskSelector'
import RiskTableList from '../components/riskForm/RiskTableList'
import RiskChart from '../components/riskForm/RiskChart'
import TableResumeRisk from '../components/riskForm/RiskResumeTable'
import RebalanceTable from '../components/riskForm/RiskRebalanceTable'


function RiskForm() {

  let riskSelected = useSelector( store => store.riskLevel )

  const steps = {
    1 : {
      nextStep : 2,
      isValid : (  ) => {
        return riskSelected.level > 0
      },
      content : <div>
              <RiskSelector></RiskSelector>
              <Tabs tabsData={
                [{
                  'label' : 'Risk Table',
                  'component' : <RiskTableList></RiskTableList>
                },
                {
                    'label' : 'Risk Chart',
                    'component' : <RiskChart></RiskChart>
                }]} ></Tabs>
      </div>
    },
    2 : {
      prevStep : 1,
      content : <div>
              <TableResumeRisk></TableResumeRisk>
              <RebalanceTable></RebalanceTable>
      </div>
    }
  }

  return <Stepper steps={ steps } startAt={ 1 }></Stepper>;
}

export default RiskForm;