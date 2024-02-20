'use client';
import PatternApp from './pattern-app';
import "./styles.css";
// import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Header({ title }) {
  return (<h1>{title ? title : 'Default title'}</h1>)
}

export default function PatternMaker() {
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));

  return (
    <div>
      <Header title="Pattern Maker" />
      {/* <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div className='test'>xs=8</div>
        </Grid>
        <Grid item xs={4}>
          <div className='test'>xs=4</div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className='test'>xs=12</div>
        </Grid>
        <Grid item xs={8}>
          <div className='test'>xs=8</div>
        </Grid>
      </Grid>     
      </Box>  */}
          <PatternApp />
    </div>
  );
}
