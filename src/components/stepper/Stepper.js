
import React, { useState } from 'react'

import Button from './../shared/Button'

function RiskSelector ( props ){

    const { startAt, steps } = props;

    const [ currentStep, setCurrentStep ] = useState( startAt );

    const step = steps[ currentStep ];

    const nextBtn = (  ) => {
        return step.nextStep  && step.isValid() ? <div>
            
            <Button bClass="primary" onClick={ (  ) => {
                setCurrentStep(step.nextStep  )
            } }>
                Next Step
            </Button>
        </div> : null
    }

    const prevBtn = (  ) => {
        return step.prevStep ? <div>
            
            <Button bClass="primary" onClick={ (  ) => {
                setCurrentStep(step.prevStep  )
            } }>
                Prev Step
            </Button>
        </div> : null
    }



    return <div>
        {
            step.content
        }
        {
            prevBtn()
        }
        {
            nextBtn()
        }
    </div>
}

export default RiskSelector;