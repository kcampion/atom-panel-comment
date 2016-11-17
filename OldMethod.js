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



/*
function name
return @void
description: Blabla
 */
var editor = atom.workspace.getActiveTextEditor()
editor.onDidChangeCursorPosition(function(event){
	console.log("cursor change")
	// console.log(event);
	var range = editor.getCurrentParagraphBufferRange() // give a range
	if (range !== undefined && range.start.row >= 10) {
		console.log(range);
		const {start, end } = range;
		range.start.row -= 10;
		range.end.row -= 10;
		console.log(range);
		// const range_before_scope = new Range(new Point(0, range.start.row -= 5), new Point(range.end));
		// console.log(range_before_scope);
		var paragraph = editor.getTextInBufferRange(range) // Give the line
		console.log(paragraph)
		// atom.document.getElementsByClassName("commentary")[0].innerHTML
	}
})


// TODO: 1. On cursor Change: Log the scope - 10;
// TODO: 2. Get all the commentary of the file with atom.document
// TODO: 3. If the commentary is in the function, show it
// TODO: 4. show the syntax--comment
// hash {
// double_slah= {
// 	range: range,
// 	content: content
// 	}
// 	block {
// 	range: range,
// 	content: content
// 	}
// }

1. Hide

if (inSCOPE text == hash\* text) {
	print it with scope!
}

ArrayOfCommentary = {
	row: 12,
	inner_HTML: '//Test the function'
	if (inner_HTML matchTheRegex) {
		add View.
	}
}
