import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class StyleButton extends React.Component {
  render() {
    return (
      <button className="{this.props.value}">
        {this.props.value}
      </button>
    );
  }
}

// create a TextEditor component
// have it render a TextInput
// have it render several buttons.
class TextEditor extends React.Component {
  renderButton(buttonType) {
    return <StyleButton value={buttonType} />
  }


  render() {
    return (
      <div className="buttonRow">
        {this.renderButton('bold')}
        {this.renderButton('italic')}
        {this.renderButton('highlight')}
      </div>
    )
  }
}

export default App;
ReactDOM.render(
  <TextEditor />,
  document.getElementById('root')
);
