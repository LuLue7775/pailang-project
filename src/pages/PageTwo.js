import React from 'react'
import styled from "styled-components";
import BoxesView from '../components/BoxesView';

export default function PageTwo() {
  return (
    <StyledPageTwo>
      <BoxesView/>
    </StyledPageTwo>
  )
}


const StyledPageTwo= styled.div`
  position: relative;
  height: calc(100vh - 250px) };
  overflow-y: scroll;
  ::-webkit-scrollbar { width: 0; };

`;
