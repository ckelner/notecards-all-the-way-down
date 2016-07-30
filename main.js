/************** global namespace ***********/
var NOTECARDS = NOTECARDS || [];
var NOTECARD_INDEX = 0;
var NOTECARD_IN_FOCUS = null;
var EDITING = false;
var NEW_SUBCARD_CLASS = 'addNoteCardDeleteMe';
/************** init *************/
function init() {
  var notecard = new Notecard("Title", null, null);
  var child = new Notecard("Item-one", null, notecard.index);
  var childTwo = new Notecard("Item-two", null, notecard.index);
  var childThree = new Notecard("Item-three", null, notecard.index);
  notecard.addChild(child);
  notecard.addChild(childTwo);
  notecard.addChild(childThree);
  notecard.focus = true;
  NOTECARD_IN_FOCUS = notecard;
  Util.drawCards();
}
if(window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
} else {
  window.onload = init;
}
