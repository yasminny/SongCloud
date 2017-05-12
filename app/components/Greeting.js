//experimental component to try out react.

import React from 'react';

export default class Greeting extends React.Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      greet: 'Hello There',
      isVisible: true,
      people: [
        {
          name: 'John Doe',
          kills: 0
        },
        {
          name: 'Peter Pan',
          kills: 0
        }
      ]
    };
  }

  increment() {
    const current = this.state.counter;

    const people = this.state.people.map((person) => Object.assign({}, person, {kills: person.kills + 1}));

    this.setState({
      counter: current + 1,
      greet: 'Howdy',
      people
    });
  }

  toggleVisible() {
    let newVisible = !this.state.isVisible;
    this.setState({
      isVisible: newVisible
    });
  }


  createPeople() {
    return (
      <ul className="bla">
        {
          this.state.people.map((value) => <li key={ value.name }> { value.name + ' ' + value.kills }</li>)
        }
      </ul>
    );
  }

  render() {
    const counterElm = this.state.isVisible && <h2> Counter { this.state.counter } </h2>;
    return (
      <div>
        <p>Hi my name is {this.props.name} and my age is: {this.props.age}</p>
        <h2>{ this.state.greet }, I'm { this.props.name }</h2>
        { counterElm }


        <button onClick={ () => this.increment() }>Inc Counter</button>
        <button onClick={ () => this.toggleVisible() }>Toggle Visable</button>

        { this.createPeople() }

      </div>
    );
  }
}
