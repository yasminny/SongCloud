/**
 * Created by NEXUS on 26/03/2017.
 */
import React from 'react';


export default class GreeterComponent extends React.Component{
  constructor(){
    super();

    this.state = {
      counter: 0,
      greet: 'Hello There'
    };
  }
  increment() {
    const current = this.state.counter;

    this.setState({
      counter: current + 1,
      greet: 'Howdy'
    });

    showAlert(){
      return alert('Woohoo!');
    }
  }

render(){
  return (<div>
    <p>Hi my name is {this.props.name} and my age is: {this.props.age}</p>
    {/*<input type="button" value={ 'oooooooohhhhh' } onClick={ this.showAlert }></input>*/}
    <h2>{ this.state.greet }, I'm { this.props.data.name }</h2>
    <h2>Counter: { this.state.counter }</h2>

    <button onClick={ () => this.increment() }>Show Alert</button>
  </div>
  </div>);
}

}
