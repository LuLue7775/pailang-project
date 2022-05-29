import React, { useEffect, useRef, useLayoutEffect } from 'react'
import styled from "styled-components"
import ExtendableContent from './ExtendableContent';
import dataJson from '../dataset.json';

import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'
gsap.registerPlugin(InertiaPlugin)
gsap.registerPlugin(Draggable)

const setRefs = (elem, i, refs) => {
    refs.current.push(elem);
  };

export default function BoxCon({boxIndex, elem, setPos}) {
    const { topic1 } = dataJson?.homePage?.rightCol;

    const pathRefs = useRef([]);
    const handleRef = useRef(null); 

    function initialPath() {

        elem.connectTail && elem.connectTo.forEach((line, j) => {
            const boxConnectTo = parseInt(line);
            
            let x1 = handleRef.current.getBoundingClientRect().x + handleRef.current.offsetWidth;
            let y1 = handleRef.current.getBoundingClientRect().y -250 ; // title height
            let x2 = handleRef.current[boxConnectTo].getBoundingClientRect().x ;
            let y2 = handleRef.current[boxConnectTo].getBoundingClientRect().y -250; // title height

            let data = `M${x1} ${y1} L ${x2} ${y2}`;
            pathRefs.current[j].setAttribute("d", data);

        })
                            
    }

    // let handleProps = useRef(null);
    useLayoutEffect(() => {
        // handleProps.current = gsap.getProperty(handle1ref.current);
        // handleProps.current = gsap.getProperty(handle2ref.current);
        gsap.set(handleRef.current,  setPos);

        initialPath();
      }, [])
    //   function initialPath(handleIndex, pathIndex) { 
    //     // if (typeof handlePropsA.current !== 'function' || typeof handlePropsB.current !== 'function') return;

    //     let x1 = handlePropsA.current("x") + handle1ref.current.offsetWidth;
    //     let y1 = handlePropsA.current("y") + handle1ref.current.offsetHeight;
    //     let x2 = handlePropsB.current("x") + handle2ref.current.offsetWidth; 
    //     let y2 = handlePropsB.current("y") + handle2ref.current.offsetHeight ;

    //     let data = `M${x1} ${y1} L ${x2} ${y2}`;
    //     path.current.setAttribute("d", data);
    //   }

    useEffect(()=> {
        Draggable.create(elem, {
            trigger:  elem,
            cursor: "grab",
            bounds: "#box-container",
            edgeResistance: 0.65,
            inertia: true,
            onDrag:  initialPath, // check if tail exist first
            throwProps: true,
            onThrowUpdate: initialPath, // check if tail exist first
        })
    }, [])

  return (
    <>
        <StyledSvgArea className='svg-area' >  
         {
         elem?.connectTail &&
            elem?.connectTo.map((line, i) => 
                <StyledPath 
                    key={`svg-${elem.id}-${i}`}
                    id={`${elem.id}-${i}`}
                    className={`${elem.id} path`} 
                    ref={elem => setRefs(elem, i, pathRefs)}
                />  
            )
        }
        </StyledSvgArea>
    
    
        <StyledBoxContainer
            className={`box connect-${elem.connectTail}`}
            key={`box${boxIndex} ${elem.id}` }
            ref={handleRef}
        > {elem.id} 
        <ExtendableContent 
                boxIndex={boxIndex} 
                id={elem.id} 
                node={elem.node} // {"type":"img", "content": ["url"] }
                desciption={elem.desciption}
            />
        </StyledBoxContainer>
    </>
  )
}

const StyledPath = styled.path`
    fill: #fff;
    stroke: #FFF;
`

const StyledSvgArea = styled.svg`
    position: absolute;
    width: 100%;
    height: 100%;
    // height: ${({elementAmount}) => elementAmount*250  }px;  
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y: scroll;


`
const StyledBoxContainer = styled.div`
    position: relative;
    padding: 5px; 
    height: 120px;
    width: 100px;
    max-width: 350px;
    inline-size: 370px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};
    color: #FFF;
    border: 1px solid #FFF;

`;