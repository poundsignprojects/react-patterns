'use client';

import Configurator from './configurator';

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

function Shape({ shapeNum, shapeColor }) {
  let shapeName;
  switch(shapeNum) {
    case 1:
      shapeName = "shape triangle triangle-1";
      break;
    case 2:
      shapeName = "shape triangle triangle-2";
      break;
    case 3:
      shapeName = "shape triangle triangle-3";
      break;
    case 4:
      shapeName = "shape triangle triangle-4";
      break;
    case 5:
      shapeName = "shape square";
      break;
    default:
      shapeName = "";
  }

  shapeName += " shape-" + shapeColor;

  return(
    <div className={ shapeName }></div>
  );
}

function GridSquare({ shapeNum, showDots, shapeColor }) {
  return (
    <div className='grid-square'>
      <Dots showDots={showDots} />
      <Shape shapeNum={shapeNum} shapeColor={shapeColor} />
    </div>
  );
}

function GridRow({ shapes, colors, showDots }) {
  return (
    <div className='grid-row'>
      {shapes.map((num, idx) => {
        // console.log("idx", idx, colors[idx]);
        return <GridSquare shapeNum={num} showDots={showDots} shapeColor={colors[idx]} />
      })}
    </div>
  );
}

// Returns a an array of numbers of {num} length
function GetRandomShapes(num) {
  const shapeArray = [];
  for (let i = 0; i < num; i++) {
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

// function GetRandomShape() {
//   // const spec = { 1: 0.20, 2: 0.20, 3: 0.20, 4: 0.20, 5: 0.20, 6: 0.0 };
//   const spec = { 1: 0.17, 2: 0.17, 3: 0.17, 4: 0.17, 5: 0.16, 6: 0.16 };
//   var i, sum = 0, r = Math.random();
//   for (i in spec) {
//     sum += spec[i];
//     if (r <= sum) {
//       // console.log(i);
//       return parseInt(i);
//     }
//   }
// }

function GetRandomColors(gridSize, colors) {
  const colorArray = [];
  for (let i = 0; i < gridSize.gridSize; i++) {
    colorArray.push(GetRandomColor(colors));
  }
  return colorArray;
}

function GetRandomColor({colors}) {
  const min = 0;
  const max = colors.length;
  const index = parseInt(min + Math.random() * (max - min));
  return colors[index];
}


// Create small grid
function InitialGrid({grid, colors, showDots}) {
  return (
    <>
      {grid.map((rowShapes, idx) => {
        return <GridRow shapes={rowShapes} colors={colors[idx]} showDots={showDots} />
      })}
    </>
  );
}

function PatternGrid({ gridSize, patternSize, showDots, colors }) {
  // grid will be an array of numbers
  const grid = [];
  for(let i = 0; i < gridSize; i++) {
    grid.push(GetRandomShapes(gridSize));
  }

  const colorNums = []
  for(let i = 0; i < gridSize; i++) {
    colorNums.push(GetRandomColors({gridSize}, {colors}));
  }

  const fullGridRow = []
  const initGrid = <InitialGrid grid={grid} colors={colorNums} showDots={showDots} />;

  // build contents for a single grid row
  for(let i = 0; i < patternSize; i++) {
    let className = 'grid-col';
    if(i % 2 == 0) {
      className = 'grid-col flipped-h';
    }
    fullGridRow.push(
      <>
      <div className={className}>
      {initGrid}
      </div>
      </>
    );
  }
  
  const patternGrid = [];

  // place grid rows based on size of pattern
  for(let i = 0; i < patternSize; i++) {
    let className = 'pattern-row';
    if(i % 2 == 0) {
      className = 'pattern-row flipped-v';
    }
    patternGrid.push(
      <>
      <div className={className}>
      {fullGridRow}
      </div>
      </>
    );
  }
  
  // const padRow = [];

  // for (let i = 0; i < gridSize * patternSize; i++) {
  //   padRow.push(<GridSquare shapeNum={0} showDots={showDots} />);
  // }
  
  return (
    <>
    {/* <div className='grid-row'>
      {padRow}
    </div> */}
    {patternGrid}
    {/* <div className='grid-row'>
      {padRow}
    </div> */}
    </>
  );
}

export default function PatternApp() {
  // set Gridsize later from user params
  const [gridSize, setGridSize] = useState(3);
  const [patternSize, setPatternSize] = useState(4);
  const [patternNum, setPatternNum] = useState(0);
  const [showDots, setShowDots] = useState(true);
  const [colors, setColors] = useState(['yellow', 'cyan', 'red', 'grey']);

  const PatternPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
  }));

  function NewPattern() {
    setPatternNum(patternNum + 1);
  }

  function Regenerate(settings) {
    setGridSize(settings['gridSize']);
    setPatternSize(settings['patternSize']);
    setShowDots(settings['showDots']);
    setColors(settings['colors']);
  }


  return (
    <>
      <Grid container justifyContent='center' direction='row' alignItems='center' spacing={2}>
        <Grid item xs>
          <Grid container justifyContent='center' direction='column' alignItems='center' spacing={2}>
            <Grid item xs>
              <Button variant='contained' size='small' onClick={() => NewPattern()}>
                Regenerate
              </Button>
              {/* &nbsp;&nbsp;
              <Button variant='contained' disabled size='small'>
                Save Pattern
              </Button> */}
            </Grid>
            <Grid item xs>
              <PatternPaper>
                <PatternGrid gridSize={gridSize} patternSize={patternSize} showDots={showDots} colors={colors} />
              </PatternPaper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Configurator regenerateFunc={Regenerate} />
        </Grid>
      </Grid>
      {/* <span>{patternNum}</span> */}
    </>
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
