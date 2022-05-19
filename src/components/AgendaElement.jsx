import React from 'react'
import styled from "styled-components";

export default function AgendaElement(props) {
  const { image, content } = props.item;

  return (
      <StyledMidColContainer>
          <StyledImgContainer>
            <img alt="" src={image}/>
          </StyledImgContainer>
          { content.map((item, i) => (
              <StyledElement key={i} > {item} </StyledElement>
            ))
          }
      </StyledMidColContainer>
    )
  }
  
  const StyledMidColContainer = styled.div`
    position: relative;  
    padding: 20px;
  `;
  const StyledImgContainer = styled.div`
      width: 90%;
      height: 100px;
      background-color: #000;
      margin: 10px 0 10px 0;
  `;
  const StyledElement = styled.div`
      font-size:.5px;
  `;