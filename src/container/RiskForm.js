
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

  let tabs = [{
    'label' : 'Risk Table',
    'component' : <RiskTableList></RiskTableList>
  },
  {
    'label' : 'Risk Chart',
    'component' : <RiskChart></RiskChart>
  }]

  const steps = {
    1 : {
      nextStep : 2,
      isValid : (  ) => {
        return riskSelected.level > 0
      },
      content : <div>
              <RiskSelector></RiskSelector>
              <div className={'show-for-medium'}>
                <Tabs tabsData={ tabs } ></Tabs>
              </div>
              <div className={'show-for-small-only'}>
                <RiskChart></RiskChart>
              </div>
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

  return <Stepper steps={ steps } startAt={ 1 } className={'mt-1 blue-border-rounded'}></Stepper>;
}

export default RiskForm;