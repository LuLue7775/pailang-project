import React, { useEffect, useState } from 'react';
import Header from './components/Header';

import {
    BrowserRouter,
    Routes,
    Route, 
  } from "react-router-dom";
import About from './pages/About';
import Agenda from './pages/Agenda';
import PageTwo from './pages/PageTwo';
import Home from './pages/Home';
import Video from './pages/Video';

import styled, { keyframes } from "styled-components";
import ModalStart from './components/ModalStart';

import gsap from 'gsap';
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
gsap.registerPlugin(CSSRulePlugin);


export default function App() {
    const [modalShow, setModalShow] = useState(true);
    useEffect(() => {
        setTimeout(() => { 
            setModalShow(false);
        }, 3000 );
    }, []);

    return (
        <StyledApp className='app'>
            <StyledContent modalShow={modalShow}>
                <BrowserRouter>
                    <Header/>
                    <StyledLayout>
                        <Routes>
                            <Route path="/" element={<Home />}/>
                            <Route path="/video" element={<Video />}/>
                            <Route path="/about" element={<About />}/>
                            <Route path="/agenda" element={<Agenda />}/>
                            <Route path="/pagetwo" element={<PageTwo />}/>
                        </Routes>
                    </StyledLayout>
                </BrowserRouter>
            </StyledContent>

            <ModalStart modalShow={modalShow} />       

        </StyledApp>
    );
}


const StyledApp = styled.div`
    position:relative;
    height: 100vh;
    width: 100%;
    background: rgb(0,0,0);
    background: radial-gradient(circle, rgba(0,0,0,0.8241302588996764) 0%, rgba(0,0,0,1) 82%);
`;
const StyledLayout = styled.div`
    position:relative;
    bottom: 0;
    z-index: 0;

`;

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;
/**
 * Make these gsap to animate elements one by one.
 */
const StyledContent = styled.div` 
    animation-delay: 2s;
    animation: ${({modalShow})=> modalShow ? '' : fadeIn } .3s linear ;
    opacity: ${({modalShow})=> modalShow ? 0 : 1};
`;
