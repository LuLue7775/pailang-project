import React, { useEffect, useRef } from 'react'
import styled from "styled-components";

import { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

import { gsap } from 'gsap/dist/gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin);

const setPos = [
    { x: 250, y: 0 },
    { x: -250, y: 200 },
    { x: 250, y: 400 },
    { x: -250, y: 600 },
    { x: 100, y: 800 },  // |x|>150, y<200
    { x: -250, y: 1000 },
    { x: 250, y: 1200 },
    { x: -250, y: 1400 },
    { x: 250, y: 1600 },
    { x: -250, y: 1800 },
  ]

const  DraggableBox = ({boxIndex, id, node, desciption, elemPos = { x: 100, y: 100 } }) => {
    const updateXarrow = useXarrow();
    const posRef = useRef();

    // useEffect(() => {
    //     if (posRef.current) {
    //         gsap.to(posRef.current, { x:-100, y:200, opacity:.5, duration:1, delay:2, ease: "power3.inOut" } );
    //     }
    // },[posRef.current]);

    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow} ref={posRef}
            // position={setPos[boxIndex]}
            defaultPosition = {setPos[boxIndex]}
        >
            <StyledBoxContainer className="box-container" id={id} >
                <StyledBox>
                 <p>{id}</p>
                 {node.content.map( (item, i) => (
                     <div key={i}> {item} </div>
                 ))}
                </StyledBox>
                { desciption?.length && 
                    desciption.map( (item, i) => (
                        <StyledBoxDesc key={i}>
                            {item} 
                        </StyledBoxDesc>
                    ))
                }
            </StyledBoxContainer>
        </Draggable>
    );
};
export default DraggableBox;

const StyledBoxContainer = styled.div`
    position: relative;
    padding: 5px; 
    height: auto;
    width: auto;
    max-width: 380px;
    inline-size: 370px;
    overflowWrap: break-word;
`;
const StyledBox = styled.div`
    position: relative;
    border: grey solid 1px; 
    border-radius: 10px; 
    padding:  10px; 
    background-color: #000;
    color: #FFF;
    cursor: grab;
`;

const StyledBoxDesc = styled.div`
    color: #fff;
    font-size:5px;
    
`;
