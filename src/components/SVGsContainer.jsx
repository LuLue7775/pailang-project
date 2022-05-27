import React from 'react'
import styled from "styled-components"

const setRefs = (elem, i, refs) => {
    refs.current.push(elem);
  };

export default function SVGsContainer({ elementsData, pathRefs }) {
  return (
    <StyledSvgArea className='svg-area'>  
        {elementsData?.map((elem, i) =>  
         elem?.connectTail &&
            elem?.connectTo.map((line, i) => 
                <StyledPath 
                    key={`svg-${elem.id}-${i}`}
                    id={`${elem.id}-${i}`}
                    className={`${elem.id} path`} 
                    ref={elem => setRefs(elem, i, pathRefs)}
                />  
            )
        )}
    </StyledSvgArea>
    
  )
}

const StyledPath = styled.path`
    fill: #fff;
    stroke: #FFF;
`

const StyledSvgArea = styled.svg`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`