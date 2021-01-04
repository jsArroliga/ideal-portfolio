
import Header from './components/shared/Header'

import { Provider } from 'react-redux'
import storeConfig from './store'
import RiskForm from './container/RiskForm';

const store = storeConfig()

function App() {

  

  return (
    <div >
      <Provider store={store}>
        <Header />
        <div className="grid-container">
          <RiskForm/>
        </div>
      </Provider>
    </div>
  );
}

export default App;