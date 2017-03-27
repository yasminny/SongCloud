import ReactDOM from 'react-dom';
import React from 'react';
import GreeterComponent from './GreeterComponent';


const Root = () => {
  return (
    <div>
    <h1>Song Cloud</h1>
      <GreeterComponent
        age= '36'
        name='Yasmin'
      />
  </div>
  );
};

ReactDOM.render(<Root/>, document.querySelector('#root'));



// function render() {
//   const greeterComponent = ;
//
//
// }

// render();
// ReactDOM.render(<Root/>, document.getElementById('root'));
