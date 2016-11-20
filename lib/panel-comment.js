'use babel';
/*jshint esversion: 6 */

import PanelCommentView from './panel-comment-view';
import {CompositeDisposable} from 'atom';

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

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'panel-comment:toggle': () => this.toggle()
        }));

        editor = atom.workspace.getActiveTextEditor()
        this.subscriptions.add(editor.onDidChangeTitle(() => {
          console.log("path change");
          // this.toggle()
        }));
        atom.workspace.onDidChangeActivePaneItem( function a() {
          console.log("change");
        })
    },
    deactivate() {
        this.rightPanel.destroy();
        this.subscriptions.dispose();
        this.panelCommentView.destroy();
    },

    /**
     * function sérialize
     * @return void
     */

    serialize() {
        return {
            panelCommentViewState: this.panelCommentView.serialize()
        };
    },

    clean() {
        return {
            panelCommentView: this.panelCommentView.clean()
        };
    },

    add_text(text) {
        return {
            panelCommentView: this.panelCommentView.add_text(text)
        };
    },
    filter_text(text) {
        return {
            panelCommentView: this.panelCommentView.filter_text(text)
        };
    },

    /**
     * function toggle
     * @return void
     * show ==> Get the text
     */

    toggle() {
        console.log('PanelComment  toggled!');
        if (this.rightPanel.isVisible()) {
            this.panelCommentView.clean();
            return (this.rightPanel.hide());
        } else {
            var editor = atom.workspace.getActiveTextEditor();
            var that = this;
            editor.onDidChangeCursorPosition(function (event) {

                var item = atom.workspace.getActivePaneItem();
                var commentaryLines = item.editorElement.getElementsByClassName("syntax--comment syntax--line syntax--double-slash");

                function notPonctuation(element) {
                    if (element.classList.value.includes('syntax-ponctuation') || element.innerText == "//" || element.innerText == "*/" || element.innerText == " */" || element.innerText == "/**") {
                        return false;
                    }
                    return element;
                }

                const commentaryLinesArrays = Array.from(commentaryLines);
                const commentaryLinesFilter = commentaryLinesArrays.filter(notPonctuation);
                const text = commentaryLinesFilter.map(text => ({
                        text: text.innerText,
                    }));
                    // Get block documentation:
                const commentaryBlocks = item.editorElement.getElementsByClassName("syntax--comment syntax--block ");
                const commentaryBlocksArray = Array.from(commentaryBlocks);
                const commentaryBlocksFilter = commentaryBlocksArray.filter(notPonctuation);
                const textBlocks = commentaryBlocksFilter.map(textBlocks => ({
                    text: textBlocks.innerText,
                }));

                var range = editor.getCurrentParagraphBufferRange(); // give a range
                var firstScreenRow = [editor.getFirstVisibleScreenRow() - 25, 0];
                var lastScreenRow = [editor.getFirstVisibleScreenRow() + 25, 0];
                var paragraph = editor.getTextInBufferRange([firstScreenRow, lastScreenRow]); // Give the line
                that.panelCommentView.clean();
                for (var tex of text) {
                    if (paragraph.includes(tex.text)) {
                        that.panelCommentView.add_text(tex.text);
                    }
                }
                for (var textblock of textBlocks) {
                    if (paragraph.includes(textblock.text)) {
                        that.panelCommentView.addBlock(textblock.text);
                    }
                }
            });
            return (this.rightPanel.show());
        }
    }
};

// var regex = /(^(\/\*+[\s\S]*?\*\/)|(\/\*+.*\*\/)|^\/\/.*?[\r\n])[\r\n]*/gm // regex for comment
