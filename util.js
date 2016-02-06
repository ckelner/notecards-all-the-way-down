var Util = new function() {
  this.addNotecard = function(parent,title,children) {
    var notecard = new Notecard(title,children);
    parent.addChild(notecard);
  };
  this.drawCards = function() {
    var div = document.createElement("div");
    div.className += " notecard";
    var title = document.createElement("p");
    var list = document.createElement("ul");
    title.innerHTML = "<h1>Title</h1>";
    list.innerHTML = "<li>test-one</li>" +
      "<li>test-two</li>" +
      "<li>test-three</li>";
    div.appendChild(title);
    div.appendChild(list);
    document.getElementById("notecards").appendChild(div);
  };
};
