import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styled from "styled-components"
import dataJson from '../dataset.json';
import BoxesContainer from './BoxesContainer';

import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'
import ExtendableContent from './ExtendableContent'
import SVGsContainer from './SVGsContainer';
gsap.registerPlugin(InertiaPlugin)
gsap.registerPlugin(Draggable)


 const setPos = [
    { x: 400, y: 150 }, 
    { x: -250, y: 100 },
    { x: 250, y: 100 }, 
    { x: 250, y: 200 },
    { x: 250, y: 250 },  //5
    { x: 250, y: 300 },
    { x: 250, y: 350 },
    { x: 250, y: 500 },
    { x: 250, y: 600 },
    { x: 250, y: 550 },  //10
    { x: 250, y: 0 }, 
    { x: -250, y: 100 },
    { x: 250, y: 100 },
    { x: 250, y: 200 },
    { x: 100, y: 400 },  
    { x: -250, y: 500 },
    { x: 250, y: 600 },
    { x: -250, y: 700 },
    { x: 250, y: 800 },
    { x: -250, y: 900 }, //20
    
  ]


export default function BoxesView() {
    const { topic1 } = dataJson?.homePage?.rightCol;

    const handleRefs = useRef([]);
    const pathRefs = useRef([]);
    
    useLayoutEffect(() => {

        topic1?.forEach((elem, i) => { 
            gsap.set(handleRefs.current[i],  setPos[i] ); // initial setPos will be random
        })

        initialPath();

      }, [])

    function initialPath() {
        let pathIndex = 0;
        topic1?.forEach((elem, i) => { 
            elem.connectTail && elem.connectTo.forEach((line, j) => {
                const boxConnectTo = parseInt(line);
                
                let x1 = handleRefs.current[i].getBoundingClientRect().x + handleRefs.current[i].offsetWidth;
                let y1 = handleRefs.current[i].getBoundingClientRect().y -250 ; // title height
                let x2 = handleRefs.current[boxConnectTo].getBoundingClientRect().x ;
                let y2 = handleRefs.current[boxConnectTo].getBoundingClientRect().y -250; // title height

                let data = `M${x1} ${y1} L ${x2} ${y2}`;
                pathRefs.current[pathIndex++].setAttribute("d", data);

            })
        })
                    
    }

    
    function updatePath( i, boxId) { 

        // deal with just tail 
        topic1[i].connectTo.forEach((lineObj, j) => {
            const boxConnectTo = parseInt(lineObj);
            const boxTailIndex = pathRefs.current.findIndex((path) => path.getAttribute("id") === `${boxId}-${j}` );

            let x1 = handleRefs.current[i].getBoundingClientRect().x + handleRefs.current[i].offsetWidth;
            let y1 = handleRefs.current[i].getBoundingClientRect().y -250 ; // title height
            let x2 = handleRefs.current[boxConnectTo].getBoundingClientRect().x ;
            let y2 = handleRefs.current[boxConnectTo].getBoundingClientRect().y -250; // title height

            let data = `M${x1} ${y1} L ${x2} ${y2}`;
            pathRefs.current[boxTailIndex].setAttribute("d", data);
        })

        // check all connected svg
        topic1?.forEach((elem, connectedIndex) => { 
            elem.connectTo?.forEach((lineObj, j) => {
                if ( lineObj === boxId ) {
                    const boxTailIndex = pathRefs.current.findIndex((path) => path?.getAttribute("id") === `${connectedIndex}-${j}` );

                    let x1 = handleRefs.current[connectedIndex].getBoundingClientRect().x + handleRefs.current[i].offsetWidth;
                    let y1 = handleRefs.current[connectedIndex].getBoundingClientRect().y -250 ; // title height
                    let x2 = handleRefs.current[i].getBoundingClientRect().x ;
                    let y2 = handleRefs.current[i].getBoundingClientRect().y -250; // title height

                    let data = `M${x1} ${y1} L ${x2} ${y2}`;
                    pathRefs.current[boxTailIndex]?.setAttribute("d", data); 
                }  
            })
        })

      }


    useEffect(() => {
        handleRefs.current?.forEach((elem, i) => {
            Draggable.create(elem, {
                trigger:  elem,
                cursor: "grab",
                bounds: "#box-container",
                edgeResistance: 0.65,
                inertia: true,
                onDrag: () => updatePath(i, topic1[i]?.id), // check if tail exist first
                throwProps: true,
                onThrowUpdate: () => updatePath(i, topic1[i]?.id)// check if tail exist first
            })
        })

    }, [])
    
    const detailRef = useRef();
    const [fullScreen, setFullScreen] = useState(false);

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen)
    };

  return (
    <StyledBoxesContainer id="box-container" className='box-container'>
        {/* { renderSVGs(topic1, pathRefs) } */}
        <SVGsContainer elementsData={topic1} pathRefs={pathRefs}/>
        <BoxesContainer elementsData={topic1} handleRefs={handleRefs} detailRef={detailRef} 
                        fullScreen={fullScreen} 
                        // setFullScreen={setFullScreen}
                        // toggleFullScreen={toggleFullScreen}
                         />

   

    </StyledBoxesContainer>
  )
}


const StyledDetail = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    // transform: translate(-50%, 0);
    width: 300px;
    height: 600px;
    background: red;

    display: ${({ fullScreen }) => fullScreen ? 'block' : 'none'};
`;


const StyledBoxesContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;  
`;



const StyledBox = styled.div`
    position: relative;
    padding: 5px; 
    height: 100px;
    width: 100px;
    max-width: 380px;
    inline-size: 370px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};
    
    background: #fff;
`;

