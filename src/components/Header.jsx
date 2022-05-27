import React from 'react'
import { Link, useLocation } from "react-router-dom";
import dataJson from '../../src/dataset.json';
import styled from "styled-components";


export default function Header() {
    const { homePage, videoPage } = dataJson; 

    const location = useLocation();

  return (
    <StyledHeader className='header' route={location.pathname}>
        <StyledNavContainer className='nav-container'>
            <StyledNavLeft>
                <Link to="pagetwo">
                    <StyledNavItem> 誌 PAILANG'S journal for live versioning </StyledNavItem>
                </Link>
                { location.pathname === '/pagetwo' && 
                    <Link to="/">
                        <StyledNavItem> 2F</StyledNavItem>
                    </Link>
                }
            </StyledNavLeft>
            <StyledNavRight>
                <Link to="video">
                    <StyledNavItem> VIDEO </StyledNavItem>
                </Link> 
                <Link to="about">
                    <StyledNavItem> ABOUT </StyledNavItem>
                </Link> 
                <Link to="agenda">
                    <StyledNavItem> AGENDA </StyledNavItem>
                </Link>
            </StyledNavRight>
        </StyledNavContainer>

        
        <StyledTitleContainer className='titles' route={location.pathname} >
            <Link to="/">
                <StyledTitleContainer>
                    <StyledTitle className='main-title'> 
                        { location.pathname !== '/video' 
                            ? `${homePage.titleLines.mainTitle.h1Title}`
                            : `${videoPage.titleLines.mainTitle.h1Title}`
                        }
                    </StyledTitle>
                    <StyledSubTitle>
                        { location.pathname !== '/video' 
                            ? `${homePage.titleLines.mainTitle.subTitle}`
                            : `${videoPage.titleLines.mainTitle.subTitle}`
                        }
                    </StyledSubTitle>
                </StyledTitleContainer>
            </Link>

            <StyledTitleLines>
                { location.pathname !== '/video' 
                    ? homePage.titleLines.lines.map((line, i) => 
                        <div key={i}> {line.map((item, i) => ( <div key={i}>{item}</div>))} </div>
                    )
                    : videoPage.titleLines.lines.map((line, i) => 
                        <div key={i}> {line.map((item, i) => ( <div key={i}>{item}</div>))} </div>
                    )
                }
            </StyledTitleLines>
        </StyledTitleContainer>
        


        
    </StyledHeader>
  )
};



const StyledHeader = styled.div`
    height: ${({ route }) => {
        if (route === '/about') return '50px'
        if (route === '/agenda') return '50px'
        else return '250px'
    } };
    overflow: hidden;
    position:relative;
    z-index: 10;
    padding: ${({ route }) => {
        if (route === '/about') return '15px'
        if (route === '/agenda') return '15px'
        else return ''
    } };

    a { 
        text-decoration: none; 
        color: #F5F4F4EF;
    }

    background-color: transparent;
`;
const StyledTitleContainer = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // color: #FFF;
    display: ${({ route }) => {
            if (route === '/about') return 'none'
            if (route === '/agenda') return 'none'
            else return ''  
    } };
`;

const StyledTitle = styled.h1`
    color: #FFF;
    display:inline;
`;

const StyledSubTitle = styled.h3`
    color: #F5F4F4dF;
    display:inline;
`;
const StyledTitleLines = styled.div`
    padding: 10px;
    color: #F5F4F4dF;
    font-size: .8rem;
    text-align: center;
`;


const StyledNavContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: .6rem;
`;
const StyledNavLeft = styled.div`
    display: flex;
    color: #F5F4F4dF;
`;
const StyledNavRight = styled.div`
    display: flex;
`;
const StyledNavItem = styled.div`
    padding: 0 6px 0 6px;
`;
