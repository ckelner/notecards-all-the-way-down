var Notecard = function(title, children, parentIndex, index, focus=false) {
  this.title = title || "Placeholder (Click me)";
  this.children = children || []; //array
  this.focus = focus || false;
  this.index = index;
  this.parentIndex = parentIndex;
  this.addChild = function(child) {
    this.children.push(child);
  };
  this.removeChild = function(index) {
    this.children.remove(index); // TODO: Fixme, pseudo code
  };
};
