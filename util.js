var Util = new function() {
  this.addNotecard = function(parent,title,children) {
    var notecard = new Notecard(title,children);
    if(parent) {
      parent.addChild(notecard);
    }
    NOTECARDS.push(notecard);
  };
  this.setupAddNoteCardButton = function() {
    document.getElementById("add_notecard").onclick = function() {
      Util.addNotecard(null,null,null);
      Util.drawCards();
    };
  };
  this.drawCards = function() {
    // focus card
    var ncContainer = document.getElementById("notecard_container");
    ncContainer.innerHTML = "";
    ncContainer.appendChild(
      this.createNoteCardDiv(NOTECARD_IN_FOCUS)
    );
    // child cards
    var len = NOTECARD_IN_FOCUS.children.length;
    var ncChildContainer = document.getElementById("notecard_children_container");
    ncChildContainer.innerHTML = "";
    for(i=0; i < len; i++) {
      ncChildContainer.appendChild(
        this.createNoteCardDiv(NOTECARD_IN_FOCUS.children[i],NOTECARD_IN_FOCUS.index)
      );
    }
  };
  this.createNoteCardDiv = function(notecard,NOTECARD_IN_FOCUS) {
    var div = document.createElement("div");
    div.className += " notecard";
    div.setAttribute("notecard_index", notecard.index);
    var title = document.createElement("p");
    title.setAttribute("notecard_index", notecard.index);
    var list = document.createElement("ul");
    list.setAttribute("notecard_index", notecard.index);
    title.innerHTML = "<h1 notecard_index='" + notecard.index + "'>" + notecard.title + "</h1>";
    var len = notecard.children.length;
    for(i=0; i < len; i++) {
      list.innerHTML += "<li notecard_index='" + notecard.index + "'>" + notecard.children[i].title + "</li>";
    }
    div.appendChild(title);
    div.appendChild(list);
    return div;
  };
};
