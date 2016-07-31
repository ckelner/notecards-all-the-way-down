/************** global namespace ***********/
var APP = APP || {};
APP.notecards = APP.notecards || [];
APP.notecard_index = 0;
APP.notecard_in_focus = null;
var EDITING = false;
var NEW_SUBCARD_CLASS = 'addNoteCardDeleteMe';
var NOTECARDS = NOTECARDS || [];
/************** init *************/
function init() {
  var SOURCE_CARD = new Notecard("Source", null, null);
  var notecard = new Notecard("Title", null, SOURCE_CARD.index);
  var child = new Notecard("Item-one", null, notecard.index);
  var childTwo = new Notecard("Item-two", null, notecard.index);
  var childThree = new Notecard("Item-three", null, notecard.index);
  notecard.addChild(child);
  notecard.addChild(childTwo);
  notecard.addChild(childThree);
  notecard.focus = true;
  APP.notecard_in_focus = notecard;
  SOURCE_CARD.addChild(notecard);
  APP.notecards.push(SOURCE_CARD);
  var goUpStackDiv = document.getElementById("go_up_one_level");
  goUpStackDiv.addEventListener("click", goBackUpStack, false);
  Util.drawCards();
}
function goBackUpStack() {
  // top of stack is undefined/null
  if(APP.notecard_in_focus.parentIndex != 0) {
    APP.notecard_in_focus = NOTECARDS[APP.notecard_in_focus.parentIndex];
    Util.drawCards();
  }
  EDITING = false;
}
if(window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
} else {
  window.onload = init;
}
