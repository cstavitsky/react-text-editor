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
      <div
        contenteditable="true"
        className='text-area'
        onKeyUp={(event) => this.props.onChange(event)}
        value={this.props.text}
      >
      </div>
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
      text: 'hello',
      boldOn: false,
    };
  }

  handleKeyUp(event) {
    this.setState({text: event.target.innerText}); //note: this will need to be changed i think. innerText will not be able to grab the <strong> tags.
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
      onChange={(event) => this.handleKeyUp(event)}
    />
  }

  render() {
    return (
      <div className='text-editor'>
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
