import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// todo: how do we allow a button click without losing
// the cursor in the textarea?
class StyleButton extends React.Component {
  render() {
    return (
      <button
        className={this.props.value}
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>
    );
  }
}

class TextArea extends React.Component {
  render(text) {
    return (
      <textarea
        className='text-area'
        onKeyUp={() => this.props.onKeyUp()}
        value={this.props.text}
      >
      </textarea>
    );
  }
}

// create a TextEditor component
// have it render a TextInput
// have it render several buttons.
class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      boldOn: false,
    };
  }

  handleKeyUp() {
    //let text = this.state.text.slice();
    const textPlusUserInput = "something placeholder text";
    this.setState(
      {
        text: textPlusUserInput,
      }
    );

  }

  handleClick(buttonType) {
    let text = this.state.text.slice();
    if(buttonType === 'bold') {
      let boldOn;
      if(!this.state.boldOn) {
        text += '<strong>'
        boldOn = true;
      } else {
        text += '</strong>'
        boldOn = false;
      }
      this.setState({
        text: text,
        boldOn: boldOn
      });
    }
  }

  renderButton(buttonType) {
    return <StyleButton
      value={buttonType}
      onClick={() => this.handleClick(buttonType)}
    />
  }

  renderTextArea() {
    return <TextArea
      text={this.state.text}
      onKeyUp={() => this.handleKeyUp(this.state.text)}
    />
  }

  render() {
    return (
      <div class='text-editor'>
        <div className="buttonRow">
          {this.renderButton('bold')}
          {this.renderButton('italic')}
          {this.renderButton('highlight')}
        </div>
        <div>
          {this.renderTextArea()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <TextEditor />,
  document.getElementById('root')
);
