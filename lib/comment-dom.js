'use babel';

export default class CommentDom {
  constructor(commentary) {
    console.log(commentary);
    console.log(document);
  }
  add_title(){
    var code = document.createElement('div');
    // code.classList.add('hidden'); // After
    code.id = "title";
    code.textContent = " La function s'appelle : " + commentary.function;
    console.log(code);
    // commentary.div_de_base.appendChild(code);
  }
  add_return(){
    var return_paragraphe = document.createElement('div');
    return_paragraphe.id = "return";
    return_paragraphe.textContent = "--> " + commentary.return;
    console.log(return_paragraphe);
    // commentary.div_de_base.appendChild(return_paragraphe)
  }
}
