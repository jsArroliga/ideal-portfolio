
import Header from './components/shared/Header'
import RiskSelector from './components/step1/RiskSelector'
import RiskTableList from './components/step1/RiskTableList'
import RiskChart from './components/step1/RiskChart'
import TableResumeRisk from './components/step2/RiskResumeTable'

import { Provider } from 'react-redux'
import storeConfig from './store'
import RebalanceTable from './components/step2/RebalanceRiskTable'

const store = storeConfig()

function App() {
  return (
    <div >
      <Provider store={store}>
        <Header></Header>
        <RiskSelector></RiskSelector>
        <RiskTableList></RiskTableList>
        <RiskChart></RiskChart>
        <TableResumeRisk></TableResumeRisk>
        <RebalanceTable></RebalanceTable>
      </Provider>
    </div>
  );
}

export default App;