
import React, { useState } from 'react'

import Button from './../shared/Button'

function RiskSelector ( props ){

    const { startAt, steps } = props;

    const [ currentStep, setCurrentStep ] = useState( startAt );

    const step = steps[ currentStep ];

    const nextBtn = (  ) => {
        return step.nextStep ? 
            <Button bClass="btn-blue w-half"  disabled={ !step.isValid() }onClick={ (  ) => {
                setCurrentStep(step.nextStep  )
            } }>
                <b>Next Step</b>
            </Button> : null
    }

    const prevBtn = (  ) => {
        return step.prevStep ? <Button bClass="btn-blue w-half"  onClick={ (  ) => {
                setCurrentStep(step.prevStep  )
            } }>
                <b>Previous Step</b>
            </Button> : null
    }



    return <div className={props.className}>
        {
            step.content
        }
        {
            <div className={'mt-1 button-group align-right'}>
                {prevBtn()}
        
                {nextBtn()}
            </div>
        }
    </div>
}

export default RiskSelector;