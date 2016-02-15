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
// TODO: Move into Util class
function handleOnClick(e) {
  if(EDITING) {
    return;
  }
  if(!document.getElementById || !document.createElement) {
    return;
  }
  if(!e) {
    var obj = window.event.srcElement;
  } else {
    var obj = e.target;
  }
  while (obj.nodeType != 1) {
    obj = obj.parentNode;
  }
  if(obj.tagName == "TEXTAREA") {
    return;
  }
  while(obj != undefined && obj != null && obj.nodeName != "HTML" &&
    obj.nodeName != "LI" && obj.nodeName != "H1") {
      obj = obj.parentNode;
  }
  if(obj == undefined || obj == null || obj.nodeName == "HTML") {
    return;
  }
  var noteCardIndex = obj.getAttribute("notecard_index");
  var parentNode = obj.parentNode;
  var parentIndex = parentNode.getAttribute("notecard_index");
  var button = document.createElement("button");
  var buttonText = document.createTextNode("Save");
  button.appendChild(buttonText);
  button.setAttribute("id", "edit_button");
  button.addEventListener('click', function() {
    saveEdit(noteCardIndex,parentIndex);
  });
  var innerHTML = obj.innerHTML;
  var textArea = document.createElement('TEXTAREA');
  textArea.setAttribute("id", "edit_textarea");
  parentNode.insertBefore(textArea, obj);
  parentNode.insertBefore(button, obj);
  parentNode.removeChild(obj);
  if( obj.innerHTML.indexOf(NEW_SUBCARD_CLASS) == -1 ) {
    textArea.value = innerHTML;
  }
  textArea.focus();
  EDITING = true;
}
// TODO: Move into Util class
function saveEdit(noteCardIndex,parentIndex) {
  var textArea = document.getElementById('edit_textarea');
  var parentNode = textArea.parentNode;
  var newValue = textArea.value;
  if(noteCardIndex == null && parentIndex != null) {
    Util.addSubCard(parentIndex,newValue);
  } else {
    NOTECARDS[noteCardIndex].title = newValue;
  }
  parentNode.removeChild(textArea);
  parentNode.removeChild(document.getElementById('edit_button'));
  Util.drawCards();
  EDITING = false;
}
// TODO: Move into init function
document.onclick = handleOnClick;
