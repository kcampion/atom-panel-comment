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
    commentary.classList.add('commentary');
    commentary.id = "commentary"
    this.element.appendChild(commentary);
  }

/**
* Fonction add_text
* return void add a div in the commentary element
*/

  add_text(text) {
    var commentary = document.getElementById("commentary");
    var code = document.createElement('div');
    code.classList.add('commentary');
    code.textContent = text;
    commentary.appendChild(code);
  }

  filter_text(text){
    return text_block
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
