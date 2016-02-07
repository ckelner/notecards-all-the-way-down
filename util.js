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
    document.getElementById("notecard_container").appendChild(
      this.createNoteCardDiv(NOTECARD_IN_FOCUS)
    );
    // child cards
    var len = NOTECARD_IN_FOCUS.children.length;
    for(i=0; i < len; i++) {
      document.getElementById("notecard_children_container").appendChild(
        this.createNoteCardDiv(NOTECARD_IN_FOCUS.children[i])
      );
    }
  };
  this.createNoteCardDiv = function(notecard) {
    var div = document.createElement("div");
    div.className += " notecard";
    var title = document.createElement("p");
    var list = document.createElement("ul");
    title.innerHTML = "<h1>" + notecard.title + "</h1>";
    var len = notecard.children.length;
    for(i=0; i < len; i++) {
      list.innerHTML += "<li>" + notecard.children[i].title + "</li>";
    }
    div.appendChild(title);
    div.appendChild(list);
    return div;
  };
};
