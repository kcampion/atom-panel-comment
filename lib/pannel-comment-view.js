'use babel';

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
    commentary.id = "commentary"
    this.element.appendChild(commentary);
  }

/**
* fonction add_text
* return void add a div in the commentary element
*/

  add_text(text) {
    // console.log(text_arr);
    var commentary = document.getElementById("commentary");
    var code = document.createElement('div');
    code.classList.add('commentary');
    code.textContent = text;
    commentary.appendChild(code);
  }

  node_list_to_array(obj){
    return [].map.call(obj, function(element) {
    return element;
    })
  }

  filter_text(){
    var text_to_parse = this.element.querySelectorAll(".commentary");
    var regex_parsing = /\*(.*)/g
    var regex_function = /\* function (.*)/i
    var regex_return = /\* return (.*)/i
    var text = "";
    // var function_name = "";
    for (var i = 0; i < text_to_parse.length; i++) {
      text = text_to_parse[i].innerHTML // Get the inner Text
      text_arr = text.match(regex_parsing);
      // console.log(text_arr);
      for (var y = 0; y < text_arr.length; y++) {
        // console.log(text_arr[y]);
        // console.log(text_arr[y]);
        if (text_arr != "**" || "*" || "*/") {
          function_name = text_arr[y].match(regex_function);
          function_return = text_arr[y].match(regex_return);
          console.log(function_name);
          console.log(function_return);
          // Take the fonction if it's not moving
        }
      }
    }

  }

/**
* function clean
* return void
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
