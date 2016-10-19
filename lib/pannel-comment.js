'use babel';

import PannelCommentView from './pannel-comment-view';
import { CompositeDisposable } from 'atom'; // Fonction !


export default {

  pannelCommentView: null,
  rightPanel: null, // Right pannel
  subscriptions: null,
  fullText: null, // Full text !
  activate(state) { // function Yes
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
 * fonction sérialize
 * I guess, do what i want to do tommorow!
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

//  Lalala
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
 * close ==> clean
 * show ==> Get the text
 */
  toggle() {
    console.log('PannelComment  toggled!');
    if (this.rightPanel.isVisible()) {
      this.pannelCommentView.clean();
      return (this.rightPanel.hide());
    }
    else {
      var editor = atom.workspace.getActiveTextEditor(); // Get the editor
      var full_text = editor.getText();
      var regex = /(^(\/\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm // regex for comment
      var text_arr = full_text.match(regex);
      if (text_arr != null) {
      for (var i = 0; i < text_arr.length; i++) {
        this.pannelCommentView.add_text(text_arr[i]);
        }
        this.pannelCommentView.filter_text();
      }

      return (this.rightPanel.show() )
    }
  }
};
