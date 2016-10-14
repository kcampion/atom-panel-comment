# pannel-comment package

Programmer use 70 % of their time to read code. Only 30 % to read it.
This is a plugin to help you reading commentary.
Thanks to @kcampion for his time


### Still to do : Pseudo-code

- Parse the commentary to check Name, type of function etc.. -- To do at the end of the end of add(text) function
  - Add an id in add_text fonction for each variable
  - Get all the commentary. Node Type.
    - Take for id.
    - Parse with a regex
    - Add Title id --> "title" + "foo_name" Whith css
    - Add return id --> With Css in style.
    - Add description id --> With Css in style.

- Add a cursor function, which will change visible state or other div.
  - Add an event
    - atom.workspace.getActiveTextEditor.on(cursor)
    - if cursor is in a function.
      - get the name of the function.
      - find the function by a querry_selector
      - show the specific fonction

/**
* Test
*  !
*/
