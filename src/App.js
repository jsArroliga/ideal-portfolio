
import Header from './components/shared/Header'
import RiskSelector from './components/step1/RiskSelector'
import RiskTableList from './components/step1/RiskTableList'
import RiskChart from './components/step1/RiskChart'
import TableResumeRisk from './components/step2/RiskResumeTable'

import { Provider } from 'react-redux'
import storeConfig from './store'
import RebalanceTable from './components/step2/RebalanceRiskTable'

import Tabs from './components/shared/Tabs'

const store = storeConfig()

function App() {
  return (
    <div >
      <Provider store={store}>
        <Header></Header>
        <div className="grid-container">
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
          
          <TableResumeRisk></TableResumeRisk>
          <RebalanceTable></RebalanceTable>
          
        </div>
      </Provider>
    </div>
  );
}

export default App;