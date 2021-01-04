
import React from 'react'

function Button( props ){

    const { bClass,...bProps } = props;

    return <button className={ `button ${bClass}` } {...bProps}>
        {props.children}
    </button>
}

export default Button