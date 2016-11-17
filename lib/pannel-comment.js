'use babel';

import PannelCommentView from './pannel-comment-view'; import { CompositeDisposable } from 'atom';

export default {

/**
 * function sérialize
 * @return void
*/

  pannelCommentView: null,
  rightPanel: null, // Right pannel
  subscriptions: null,
	array_to_put: new Array(),

  activate(state) {
    this.pannelCommentView = new PannelCommentView(state.pannelCommentViewState);
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.pannelCommentView.getElement(),
      visible: false,
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pannel-comment:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.pannelCommentView.destroy();
  },

/**
 * function sérialize
 * @return void
*/

  serialize() {
    return {
      pannelCommentViewState: this.pannelCommentView.serialize()
    };
  },

 clean(){
   return {
     pannelCommentView: this.pannelCommentView.clean()
   };
 },

  add_text(text){
    return {
      pannelCommentView: this.pannelCommentView.add_text(text)
    };
  },
  filter_text(text){
    return {
      pannelCommentView: this.pannelCommentView.filter_text(text)
    };
  },

/**
 * function toggle
 * @return void
 * show ==> Get the text
*/

  toggle() {
    console.log('PannelComment  toggled!');
    if (this.rightPanel.isVisible()) {
      this.pannelCommentView.clean();
      return (this.rightPanel.hide());
    }
    else {
		var editor = atom.workspace.getActiveTextEditor()
		var that = this;
		editor.onDidChangeCursorPosition(function(event){

			var item = atom.workspace.getActivePaneItem()
			var commentaryLines = item.editorElement.getElementsByClassName("syntax--comment syntax--line syntax--double-slash")
			function notPonctuation(element) {
				if (element.classList.value.includes('syntax-ponctuation') || element.innerText == "//" || element.innerText == "*/" || element.innerText == " */" || element.innerText == "/**" ) {
					return false;
				}
				return element;
			}

			const commentaryLinesArrays = Array.from(commentaryLines);
			const commentaryLinesFilter = commentaryLinesArrays.filter(notPonctuation)
			const text = commentaryLinesFilter.map(text => ({
				text: text.innerText ,
			 })
		 	)
			// Get block documentation:
			const commentaryBlocks = item.editorElement.getElementsByClassName("syntax--comment syntax--block ");
			const commentaryBlocksArray = Array.from(commentaryBlocks);
			const commentaryBlocksFilter = commentaryBlocksArray.filter(notPonctuation)
			const textBlocks = commentaryBlocksFilter.map(textBlocks => ({
				text: textBlocks.innerText,
			 	})
		 	)

		 	var range = editor.getCurrentParagraphBufferRange() // give a range
			var firstScreenRow = [editor.getFirstVisibleScreenRow() - 25, 0];
			var lastScreenRow = [editor.getFirstVisibleScreenRow() + 25, 0];
					var paragraph = editor.getTextInBufferRange([firstScreenRow, lastScreenRow]) // Give the line
				that.pannelCommentView.clean()
				for (var tex of text) {
					if (paragraph.includes(tex.text)) {
						that.pannelCommentView.add_text(tex.text)
					}
				}
				for (var textblock of textBlocks) {
					if (paragraph.includes(textblock.text)) {
						that.pannelCommentView.addBlock(textblock.text)
					}
				}
		 })
    return (this.rightPanel.show() )
    }
  }
};

 // var regex = /(^(\/\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm // regex for comment
