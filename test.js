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
