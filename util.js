var Util = new function() {
  this.addNotecard = function(parent,title,children) {
    var notecard = new Notecard(title,children);
    if(parent) {
      parent.addChild(notecard);
    }
    NOTECARDS.push(notecard);
  };
  this.addSubCard = function(notecard_index,title) {
    var nc = NOTECARDS[notecard_index];
    var child = new Notecard(title, null, nc.index);
    nc.addChild(child);
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
    for(var i=0; i < len; i++) {
      ncChildContainer.appendChild(
        this.createNoteCardDiv(NOTECARD_IN_FOCUS.children[i])
      );
    }
  };
  // TODO: Should this logic within the notecard itself?
  this.createNoteCardDiv = function(notecard) {
    var div = document.createElement("div");
    div.className += " notecard";
    div.setAttribute("notecard_index", notecard.index);
    var title = document.createElement("p");
    title.setAttribute("notecard_index", notecard.index);
    var list = document.createElement("ul");
    list.setAttribute("notecard_index", notecard.index);
    title.innerHTML = "<h1 notecard_index='" + notecard.index + "'>" + notecard.title + "</h1>";
    var len = notecard.children.length;
    for(var i=0; i < len; i++) {
      list.innerHTML += "<li notecard_index='" + notecard.children[i].index + "'>" + notecard.children[i].title + "</li>";
    }
    list.innerHTML += "<li><a href='#'>+(add notecard)</a></li>";
    div.appendChild(title);
    div.appendChild(list);
    return div;
  };
};
