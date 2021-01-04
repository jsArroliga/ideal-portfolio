import React, { useState } from 'react'


function Tabs ( props ){
    const { tabId , tabsData} =  props
    const [ tabActive, setTabActive,  ] = useState(0);

    const getTabs = (  ) => {
        
        return tabsData.map( (tab, index) => {
            let isActive = index === tabActive;
            return <li key={ `${tabId}-label-${index}` } className={ isActive ? 'is-active'  : ''}>
                        <button  onClick={ (  ) => { setTabActive(index) } } className={isActive? 'is-active' : ''}> 
                            { tab.label }
                        </button>
                    </li>
        } )
    }

    const getTabsContent = ( ) => {
        return tabsData.map( (tab, index) => {
            let isActive = index === tabActive;
            return <div className={isActive ? 'tabs-panel is-active' : 'tabs-panel'} id={index} key={ `${tabId}-component-${index}` }>
            { tab.component }
        </div>
        } )
    }

    return <div className='custom-tab'>
        
        <ul className="tabs" data-tabs id={tabId}>
            { getTabs() }
        </ul>
        <div className="tabs-content" data-tabs-content={tabId}>
            { getTabsContent() }
        </div>
  </div>
}

export default Tabs;