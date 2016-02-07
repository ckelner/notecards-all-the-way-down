/************** global namespace ***********/
var NOTECARDS = NOTECARDS || [];
var NOTECARD_IN_FOCUS = null;
var EDITING = false;
/************** init *************/
function init() {
  var child = new Notecard("Item-one", null);
  var notecard = new Notecard("Title", [child]);
  notecard.focus = true;
  NOTECARDS.push(notecard);
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
  var button = document.createElement("button");
  var buttonText = document.createTextNode("Save");
  button.appendChild(buttonText);
  button.setAttribute("id", "edit_button");
  switch(obj.nodeName) {
    case "LI":
      button.addEventListener('click', function() {
        saveEdit("LI");
      });
    break;
    case "H1":
    button.addEventListener('click', function() {
      saveEdit("H1");
    });
    break;
    default:
      return;
    break;
  }
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
function saveEdit(objName) {
  var textArea = document.getElementById('edit_textarea');
  var newEl = document.createElement('H1');
  if(objName == "LI") {
    newEl = document.createElement('LI');
  }
  var parentNode = textArea.parentNode;
  newEl.innerHTML = textArea.value;
  parentNode.insertBefore(newEl, textArea);
  parentNode.removeChild(textArea);
  parentNode.removeChild(document.getElementById('edit_button'));
  EDITING = false;
}
document.onclick = handleOnClick;
