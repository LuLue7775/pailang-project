import React, { useEffect, useRef } from 'react'
import styled from "styled-components";

import { useXarrow } from 'react-xarrows';
import Draggable from 'react-draggable';

import { gsap } from 'gsap/dist/gsap'
import { CSSPlugin } from 'gsap/CSSPlugin'
gsap.registerPlugin(CSSPlugin);

const setPos = [
    { x: 250, y: 0 }, 
    { x: -250, y: 100 },
    { x: 250, y: 100 },
    { x: 250, y: 200 },
    { x: -250, y: 250 },  //5
    { x: 250, y: 300 },
    { x: -250, y: 350 },
    { x: -250, y: 500 },
    { x: -250, y: 600 },
    { x: 250, y: 550 }, //10
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
                 {node.content.map( (item, i) => 
                    node.type === 'text' 
                    ? <div key={i}> {item} </div>
                    : <StyledImageContainer> img/video</StyledImageContainer>)}
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
const StyledImageContainer = styled.div`
    background: #FFF;
    width: 200px;
    height: 100px;
    color: #000;
`;
