
import Header from './components/shared/Header'
import RiskSelector from './components/step1/RiskSelector'
import RiskTableList from './components/step1/RiskTableList'
import RiskChart from './components/step1/RiskChart'
import TableResumeRisk from './components/step2/RiskResumeTable'

import { Provider } from 'react-redux'
import storeConfig from './store'
import RebalanceTable from './components/step2/RebalanceRiskTable'

import Tabs from './components/shared/Tabs'

import Stepper from './components/stepper/Stepper'

const store = storeConfig()

function App() {

  const steps = {
    1 : {
      nextStep : 2,
      validation : ( riskLevel ) => {
        return riskLevel.level > 0
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

  return (
    <div >
      <Provider store={store}>
        <Header></Header>
        <div className="grid-container">
          <Stepper steps={ steps } startAt={ 1 }></Stepper>
        </div>
      </Provider>
    </div>
  );
}

export default App;