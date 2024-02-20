'use client';

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Switch, FormControlLabel, Slider } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
  

function RegeneratePattern(regenerateFunc, settings) {
  regenerateFunc(settings);
  return;
}

export default function Configurator({regenerateFunc}) {
  const [settings, setSettingsObj] = useState({ gridSize: 3, patternSize: 4, showDots: true });
  const [gridSize, setGridSize] = useState(3);
  const [patternSize, setPatternSize] = useState(4);
  const [patternNum, setPatternNum] = useState(0);
  // const [showDots, setShowDots] = useState(true);
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
    
  function UpdateSettings(setting, newValue) {
    const newSettings = {};
    
    for(const key in settings) {
      if(key == setting) {
        newSettings[key] = newValue;
      } else {
        newSettings[key] = settings[key];
      }
    }

    setSettingsObj(newSettings);
  }

  return (
    <>
      <Grid container justifyContent='center' direction='column' alignItems='center' spacing={2}>
        <Grid item xs>
          <FormControlLabel control={<Switch defaultChecked />} label="Show Dots" onClick={() => { settings['showDots'] ? UpdateSettings('showDots', false) : UpdateSettings('showDots', true) }}/>
        </Grid>
        <Grid item xs>
          <Box sx={{ width: 300 }}>
            <Typography id="input-slider">
              Grid Size
            </Typography>
            <Slider
              defaultValue={3}
              shiftStep={3}
              step={1}
              marks={marks}
              min={1}
              max={10}
              onChange={(e, val) => UpdateSettings('gridSize',val)}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Box sx={{ width: 300 }}>
            <Typography id="input-slider">
              Pattern Repeats
            </Typography>
            <Slider
              defaultValue={4}
              shiftStep={3}
              step={1}
              marks={marks}
              min={1}
              max={10}
              onChange={(e, val) => UpdateSettings('patternSize', val)}
            />
          </Box>
        </Grid>
        <Grid item xs>
          <Button variant='contained' size='small' onClick={() => RegeneratePattern(regenerateFunc, settings)}>Generate Pattern</Button>
        </Grid>
      </Grid>
    </>
  );
}
