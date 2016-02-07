var Notecard = function(title, children) {
  this.title = title || "";
  this.children = children || []; //array
  this.focus = false;
  this.addChild = function(child) {
    this.children.push(child);
  };
};
