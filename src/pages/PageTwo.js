import React, { useState, useEffect, useRef, useLayoutEffect, useCallback }  from 'react'
import styled from "styled-components";
import BoxesView from '../components/BoxesView';

export default function PageTwo() {
  const canvasRef = useRef(null);


  return (
    <StyledPageTwo 
      ref={canvasRef} 
      className="page-two" 
      // onScroll={() => setY(canvasRef.current.scrollTop) } 
    >
      <BoxesView canvasRef={canvasRef}
/>
    </StyledPageTwo>
  )
}


const StyledPageTwo= styled.div`
  position: relative;
  height: calc(100vh - 250px) };
  // height: auto;
  overflow-y: scroll;
  ::-webkit-scrollbar { width: 0; };

`;
