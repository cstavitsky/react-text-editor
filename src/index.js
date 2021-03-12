import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class GifInserter extends React.Component {
  render() {
    return(
      <div>
        <h1>hello</h1>
        <button
          onClick={() => this.props.onClick()}
        >
          Add Gif
        </button>
      </div>
    )
  }
}

class Preview extends React.Component {
  matchedPoundSign(line) {
    return line.match(/#+ /);
  }

  matchedBoldness(line) {
    return line.match(/\**.+\**/);
  }

  formatHeaderLines(text) {
    return text.map(line => {
      if(this.matchedPoundSign(line)) {
        let matchedHeaderText = this.matchedPoundSign(line)[0];
        return this.formatHeader(matchedHeaderText, line);
      }

      return line;
    })
  }

  formatHeader(matchedHeaderText, line) {
    let headerSize = matchedHeaderText.trim().length;
    let substringStartIndex = matchedHeaderText.length;
    let textToFormat = line.substring(substringStartIndex, line.length);
    return '<h' + headerSize + '>' + textToFormat + '</h' + headerSize + '>';
  }

  formatBoldness(str) {
    let currentlyBold = false;
    let asteriskCount = 0;
    for(let i = 0; i < str.length; i++) {
      if(str[i] === '*' && str[i-1] === '*') {
        asteriskCount = 2;
      }
      if(asteriskCount === 2) {
        if(!currentlyBold) {
          str = str.replace(str.substring(i-1,i+1), "<b>");
          currentlyBold = true;
          asteriskCount = 0;
        } else {
          str = str.replace(str.substring(i-1,i+1), "</b>");
          currentlyBold = false;
          asteriskCount = 0;
        }
      }
    }
    return str;
  }

  formatItalics(str) {
    let currentlyItalicized = false;
    let asteriskCount = 0;
    for(let i = 0; i < str.length; i++) {
      if(str[i] === '*') {
        asteriskCount = 1;
      }
      if(asteriskCount === 1) {
        if(!currentlyItalicized) {
          str = str.replace(str.substring(i,i+1), "<i>");
          currentlyItalicized = true;
          asteriskCount = 0;
        } else {
          str = str.replace(str.substring(i,i+1), "</i>");
          currentlyItalicized = false;
          asteriskCount = 0;
        }
      }
    }
    return str;
  }

  formatText() {
    let text = this.props.text;
    text = text.split(/\r?\n/);
    text = this.formatHeaderLines(text);
    text = text.join(" ");
    text = this.formatBoldness(text);
    text = this.formatItalics(text); //done after bolding to avoid asterisk collisions
    return text;
  }

  createText() {
    return {__html: this.formatText()}
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

class Gutter extends React.Component {
  renderLines() {
    return {__html: this.generateLines()}
  }

  render() {
    return(
      <div dangerouslySetInnerHTML={this.renderLines()} />
    );
  }

  generateLines() {
    let str = "";
    for(let i = 1; i <= this.props.numLines; i++) {

      str += (i + "<br/>");
    }
    return str;
  }
}

class TextArea extends React.Component {
  render() {
    return (
      <div className="textarea-whole">
        <div className="textarea-gutter">
          {this.renderGutter()}
        </div>
        <div className="textarea-input">
          <textarea
            className='text-area'
            onChange={(event) => this.props.onChange(event)}
            value={this.props.text}
          >
          </textarea>
        </div>
      </div>
    );
  }

  renderGutter() {
    return <Gutter numLines={this.props.numLines} />
  }

}

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      numLines: 1,
      boldOn: false,
    };
  }

  calculateNumLines(text) {
    let chars = text.split("");
    let numNewLines = 1;
    for(const char of chars) {
      if(char === "\n") {
        numNewLines += 1;
      }
    }
    return numNewLines;
  }

  handleKeyUp(event) {
    let text = this.state.text.slice();
    text = event.target.value;
    const numLines = this.calculateNumLines(text);
    this.setState({
      text: text,
      numLines: numLines
    });
  }

  handleClick() {
    let text = this.state.text.slice();
    let GIPHY_API_KEY = process.env.REACT_APP_GIPHY_API_KEY
    fetch('http://api.giphy.com/v1/gifs/trending?api_key=' + GIPHY_API_KEY)
    .then(res => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * 50) + 1;
        let randomGif = "<p><img src=" + data.data[randomNum].images.downsized.url + "/></p>";
        this.setState({ text: text += randomGif });
      })
  }

  renderGifInserter() {
    return <GifInserter
      onClick={() => this.handleClick()}
    />
  }

  renderTextArea() {
    return <TextArea
      text={this.state.text}
      numLines={this.state.numLines}
      onChange={(event) => this.handleKeyUp(event)}
    />
  }

  renderPreview() {
    return <Preview text={this.state.text} />
  }

  render() {
    return (
      <div className='text-editor'>
        <div>
          {this.renderTextArea()}
        </div>
        <div>
          {this.renderGifInserter()}
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
