var NOTECARDS = NOTECARDS || [];
/************** init *************/
function init() {
  var notecard = new Notecard(null,null);
  NOTECARDS.push(notecard);
  Util.drawCards();
}
if (window.addEventListener) {
  window.addEventListener("load", init, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", init);
} else {
  window.onload = init;
}
