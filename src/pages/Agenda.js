import React from 'react'
import dataJson from '../../src/dataset.json';
import AgendaElement from '../components/AgendaElement';
import styled from "styled-components";

export default function Agenda() {
  const { leftCol, middleCol, rightCol } = dataJson?.agendaPage;

  return (
    <StyledAgenda>
      <StyledAgendaLeftCol>
        <StyledAgendaTitle>CURRENT</StyledAgendaTitle>
        {leftCol.map((item, i) => (
          <AgendaElement item={item} key={i}/>
        ))}
      </StyledAgendaLeftCol>
      <StyledAgendaMidCol>
        <StyledAgendaTitle>UPCOMING</StyledAgendaTitle>
        {middleCol.map((item, i) => (
          <AgendaElement item={item} key={i}/>
        ))}
      </StyledAgendaMidCol>
      <StyledAgendaRightCol>
        <StyledAgendaTitle>PAST</StyledAgendaTitle>
        {rightCol.map((item, i) => (
          <AgendaElement item={item} key={i}/>
        ))}
      </StyledAgendaRightCol>

    </StyledAgenda>
  )
}


const StyledAgenda = styled.div`
    display:grid;
    grid-template-columns: 5fr 6fr 5fr;
    position: relative;
    width:100vw;
    height: calc(100vh - 50px);
    color: #000;
    background: rgb(207,204,204);
    background: radial-gradient(circle, rgba(207,204,204,1) 29%, rgba(255,255,255,1) 93%);
    overflow-y:scroll;
    ::-webkit-scrollbar { width: 0; }
`;

const StyledAgendaLeftCol = styled.div`
    border-right: 1px #85807f solid;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;
    ::-webkit-scrollbar { width: 0; }
`;

const StyledAgendaTitle = styled.h3`
    margin:20px;
`;

const StyledAgendaMidCol = styled.div`
    border-right: 1px #85807f solid;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;
    ::-webkit-scrollbar { width: 0; }
`;

const StyledAgendaRightCol = styled.div`
    border-right: 1px #85807f solid;
    height: 100%;
    overflow-y:scroll;
    overflow-x:hidden;
    ::-webkit-scrollbar { width: 0; }
`;

