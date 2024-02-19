'use client';

import Configurator from './configurator';

import { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Switch, FormControlLabel, Slider } from '@mui/material';
import { Box } from '@mui/system';

function Dots({showDots}) {
  let dotsOn = '';
  if(showDots) {
    dotsOn = 'dots-on';
  }
  
  return (
    <>
      <div className={'dot dot-1 ' + dotsOn}></div>
      <div className={'dot dot-2 ' + dotsOn}></div>
      <div className={'dot dot-3 ' + dotsOn}></div>
      <div className={'dot dot-4 ' + dotsOn}></div>
    </>
  );
}

function Shape({ shapeNum }) {
  let shapeName;
  switch(shapeNum) {
    case 1:
      shapeName = "triangle triangle-1";
      break;
    case 2:
      shapeName = "triangle triangle-2";
      break;
    case 3:
      shapeName = "triangle triangle-3";
      break;
    case 4:
      shapeName = "triangle triangle-4";
      break;
    case 5:
      shapeName = "square";
      break;
    default:
      shapeName = "";
  }
  return(
    <div className={ shapeName }></div>
  );
}

function GridSquare({ shapeNum, showDots }) {
  return (
    <div className='grid-square'>
      <Dots showDots={showDots} />
      <Shape shapeNum={shapeNum} />
    </div>
  );
}

function GridRow({ shapes, showDots }) {
  return (
    <div className='grid-row'>
      {shapes.map((num) => {
        return <GridSquare shapeNum={num} showDots={showDots} />
      })}
    </div>
  );
}

// Returns a an array of numbers of {num} length
function GetRandomShapes(num) {
  const shapeArray = [];
  for(let i = 0; i < num; i++) {
    shapeArray.push(GetRandomShape());
  }

  return shapeArray;
}

// Returns a random number which corresponds to a shape type (1-6)
function GetRandomShape() {
  const min = 1;
  const max = 6;
  return parseInt(min + Math.random() * (max - min));
}

// function GetUniqueKey() {
//   const min = 1;
//   const max = 6;
//   return (min + Math.random() * (max - min));
// }

// Create small grid
function InitialGrid({grid, showDots}) {
  return (
    <>
      {grid.map((rowShapes) => {
        return <GridRow shapes={rowShapes} showDots={showDots} />
      })}
    </>
  );
}

function PatternGrid({ gridSize, patternSize, showDots }) {
  // grid will be an array of numbers
  const grid = [];
  for(let i = 0; i < gridSize; i++) {
    grid.push(GetRandomShapes(gridSize));
  }

  const fullGrid = []
  const initGrid = <InitialGrid grid={grid} showDots={showDots} />;

  for(let i = 0; i < patternSize; i++) {
    let className = 'grid-col';
    if(i % 2 == 0) {
      className = 'grid-col flipped-h';
    }
    fullGrid.push(
      <>
      <div className={className}>
      {initGrid}
      </div>
      </>
    );
  }
  
  const patternGrid = [];

  for(let i = 0; i < patternSize; i++) {
    let className = 'pattern-row';
    if(i % 2 == 0) {
      className = 'pattern-row flipped-v';
    }
    patternGrid.push(
      <>
      <div className={className}>
      {fullGrid}
      </div>
      </>
    );
  }
  
  // to do: make this dynamic, based on pattern size
  return (
    <>
    {patternGrid}
    </>
  );
}


export default function PatternApp() {
  // set Gridsize later from user params
  const [gridSize, setGridSize] = useState(3);
  const [patternSize, setPatternSize] = useState(4);
  const [patternNum, setPatternNum] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const marks = [
    {value: 1, label: '1',},
    {value: 2, label: '2',},
    {value: 3, label: '3',},
    {value: 4, label: '4',},
    {value: 5, label: '5',},
    {value: 6, label: '6',},
    {value: 7, label: '7',},
    {value: 8, label: '8',},
    {value: 9, label: '9',},
    {value: 10, label: '10',},
  ];

  function NewPattern() {
    setPatternNum(patternNum + 1);
  }
   
  return (
    <>
      <Configurator />
      <PatternGrid gridSize={gridSize} patternSize={patternSize} showDots={showDots} />
      <span>{patternNum}</span>
      <NewButton onNewClick={() => NewPattern()} />
      <TextField size='small' value={gridSize} onChange={e => setGridSize(e.target.value)} label='Grid Size' />
      <TextField size='small' value={patternSize} onChange={e => setPatternSize(e.target.value)} label='Pattern Size' />
      <FormControlLabel control={<Switch defaultChecked />} label="Show Dots" onClick={() => {showDots ? setShowDots(false) : setShowDots(true)}}/>
      <Box sx={{ width: 300 }}>
      <Slider
          defaultValue={3}
          shiftStep={3}
          step={1}
          marks={marks}
          min={1}
          max={10}
          onChange={(e, val) => console.log(val)}
        />
      <Slider
          defaultValue={3}
          shiftStep={3}
          step={1}
          marks={marks}
          min={1}
          max={10}
        />
      </Box>
    </>
  );
}

function NewButton({onNewClick}) {
  return (
    <Button variant='contained' onClick={onNewClick}>
      New Pattern
    </Button>
  );
}

// TO DO:
// Add color themes
// Add ability to make changes then apply (instead of applying them instantly)
// Turn dots on and off without redraw
// Save patterns
// Upload patterns

// DONE define a single square
  // DONE Draw a shape in the square
  // Assign a color to the shape

// DONE define a small grid of squares
// row options:
// reuse last row (weighted)
// 

// define a larger grid made up of small grids
  // Clone small grid
  // add ability to mirror

// return whole pattern app
