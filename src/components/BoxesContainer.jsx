import React from 'react'
import styled from "styled-components"
import ExtendableContent from './ExtendableContent';

const setRefs = (elem, i, refs) => {
    refs.current.push(elem);
  };

export default function BoxesContainer({elementsData, handleRefs, detailRef}) {
  return (
    <>
    {
        elementsData?.map((elem, i) => 
          <StyledBoxContainer
              className={`box${i} connect-${elem.connectTail}`}
              key={`box${elem.id}` }
              ref={elem => setRefs(elem, i, handleRefs)}
          > {elem.id}{elem.node.content.map(( e, i ) => <div key={i}> {e}</div>)} 
            <ExtendableContent detailRef={detailRef} />
          </StyledBoxContainer>
        )
    }
    </>
  )
}


const StyledBoxContainer = styled.div`
    position: relative;
    padding: 5px; 
    height: auto;
    width: auto;
    min-height: 50px;
    max-width: 320px;
    inline-size: 370px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};
    color: #FFF;
    border: 1px solid #FFF;
`;