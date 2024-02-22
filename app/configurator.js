'use client';

import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { TextField, Switch, FormControlLabel, Slider } from '@mui/material';
import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import { yellow, cyan, red, grey } from '@mui/material/colors';
  
const YellowSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: yellow[600],
    '&:hover': {
      backgroundColor: alpha(yellow[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: yellow[600],
  },
}));

const CyanSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: cyan[600],
    '&:hover': {
      backgroundColor: alpha(cyan[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: cyan[600],
  },
}));

const RedSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: red[600],
    '&:hover': {
      backgroundColor: alpha(red[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: red[600],
  },
}));

const GreySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: grey[600],
    '&:hover': {
      backgroundColor: alpha(grey[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: grey[600],
  },
}));


function RegeneratePattern(regenerateFunc, settings) {
  regenerateFunc(settings);
  return;
}

export default function Configurator({regenerateFunc}) {
  const [settings, setSettingsObj] = useState({ gridSize: 3, patternSize: 4, showDots: true, colors:['yellow', 'cyan', 'red', 'grey'] });
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
  
  function AddColor(color) {
    const newColorArr = settings['colors'].map((x) => x);
    newColorArr.push(color);

    UpdateSettings('colors', newColorArr);
  }

  function RemoveColor(color) {
    const newColorArr = [];
    settings['colors'].forEach(colorSetting => {if(colorSetting != color) {newColorArr.push(colorSetting)}});

    UpdateSettings('colors', newColorArr);
  }

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
          <Box sx={{ width: 400 }}>
          <FormControlLabel control={<YellowSwitch defaultChecked />} label="Yellow" onClick={() => { settings['colors'].indexOf('yellow') > -1 ? RemoveColor('yellow') : AddColor('yellow') }} />
          <FormControlLabel control={<CyanSwitch defaultChecked />} label="Cyan" onClick={() => { settings['colors'].indexOf('cyan') > -1 ? RemoveColor('cyan') : AddColor('cyan') }} />
          <FormControlLabel control={<RedSwitch defaultChecked />} label="Red" onClick={() => { settings['colors'].indexOf('red') > -1 ? RemoveColor('red') : AddColor('red') }} />
          <FormControlLabel control={<GreySwitch defaultChecked />} label="Grey" onClick={() => { settings['colors'].indexOf('grey') > -1 ? RemoveColor('grey') : AddColor('grey') }} />
          </Box>
        </Grid>
        <Grid item xs>
          <Button variant='contained' size='small' onClick={() => RegeneratePattern(regenerateFunc, settings)}>Update Settings</Button>
        </Grid>
      </Grid>
    </>
  );
}
