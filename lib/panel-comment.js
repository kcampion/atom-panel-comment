'use babel';

/* jshint esversion: 6 */

import { CompositeDisposable } from 'atom';
import PanelCommentView from './panel-comment-view';

export default {

  panelCommentView: null,
  rightPanel: null, // Right panel
  subscriptions: null,
  array_to_put: [],

  activate(state) {
    this.panelCommentView = new PanelCommentView(state.panelCommentViewState);
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.panelCommentView.getElement(),
      visible: false,
    });
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'panel-comment:toggle': () => this.toggle(),
    }));
    const that = this;
    // Suscribe when you change files
    this.subscriptions.add(atom.workspace.onDidChangeActivePaneItem((editor) => {
      that.workflow(that, editor);
    }));
    // Suscribe on move cursor
    this.subscriptions.add(atom.workspace.getActiveTextEditor().onDidChangeCursorPosition(() => {
      that.workflow(that, atom.workspace.getActiveTextEditor());
    }));
  },

  deactivate() {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.panelCommentView.destroy();
  },

  serialize() {
    return {
      panelCommentViewState: this.panelCommentView.serialize(),
    };
  },

/**
 * function workflow
 * @return void
 * Center of the logic
 */
  workflow(that, editor) {
    const { lines, blocks } = that.fetchCommentary(editor);
    // get commentary
    const paragraph = that.getRange();
    //  get Range
    that.panelCommentView.clean();
    // Clean the pannel

    for (let p of Object.keys(paragraph)) {

      var textline = paragraph[p].text
      var linePosition = paragraph[p].linesposition

      for (const tex of lines) {
        if (textline.includes(tex)) {
          that.panelCommentView.add_text(tex, linePosition);
        }
      }
      for (const textblock of blocks) {
        if (textline.includes(textblock)) {
          that.panelCommentView.addBlock(textblock, linePosition);
        }
      }
    }
  },

/**
 * function fetchCommentary
 * @return object
 * {Blocks, lines}
 */
  fetchCommentary(item) {
    const commentaryLinesArrays = Array.from(atom.workspace.getActiveTextEditor().editorElement.getElementsByClassName('syntax--comment syntax--line syntax--double-slash'));

    const commentaryLinesFilter = commentaryLinesArrays.filter((element) => {
      if (element.classList.value.includes('syntax-ponctuation') || element.innerText === '//' || element.innerText === '*/' || element.innerText === ' */' || element.innerText === '/**') {
        return false;
      }
      return element;
    }).map(text => (text.innerText));

    const commentaryBlocksArray = Array.from(atom.workspace.getActiveTextEditor().editorElement.getElementsByClassName('syntax--comment syntax--block '));

    const commentaryBlocksFilter = commentaryBlocksArray.filter((element) => {
      if (element.classList.value.includes('syntax-ponctuation') || element.innerText === '//' || element.innerText === '*/' || element.innerText === ' */' || element.innerText === '/**') {
        return false;
      }
      return element;
    }).map(text => (text.innerText));

    const commentaryFetch = {
      lines: commentaryLinesFilter,
      blocks: commentaryBlocksFilter,
    };

    return commentaryFetch;
  },

  /**
   * function getRange
   * @return Array
   * [1: "first line",
   * 2: "second line";
   * ]
   */
  getRange() {
    const editor = atom.workspace.getActiveTextEditor();
    const firstScreenRow = [editor.getFirstVisibleScreenRow() - 25, 0];
    const lastScreenRow = [editor.getFirstVisibleScreenRow() + 25, 0];
    const paragraph = editor.getTextInBufferRange([firstScreenRow, lastScreenRow]);
    const arrayOfParagraph = paragraph.split('\n');
    const lenghtOfTheParagraph = arrayOfParagraph.length;
    const arr = arrayOfParagraph.map((element, index) => {
      return { lines: index, text: element, linesposition: index / lenghtOfTheParagraph * 100}
    });
    // console.log(arr);
    return arr;
  },

    /**
     * function toggle
     * @return void;
     * show ==> Get the text
     */

  toggle() {
    console.log('PanelComment  toggled!');
    if (this.rightPanel.isVisible()) {
      this.panelCommentView.clean();
      return (this.rightPanel.hide());
    }
    else {
      this.workflow(this, atom.workspace.getActiveTextEditor());
      return (this.rightPanel.show());
    }
  },
};

// var regex = /(^(\/\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm // regex for comment
