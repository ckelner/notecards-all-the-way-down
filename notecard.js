var Notecard = function(title, children) {
  this.title = title;
  this.children = children || []; //array
  this.addChild = function(child) {
    this.children.push(child);
  };
};
