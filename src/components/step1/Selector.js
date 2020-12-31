import React,{ useState } from 'react'

function Selector (){

    const riskLevel = [1,2,3,4,5,6,7,8,9,10]

    const [levelSelected, setLevelSelected] = useState(-1);

    console.log( levelSelected )

    return <div>
        <label>Select Risk Level
        <select value={levelSelected} onChange={ ( e ) => {
            setLevelSelected( e.target.value )
        } } >
            <option value={-1}> Select Risk Level </option>
            {
                riskLevel.map( (level, index) => (
                    <option value={level} key={ `risk-level-${index}` }> {level} </option>
                ) )
            }
        </select>
        </label>
    </div>
}

export default Selector;