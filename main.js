/************** global namespace ***********/
var NOTECARDS = NOTECARDS || [];
var NOTECARD_INDEX = 0;
var NOTECARD_IN_FOCUS = null;
var EDITING = false;
/************** init *************/
function init() {
  var notecard = new Notecard("Title", null);
  var child = new Notecard("Item-one", null, notecard.index);
  notecard.focus = true;
  notecard.addChild(child);
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
  if(obj.tagName == "TEXTAREA" || obj.tagName == "A") {
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
  var button = document.createElement("button");
  var buttonText = document.createTextNode("Save");
  button.appendChild(buttonText);
  button.setAttribute("id", "edit_button");
  button.addEventListener('click', function() {
    saveEdit(noteCardIndex);
  });
  var innerHTML = obj.innerHTML;
  var textArea = document.createElement('TEXTAREA');
  textArea.setAttribute("id", "edit_textarea");
  var parentNode = obj.parentNode;
  parentNode.insertBefore(textArea, obj);
  parentNode.insertBefore(button, obj);
  parentNode.removeChild(obj);
  textArea.value = innerHTML;
  textArea.focus();
  EDITING = true;
}
function saveEdit(noteCardIndex) {
  var textArea = document.getElementById('edit_textarea');
  var parentNode = textArea.parentNode;
  var newValue = textArea.value;
  NOTECARDS[noteCardIndex].title = newValue;
  parentNode.removeChild(textArea);
  parentNode.removeChild(document.getElementById('edit_button'));
  Util.drawCards();
  EDITING = false;
}
document.onclick = handleOnClick;
