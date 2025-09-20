// import {Component} from 'react';
// import './Counter.css';

// class Counter extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   increment = () => {
//     this.setState({ count: this.state.count + 1 });
//   }

//   render() {
//     return (
//       <div className="counter">
//         <h1>Counter: {this.state.count}</h1>
//         <button onClick={this.increment}>Increment</button>
//       </div>
//     );
//   }
// }

// export default Counter;

import { Component } from 'react';
//import './Counter.css';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment = () => {
    // this.setState({ count: this.state.count + 1 });
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }
  
  inc5 = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }
  incrementByFive = () => {
    this.setState({ count: this.state.count + 5 });
  }


  decrement = () => {
    this.setState({ count: this.state.count - 1 });
  }

  reset = () => {
    this.setState({ count: 0 });
  }

  render() {
    return (
      <div className="counter">
        <h1>Counter: {this.state.count}</h1>
        <div className="button-group">
          <button className="btn increment" onClick={this.increment}>Increment By 1</button>
          <button className="btn inc" onClick={this.inc5}>Increment By 5 in loop</button>
          <button className="btn incrementbyfive" onClick={this.incrementByFive}>Increment By 5</button>
          <button className="btn decrement" onClick={this.decrement}>Decrement</button>
          <button className="btn reset" onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Counter;