
import React from 'react'


function Selector ( props ){

    const { name='', label, value='', changeHandler, disabled=false, pattern } = props

    return <div className="input-group">
                { label ? <span className="input-group-label" >{label}</span> : null }
                <input 
                name={name}
                className="input-group-field" 
                value={value} disabled={disabled} 
                onChange={ ( e ) => {
                    changeHandler( e.target.value.replace( pattern,'' ))
                } }></input>
</div>
}

export default Selector;

