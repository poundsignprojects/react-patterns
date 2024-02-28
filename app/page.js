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
  return (
    <div>
      <Header title="Pattern Generator" />
        <PatternApp />
    </div>
  );
}
