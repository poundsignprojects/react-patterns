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

  const fullGridRow = []
  const initGrid = <InitialGrid grid={grid} showDots={showDots} />;

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
  }


  return (
    <>
      <Grid container justifyContent='center' direction='row' alignItems='center' spacing={2}>
        <Grid item xs>
        <Configurator regenerateFunc={Regenerate} />
        </Grid>
        <Grid item xs>
          <Grid container justifyContent='center' direction='column' alignItems='center' spacing={2}>
            <Grid item xs>
              <Button variant='contained' size='small' onClick={() => NewPattern()}>
                Regenerate
              </Button>
              &nbsp;&nbsp;
              <Button variant='contained' disabled size='small'>
                Save Pattern
              </Button>
            </Grid>
            <Grid item xs>
              <PatternPaper>
                <PatternGrid gridSize={gridSize} patternSize={patternSize} showDots={showDots} />
              </PatternPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <span>{patternNum}</span>
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
