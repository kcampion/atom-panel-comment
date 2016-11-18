'use babel';
/*jshint esversion: 6 */

export default class PanelCommentView {

    constructor(serializedState) {
        // Create root element
        this.element = document.createElement('div');
        this.element.classList.add('panel-comment');
        const message = document.createElement('div');
        message.textContent = "panel comment : ";
        message.classList.add('message');
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
     */

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
        block.classList.add('blockCommentary');
        if (text.includes("* function")) block.classList.add('function_name');
        if (text.includes("* @return")) block.classList.add('return_type');
        block.classList.add('blockCommentaryDescribe');
        block.textContent = text;
        commentary.appendChild(block);
    }

    filter_text() {
        var text_to_parse = this.element.querySelectorAll(".commentary");
        var regex_parsing = /\*(.*)/g
        var text_arr = [];
        for (var i = 0; i < text_to_parse.length; i++) {
            text = text_to_parse[i].innerHTML; // Get the inner Text
            text_arr.push(text.match(regex_parsing));
        }
        return text_arr;
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
