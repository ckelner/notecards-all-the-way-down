var Notecard = function(title, children, parentIndex, index, focus=false) {
  this.title = title || "Placeholder (Click me)";
  this.children = children || []; //array
  this.focus = focus || false;
  this.index = index;
  this.parentIndex = parentIndex;
  this.deleted = false;
  this.addChild = function(child) {
    this.children.push(child);
  };
  this.removeChild = function(index) {
    var len = this.children.length;
    var toSplice = -1;
    for(var i=0; i < len; i++) {
      if(this.children[i].index == index) {
        toSplice = i;
      }
    }
    if(toSplice != -1) {
      this.children.splice(toSplice,1);
    }
  };
};
