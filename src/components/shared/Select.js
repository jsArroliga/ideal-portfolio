import React from 'react'


function Selector ( props ){

    const { name='', label='', value='', changeHandler, defaultValue, options=[] } = props

    return <div className='custom-select'>
        <label>{ label }
        <select name={name} className={'rounded'} value={value} onChange={ ( e ) => {
            changeHandler( e.target.value )
        } } >
            { defaultValue ? <option value={ defaultValue.value }> { defaultValue.label } </option> : null }
            {
                options.map( ( option, index) => (
                    <option value={ option.value } key={ `${name}-option-${index}` }> { option.label } </option>
                ) )
            }
        </select>
        </label>
    </div>
}

export default Selector;