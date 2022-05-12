import React from 'react';
import Xarrow, {useXarrow, Xwrapper} from 'react-xarrows';
import Draggable from 'react-draggable';

const boxStyle = {border: 'grey solid 2px', borderRadius: '10px', padding: '5px', height:'100px', width:'100px'};

const DraggableBox = ({id}) => {
    const updateXarrow = useXarrow();
    return (
        <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
            <div id={id} style={boxStyle}>
                {id}
            </div>
        </Draggable>
    );
};

export default function App() {
    return (
        <div style={{display: 'flex', justifyContent: 'space-evenly', height:'200vh', width: '100%'}}>
            <div style={{ height:'100vh', width: '100%', background:'#DAFF9E' }} > 
              <Xwrapper>
                  <DraggableBox id={'elem1'}/>
                  <DraggableBox id={'elem2'}/>
                  <Xarrow start={'elem1'} end="elem2"/>
              </Xwrapper>
            </div>
        </div>
    );
}