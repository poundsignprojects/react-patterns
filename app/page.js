import PatternApp from './pattern-app';
import "./styles.css";

function Header({ title }) {
  return (<h1>{title ? title : 'Default title'}</h1>)
}

export default function PatternMaker() {

  return (
    <div>
      <Header title="Pattern Maker" />
      <PatternApp />
    </div>
  );
}
