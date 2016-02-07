var Notecard = function(title, children, parentIndex) {
  this.title = title || "";
  this.children = children || []; //array
  this.focus = false;
  this.index = NOTECARD_INDEX;
  this.parentIndex = parentIndex;
  NOTECARD_INDEX++; // hax
  this.addChild = function(child) {
    this.children.push(child);
  };
  NOTECARDS.push(this);
};
