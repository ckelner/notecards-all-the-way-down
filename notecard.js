var Notecard = function(title, children, parentIndex) {
  this.title = title || "Placeholder (Click me)";
  this.children = children || []; //array
  this.focus = false;
  this.index = APP.notecard_index;
  this.parentIndex = parentIndex;
  APP.notecard_index++; // hax
  this.addChild = function(child) {
    this.children.push(child);
  };
  // @ckelner: 2016-07-31 => Refactor: At the very top will be a single notecard
  // the almighty "source card" which will contain all other cards, and therefore
  // we will never need to add a notecard to this array directly, always to the
  // parent.  This will let us import and export the object easier.
  NOTECARDS.push(this);
};
