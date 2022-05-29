import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import styled from "styled-components"
import dataJson from '../dataset.json';

import gsap from 'gsap'
import Draggable from 'gsap/dist/Draggable'
import InertiaPlugin from 'gsap/dist/InertiaPlugin'
import ExtendableContent from './ExtendableContent'
gsap.registerPlugin(InertiaPlugin)
gsap.registerPlugin(Draggable)

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
 const setRefs = (elem, i, refs) => {
    refs.current.push(elem);
  };

  const renderSVGs = (elementsData, pathRefs) => {
    return (
    <StyledSvgArea className='svg-area'>  
        {elementsData.map((elem, i) =>  
         elem?.connectTail &&
            elem?.connectTo.map((line, i) => 
                <StyledPath 
                    key={`svg-${elem.id}-i`}
                    id={`svg-${elem.id}-${i}`}
                    className="path" 
                    ref={elem => setRefs(elem, i, pathRefs)}
                />  
            )
        )}
    </StyledSvgArea>
        
    );
  };
  const renderElements = (elementsData, handleRefs) => {
    return elementsData.map((elem, i) => 
        <StyledBoxContainer
            className={`box${i} connect-${elem.connectTail}`}
            key={elem.id}
            id={elem.id}
            ref={elem => setRefs(elem, i, handleRefs)}
        > {elem.id} </StyledBoxContainer>
    );
  };

export default function BoxesView() {
    const { topic1 } = dataJson?.homePage?.rightCol;

    const handleRefs = useRef([]);
    const pathRefs = useRef([]);
    const handleProps = useRef([]);
    
    const handle1ref = useRef(null); 
    const handle2ref = useRef(null);
    let handlePropsA = useRef(null);
    let handlePropsB = useRef(null);
    const path = useRef(null);


    useLayoutEffect(() => {
        handlePropsA.current = gsap.getProperty(handle1ref.current);
        handlePropsB.current = gsap.getProperty(handle2ref.current);
        gsap.set(handle1ref.current,  { x: 400, y: 150 });
        gsap.set(handle2ref.current, { x: 200, y: 350 });

        // updatePath();
        initialPath();
        
      }, [])


    const parseConnectToIndex = (id) => {
        let nodeNum = id.indexOf('-') + 1 
        return parseInt(id.slice(nodeNum))-1
    }

    function initialPath() {

        // 先ren一次box定位和function refs 
        topic1?.forEach((elem, i) => { 
            // gsap.set(handleRefs.current[i],  setPos[i] ); // initial setPos will be random
            setRefs(gsap.getProperty(handleRefs.current[i]), i, handleProps)  // gsap function, to detect pos
        })

        const observer = new IntersectionObserver((entries) => {
            console.log(entries);
          });
          
        let pathIndex = 0;
        // 每個box都有handleProps, 但只有一部份box有connectTo
        topic1?.forEach((elem, i) => { 
            elem.connectTail && elem.connectTo.forEach((line, j) => {
                const boxConnectTo = parseConnectToIndex(line);
                // let x1 = handleProps.current[i]("x") + handleRefs.current[i].offsetWidth;
                // let y1 = handleProps.current[i]("y") //+ handleRefs.current[i].offsetHeight*3; 
                // let x2 = handleProps.current[boxConnectTo]("x"); 
                // let y2 = handleProps.current[boxConnectTo]("y") //+ handleRefs.current[boxConnectTo].offsetHeight*3 ;
                let x1 = handleRefs.current[i].getBoundingClientRect().x;
                let y1 = handleRefs.current[i].getBoundingClientRect().y - 200;
                let x2 = handleRefs.current[boxConnectTo].getBoundingClientRect().x;
                let y2 = handleRefs.current[boxConnectTo].getBoundingClientRect().y - 200;

                let data = `M${x1} ${y1} L ${x2} ${y2}`;
                pathRefs.current[pathIndex++].setAttribute("d", data);
 
                // console.log( "=====", data ,"=====")
                // console.log( handleProps.current[i]("x"), handleProps.current[i]("y"), handleProps.current[boxConnectTo]("x"),  handleProps.current[boxConnectTo]("y") )
                // console.log( handleRefs.current[i].getBoundingClientRect(), 
                //     handleRefs.current[boxConnectTo].getBoundingClientRect())

            })
        })
                    
    }

// 輸入pathRefs index值，同時要找得到是哪個handleRefs在動
    function updatePath(handleIndex, pathIndex) { 
        // if (typeof handlePropsA.current !== 'function' || typeof handlePropsB.current !== 'function') return;

        let x1 = handleProps.current[handleIndex]("x") + handleRefs.current[handleIndex].offsetWidth;
        let y1 = handleProps.current[handleIndex]("y") + handleRefs.current[handleIndex].offsetHeight;
        let x2 = handleProps.current[handleIndex+1]("x") + handleRefs.current[handleIndex+1].offsetWidth; 
        let y2 = handleProps.current[handleIndex+1]("y") + handleRefs.current[handleIndex+1].offsetHeight ;

        let data = `M${x1} ${y1} L ${x2} ${y2}`;
        pathRefs.current[pathIndex].setAttribute("d", data);
      }


    useEffect(() => {
// a map func to render draggables
// initialPath()

        handleRefs.current?.forEach((elem, i) => {
            // console.log( handleProps.current[i]("x"), handleProps.current[i]("y") )
            console.log( gsap.getProperty(handleRefs.current[i], "backgroundColor") )
            console.log( handleRefs.current[i].getBoundingClientRect().y )

            Draggable.create(elem, {
                trigger:  elem,
                cursor: "grab",
                bounds: "#box-container",
                edgeResistance: 0.65,
                inertia: true,
                onDrag: initialPath, // check if tail exist first
                throwProps: true,
                onThrowUpdate: initialPath // check if tail exist first
            })
        })


        // Draggable.create(handle1ref.current, {
        //     trigger:  handle1ref.current,
        //     cursor: "grab",
        //     bounds: "#box-container",
        //     edgeResistance: 0.65,
        //     inertia: true,
        //     onDrag: updatePath, // check if tail exist first
        //     throwProps: true,
        //     onThrowUpdate: updatePath // check if tail exist first
        //   });
        // Draggable.create(handle2ref.current, {
        //     trigger:  handle2ref.current,
        //     cursor: "grab",
        //     bounds: "#box-container",
        //     edgeResistance: 0.65,
        //     inertia: true,
        //     onDrag: updatePath,
        //     throwProps: true,
        //     onThrowUpdate: updatePath
        //   });


    }, [])
    
const detailRef = useRef();
const [fullScreen, setFullScreen] = useState(false);

const toggleFullScreen = () => {
    setFullScreen(!fullScreen)
};

  return (
    <StyledBoxesContainer id="box-container" className='box-container'>
        { renderSVGs(topic1, pathRefs) }
        { renderElements(topic1, handleRefs) }

        {/* <StyledSvgArea className='svg-area'>  
            <StyledPath className="path" ref={path} />  
        </StyledSvgArea>

        <StyledBox className="handle" ref={handle1ref}>
            <ExtendableContent detailRef={detailRef} fullScreen={fullScreen} setFullScreen={setFullScreen} />
        </StyledBox>

        <StyledBox className="handle"  ref={handle2ref}>
            GsapBox2
        </StyledBox>

        <StyledDetail className="detail full-size" ref={detailRef} onClick={toggleFullScreen} fullScreen={fullScreen} data-flip-id="auto-1" >
            <div className="content">
                <div className="title">Placeholder title</div>
                <div className="secondary">Placeholder secondary</div>
                <div className="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure cum, est amet delectus, blanditiis voluptatem laborum pariatur consequatur quae voluptate, nisi. Laborum adipisci iste earum distinctio, fugit, quas ipsa impedit.</div>
            </div>
        </StyledDetail> */}

    </StyledBoxesContainer>
  )
}


const StyledBoxContainer = styled.div`
    position: relative;
    padding: 5px; 
    height: auto;
    width: auto;
    min-height: 50px;
    max-width: 280px;
    inline-size: 370px;
    overflowWrap: break-word;
    z-index: ${({fullScreen}) => ( fullScreen ? '50' : '0')};
    color: #FFF;
    border: 1px solid #FFF;
`;

const StyledDetail = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, 0);
    width: 300px;
    height: 600px;
    background: red;

    // display: ${({ fullScreen }) => fullScreen ? 'block' : 'none'};
`;

const StyledPath = styled.path`
    fill: #fff;
    stroke: #FFF;
`
const StyledBoxesContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;  
`;

const StyledSvgArea = styled.svg`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

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

