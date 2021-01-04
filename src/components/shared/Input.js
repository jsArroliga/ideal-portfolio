
import React from 'react'


function Selector ( props ){

    const { name='', 
    label, 
    value='', 
    changeHandler=()=>{}, 
    disabled=false, 
    pattern='', 
    containerClass='', 
    inputClass='',
 } = props
    
    return <div className={`input-group ${containerClass}`}>
                { label ? <span className="input-group-label" >{label}</span> : null }
                <input 
                name={name}
                tabIndex={props.tabIndex}
                className={ `input-group-field ${inputClass}` } 
                value={value} disabled={disabled} 
                type='text'
                onChange={ ( e ) => {
                    let newValue = pattern.test( e.target.value ) ? e.target.value : value;
                    changeHandler( newValue )                    
                } }></input>
</div>
}

export default Selector;

