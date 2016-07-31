/** @ckelner: Here be dragons: THE GOD CLASS! **/
var Util = new function() {
  this.addNotecard = function(parent,title,children) {
    var index = null;
    if(parent != undefined || parent != null) {
      index = parent.index;
    }
    var notecard = new Notecard(title,children,index);
    if(parent) {
      parent.addChild(notecard);
    }
  };
  this.addSubCard = function(notecard_index,title) {
    var nc = NOTECARDS[notecard_index];
    var child = new Notecard(title, null, nc.index);
    nc.addChild(child);
  };
  this.clickAddNoteCardDiv = function() {
    Util.addNotecard(NOTECARDS[APP.notecard_in_focus.parentIndex],null,null);
    Util.drawCards();
  };
  this.drawCards = function() {
    // focus card
    var ncContainer = document.getElementById("notecard_container");
    ncContainer.innerHTML = "";
    ncContainer.appendChild(
      this.createNoteCardDiv(APP.notecard_in_focus)
    );
    // sibling cards
    var len_cards = NOTECARDS[APP.notecard_in_focus.parentIndex].children.length;
    for(var i=0; i < len_cards; i++) {
      if(NOTECARDS[APP.notecard_in_focus.parentIndex].children[i] != APP.notecard_in_focus) {
        ncContainer.appendChild(
          this.createNoteCardDiv(NOTECARDS[APP.notecard_in_focus.parentIndex].children[i])
        );
      }
    }
    // focus level new card div
    ncContainer.appendChild(
      this.createNewNoteCardDiv(APP.notecard_in_focus.index, APP.notecard_in_focus.parentIndex)
    );
    // child cards
    var len = APP.notecard_in_focus.children.length;
    var ncChildContainer = document.getElementById("notecard_children_container");
    ncChildContainer.innerHTML = "";
    for(var i=0; i < len; i++) {
      ncChildContainer.appendChild(
        this.createNoteCardDiv(APP.notecard_in_focus.children[i])
      );
    }
  };
  // TODO: Make this more DRY w/ createNoteCardDiv()? /shrug
  this.createNewNoteCardDiv = function(index,pIndex) {
    var div = document.createElement("div");
    div.className += " new_card";
    div.id = "new_card"
    div.setAttribute("notecard_index", index);
    var title = document.createElement("p");
    title.innerHTML = "<h3>Add new notecard at this level</h3><h1>+</h1>";
    div.appendChild(title);
    div.addEventListener("click", Util.clickAddNoteCardDiv, false);
    return div;
  };
  this.createNoteCardDiv = function(notecard) {
    var div = document.createElement("div");
    div.className += " notecard";
    if(notecard.index == APP.notecard_in_focus.index) {
      div.className += " focus";
    } else {
      if(notecard.parentIndex == APP.notecard_in_focus.index) {
        div.className += " focus_child";
      }
    }
    div.setAttribute("notecard_index", notecard.index);
    var focus = document.createElement("div");
    focus.setAttribute("notecard_index", notecard.index);
    focus.innerHTML += "Focus";
    focus.className += " focus_button";
    focus.addEventListener("click", Util.focusOnNoteCardOnClick, false);
    div.appendChild(focus);
    var title = document.createElement("p");
    title.setAttribute("notecard_index", notecard.index);
    var list = document.createElement("ul");
    list.setAttribute("notecard_index", notecard.index);
    title.innerHTML = "<h1 notecard_index='" + notecard.index + "'>" + notecard.title + "</h1>";
    var len = notecard.children.length;
    for(var i=0; i < len; i++) {
      list.innerHTML += "<li notecard_index='" + notecard.children[i].index + "'>" + notecard.children[i].title + "</li>";
    }
    list.innerHTML += "<li notecard_index='" + notecard.index + "'><a href='#' class='" + NEW_SUBCARD_CLASS + "'>+(add notecard)</a></li>";
    title.addEventListener("click", Util.notecardTitleListOnClick, false);
    div.appendChild(title);
    list.addEventListener("click", Util.notecardTitleListOnClick, false);
    div.appendChild(list);
    return div;
  };
  this.focusOnNoteCardOnClick = function(e) {
    var obj = null;
    if(!e) {
      obj = window.event.srcElement;
    } else {
      obj = e.target;
    }
    var noteCardIndex = obj.getAttribute("notecard_index");
    APP.notecard_in_focus = NOTECARDS[noteCardIndex];
    Util.drawCards();
    EDITING = false;
  };
  this.notecardTitleListOnClick = function(e) {
    if(EDITING || e.path[0].id == "edit_button") {
      return;
    }
    var obj = null;
    if(!e) {
      obj = window.event.srcElement;
    } else {
      obj = e.target;
    }
    var noteCardIndex = obj.getAttribute("notecard_index");
    var parentNode = obj.parentNode;
    var parentIndex = parentNode.getAttribute("notecard_index");
    var button = document.createElement("button");
    var buttonText = document.createTextNode("Save");
    button.appendChild(buttonText);
    button.setAttribute("id", "edit_button");
    button.addEventListener('click', function() {
      Util.saveEdit(noteCardIndex,parentIndex);
    });
    var innerHTML = obj.innerHTML;
    var textArea = document.createElement('TEXTAREA');
    textArea.setAttribute("id", "edit_textarea");
    parentNode.insertBefore(textArea, obj);
    parentNode.insertBefore(button, obj);
    parentNode.removeChild(obj);
    if( obj.innerHTML.indexOf(NEW_SUBCARD_CLASS) == -1 && obj.className.indexOf(NEW_SUBCARD_CLASS) == -1 ) {
      textArea.value = innerHTML;
    }
    textArea.focus();
    EDITING = true;
  };
  this.saveEdit = function(noteCardIndex,parentIndex) {
    var textArea = document.getElementById('edit_textarea');
    var parentNode = textArea.parentNode;
    var newValue = textArea.value;
    if(noteCardIndex == null && parentIndex != null) {
      Util.addSubCard(parentIndex,newValue);
    } else {
      NOTECARDS[noteCardIndex].title = newValue;
    }
    parentNode.removeChild(textArea);
    parentNode.removeChild(document.getElementById('edit_button'));
    Util.drawCards();
    EDITING = false;
  }
};
