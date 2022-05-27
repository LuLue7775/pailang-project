import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import styled from "styled-components"

import gsap from 'gsap'
import Flip from 'gsap/dist/Flip'
import Draggable from 'gsap/dist/Draggable'

gsap.registerPlugin(Flip, Draggable);

export default function ExtendableContent({ detailRef }) {

    const thisBox = useRef();



    // useEffect(() => { 
    //     if (!thisBox.current || !detailRef.current) return
    //     if ( fullScreen ) {
    //         const state = Flip.getState(thisBox.current );
    //         detailRef.current.style.display = "block"; 
    //         thisBox.current.style.display = "none";

    //         Flip.from(state, {
    //             targets: detailRef.current, 
    //             duration: 0.6,
    //             // scale: true,
    //             absolute: true,
    //             toggleClass: "flipping",
    //             ease: "power1.inOut"
    //         });
    
    //     } else {
    //         const state = Flip.getState(detailRef.current );
    //         detailRef.current.style.display = "none";
    //         thisBox.current.style.display = "block";

    //         Flip.from(state, {
    //             targets: thisBox.current, 
    //             duration: 0.6,
    //             // scale: true,
    //             absolute: true,
    //             toggleClass: "flipping",
    //             ease: "power1.inOut"
    //         });
    //     }

    // }, [fullScreen])



    
// =============================
    const ref = useRef();
    const q = gsap.utils.selector(ref);
    const [fullScreen, setFullScreen] = useState(false);
    const [layoutState, setLayoutState] = useState();

    const toggleFullScreen = () => {
        setFullScreen(!fullScreen);
        setLayoutState(Flip.getState(q(".thumbnail")));

    };
    useLayoutEffect(() => {
        if (!layoutState) return;

        const flip = Flip.from(layoutState, {
          targets: q(".thumbnail"),
          duration: 0.6,
          scale: true,
          // fade: true,
          absolute: true,
        });
    
        return () => {
          flip.kill();
        };
      }, [layoutState]);

      
  return (

        // <div
        //     className={` handle `}
        //     onClick={toggleFullScreen}
        // >
        //         <div> GsapBox1 </div>
        //         <StyledClickArea             
        //             ref={thisBox}
        //             fullScreen={fullScreen} 
        //             data-flip-id="auto-1"
                    
        //         > click </StyledClickArea>
            
        // </div>

    <StyledCompContainer ref={ref} id="container">
         {fullScreen ? (
          <Component2 onClick={toggleFullScreen} />
        ) : ( 
          <Component1 onClick={toggleFullScreen} />
         )} 
    </StyledCompContainer>

  )
}

const Component1 = (props) => {
    return (
      <img
        alt=""
        className="thumbnail"
        data-flip-id="img"
        src="https://placehold.co/200x200"
        {...props}
      />
    );
  };
  
  const Component2 = (props) => {
    return (
        <StyledComp2  >
            <img
                alt=""
                className="thumbnail"
                data-flip-id="img"
                src="https://placehold.co/600x600"
                {...props}
            />
        </StyledComp2>
    );
  };

const StyledCompContainer = styled.div`
    position: absolute;
    // top: 50%;
    // left: 50%;  
    // transform: translate(-50%, 0);

`
const StyledComp2 = styled.div`
`

const StyledClickArea = styled.div`
    // width: ${({fullScreen}) => fullScreen ? '200px': '50px'};
    // transition: width 2s, height 4s;

    width: 50px;
    height: 50px;
    background: ${({ fullScreen }) => fullScreen ? 'red' : 'blue'};;

    &:hover { cursor: pointer; };

    // visibility: ${({ fullScreen }) => fullScreen ? 'hidden' : ''};
    // display: ${({ fullScreen }) => fullScreen ? 'none' : ''};
    

`