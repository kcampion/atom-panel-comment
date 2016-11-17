'use babel';

import CommentDom from './comment-dom';

export default class PannelCommentView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('pannel-comment');
    const message = document.createElement('div');
    message.textContent = "pannel comment : ";
    message.classList.add('message')
    this.element.appendChild(message);
    const commentary = document.createElement('div');
    commentary.classList.add('commentaire');
    commentary.id = "commentary";
    this.element.appendChild(commentary);
  }

/**
* function add text
* @return void
* Add a div in the commentary element
**/

  add_text(text) {
    // console.log(text_arr);
    var commentary = document.getElementById("commentary");
    var code = document.createElement('div');
    code.classList.add('commentary');
    code.textContent = text;
    commentary.appendChild(code);
  }

	addBlock(text) {
		var commentary = document.getElementById("commentary");
		var block = document.createElement('div');
		block.classList.add('blockCommentary')
		if (text.includes("* function")) block.classList.add('function_name');
		if (text.includes("* @return")) block.classList.add('return_type');
		block.classList.add('blockCommentaryDescribe')
		block.textContent = text;
		commentary.appendChild(block)
	}

  filter_text(){
    var text_to_parse = this.element.querySelectorAll(".commentary");
    var regex_parsing = /\*(.*)/g
    var text_arr = [];
    for (var i = 0; i < text_to_parse.length; i++) {
      text = text_to_parse[i].innerHTML // Get the inner Text
      text_arr.push(text.match(regex_parsing));
      }
      return text_arr;
    }

  parse_text(text_arr){
    var commentary = {
    commentaire: []
    };
    var regex_function = /\* function (.*)/i
    var regex_return = /\* return (.*)/i
    var text = "";
    for (var i = 0; i < text_arr.length; i++) {
      for (v of text_arr[i]) {
        if (v.match(regex_function)){
          function_name = v.match(regex_function);
          commentary.function = function_name[1];
        }
        else if (v.match(regex_return)){
          function_return = v.match(regex_return);
          commentary.return = function_return[1];
        }
        else if (v == "**" || v == "*/" || v == "*"){
          // console.log("trash that");
        }
        else {
          commentary.commentaire.push(v);
        }
      }
      // console.log(commentary);

      commentary.div_de_base = document.getElementById("commentary");
      // add a title
      var comment_class = new CommentDom(commentary)
      comment_class.add_title();
      comment_class.add_return();
      var commentary = {
        commentaire: []
      }
    }
  }

/**
  * function clean
  * @return void
  * get all element with class 'code' and destroy them
*/

  clean() {
    var commentary = document.getElementById("commentary");
    while (commentary.firstChild) {
				commentary.removeChild(commentary.firstChild);
    }
  }

// Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }
}
