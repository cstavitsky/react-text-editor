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

class Preview extends React.Component {
  createText() {
    return {__html: this.props.text}
  }

  render() {
    return(
      <div>
        <h1>Preview</h1>
        <hr />
        <div dangerouslySetInnerHTML={this.createText()} />
      </div>
    )
  }
}

class TextArea extends React.Component {
  render(text) {
    return (
      <textarea
        className='text-area'
        onChange={(event) => this.props.onChange(event)}
        value={this.props.text}
      >
      </textarea>
    );
  }
}

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      boldOn: false,
    };
  }

  handleKeyUp(event) {
    this.setState({text: event.target.value});
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

  renderPreview() {
    return <Preview text={this.state.text} />
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
        <div>
          {this.renderPreview()}
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <TextEditor />,
  document.getElementById('root')
);
