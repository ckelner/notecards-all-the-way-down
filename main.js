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
  var isData = checkAndLoadWebStorage();
  if(isData == false) {
    // TODO: @ckelner => super not DRY needs improvement -- had to change behavior
    // to support loading from localStorage
    var SOURCE_CARD = new Notecard("Source", null, null, APP.notecard_index);
    APP.notecard_index++;
    var notecard = new Notecard("Title", null, SOURCE_CARD.index, APP.notecard_index);
    APP.notecard_index++;
    var child = new Notecard("Item-one", null, notecard.index, APP.notecard_index);
    APP.notecard_index++;
    var childTwo = new Notecard("Item-two", null, notecard.index, APP.notecard_index);
    APP.notecard_index++;
    var childThree = new Notecard("Item-three", null, notecard.index, APP.notecard_index);
    APP.notecard_index++;
    notecard.addChild(child);
    notecard.addChild(childTwo);
    notecard.addChild(childThree);
    notecard.focus = true;
    APP.notecard_in_focus = notecard;
    SOURCE_CARD.addChild(notecard);
    APP.notecards.push(SOURCE_CARD);
    NOTECARDS[SOURCE_CARD.index] = SOURCE_CARD;
    NOTECARDS[notecard.index] = notecard;
    NOTECARDS[child.index] = child;
    NOTECARDS[childTwo.index] = childTwo;
    NOTECARDS[childThree.index] = childThree;
  }
  var goUpStackDiv = document.getElementById("go_up_one_level");
  goUpStackDiv.addEventListener("click", goBackUpStack, false);
  Util.drawCards();
}
function goBackUpStack() {
  // SOURCE CARD is 0
  if(APP.notecard_in_focus.parentIndex != 0) {
    NOTECARDS[APP.notecard_in_focus.index].focus = false;
    APP.notecard_in_focus = NOTECARDS[APP.notecard_in_focus.parentIndex];
    Util.drawCards();
    NOTECARDS[APP.notecard_in_focus.index].focus = true;
  }
  EDITING = false;
  saveData();
}
function saveData() {
  if(typeof(Storage) !== "undefined") {
    localStorage.setItem("notecard_app_data", JSON.stringify(APP));
    localStorage.setItem("notecard_flat_data", JSON.stringify(NOTECARDS));
  }
}
function loadData() {
  var app_data = localStorage.getItem("notecard_app_data");
  var retVal = false;
  if(app_data !== null) {
    APP = JSON.parse(app_data);
    retVal = true;
  }
  var flat_data = localStorage.getItem("notecard_flat_data");
  if(flat_data !== null) {
    NOTECARDS = JSON.parse(flat_data);
    APP.notecards = convertObjsToNotecards(APP.notecards);
    retVal = true;
  }
  return retVal;
}
function checkAndLoadWebStorage() {
  if(typeof(Storage) == "undefined") {
    alert("Sorry, your browser does not support Web Storage, so data cannot be saved");
  } else {
    return loadData();
  }
}
function convertObjsToNotecards(objs) {
  var children = [];
  if(objs.children && objs.children.length > 0) {
    children = processChildArray(objs.children);
  }
  if(objs instanceof Array) {
    return processChildArray(objs);
  }
  var notecard = new Notecard(objs.title, children, objs.parentIndex, objs.index, objs.focus)
  NOTECARDS[notecard.index] = notecard;
  // hacks
  if(objs.focus === true) {
    APP.notecard_in_focus = notecard;
  }
  return notecard;
}
function processChildArray(children) {
  var siblings = [];
  children.forEach(function(child) {
    siblings.push(convertObjsToNotecards(child));
  });
  return siblings;
}
if(window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
} else {
  window.onload = init;
}
