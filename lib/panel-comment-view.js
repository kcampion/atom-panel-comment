'use babel';

/* jshint esversion: 6 */

export default class PanelCommentView {

  constructor(serializedState) {
        // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('panel-comment');
    const message = document.createElement('div');
    message.textContent = 'panel comment : ';
    message.classList.add('message');
    this.element.appendChild(message);
    const commentary = document.createElement('div');
    commentary.classList.add('commentaire');
    commentary.id = 'commentary';
    this.element.appendChild(commentary);
  }

    /**
     * function add text
     * @return void
     * Add a div in the commentary element
     */

  add_text(text, position) {
    console.log(position);
    const commentary = document.getElementById('commentary');
    const code = document.createElement('div');
    code.classList.add('commentary');
    code.textContent = text;
    code.style.position = 'absolute';
    code.style.top = `${position}%`;
    commentary.appendChild(code);
  }

  addBlock(text, position) {
    console.log(position);
    const commentary = document.getElementById('commentary');
    const block = document.createElement('div');
    block.classList.add('blockCommentary');
    if (text.includes('* function')) block.classList.add('function_name');
    if (text.includes('* @return')) block.classList.add('return_type');
    block.classList.add('blockCommentaryDescribe');
    block.style.position = 'absolute';
    block.style.top = `${position}%`;
    block.textContent = text;
    commentary.appendChild(block);
  }

    /**
     * function clean
     * @return void
     * get all element with class 'code' and destroy them
     */

  clean() {
    const commentary = document.getElementById('commentary');
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
