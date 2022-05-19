import React from 'react'
import dataJson from '../../src/dataset.json';

import styled from "styled-components";

/**
 * might as well use html-react-parser
 */
export default function Video() {
  const { leftCol, rightCol } = dataJson?.videoPage;

  return (
    <StyledVideo>
      <StyledLeftCol>
        <StyledVideoContainer> Video </StyledVideoContainer>
        {leftCol.content.map((item, i) => (
          <div>{item}</div>
        ))}
      </StyledLeftCol>
      <StyledRightCol>
        {rightCol.content.map((item, i) => (
            <div>{item}</div>
          ))}
      </StyledRightCol>
    </StyledVideo>
  )
}

const StyledVideo = styled.div`
    display:grid;
    grid-template-columns: 5fr 2fr ;
    position: relative;
    width:100vw;
    height: calc(100vh - 250px);
    
    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
`;

const StyledLeftCol = styled.div`
  height: 100%;
  border-right: 1px #85807f dashed;
  padding: 20px;
  font-size: .5px;
  color: #FFF;

`;
const StyledRightCol = styled.div`
  height: 100%;
  padding: 20px;
  font-size: .5px;
  color: #FFF;

`;

const StyledVideoContainer = styled.div`
  height: 400px;
  width: 95%;
  border-radius: 10px;
  background-color: #FFFFFFF0;
  margin: 20px 0 20px 0;

`;

