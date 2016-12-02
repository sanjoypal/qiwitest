var classes = [ ["Class IX"], ["Class X"], ["Class XI"], ["Class XII"] ];
var mainmenu = [ ["Practice", "Chapter"], ["Evaluate", "Quiz"],  ["Starred", "Quiz"], ["Reports", "Report"],  ["Syllabus", "Syllabus"]];
var chapters = [ ["Synonyms", "Quiz"], ["Anonyms", "Quiz"], ["Tense", "Quiz"], ["Proverb", "Quiz"], ["Article", "Quiz"], ["Preposition", "Quiz"] ];

var listContents = "";
var klass = 0;
var state = 0;
function showMenuPage(i) {
  console.log("i:" + i);
  state = 1;
  $(".page").hide();
  var innerHTML = "";
  listContents = mainmenu;
  for (var i = 0; i < listContents.length; i++)
    innerHTML = innerHTML + "<div class='btn' id='practiceButton' onclick='show" + listContents[i][1] + "Page()'>" + listContents[i][0] + "</div><br>";
  document.getElementById("menupage").innerHTML = innerHTML;
  $("#menupage").show();
  showTopbar();
  $("#bottombar").hide();
}
function showClassPage() {
  state = 0;
  var innerHTML = "";
  $(".page").hide();
  listContents = classes;
  for (var i = 0; i < listContents.length; i++)
    innerHTML = innerHTML + "<div class='btn' id='listButton' onclick='showMenuPage(" + i + ")'>" + listContents[i] + "</div><br>";
  document.getElementById("classpage").innerHTML = innerHTML;
  $("#classpage").show();
  showTopbar();
  $("#bottombar").hide();
  $("#scrollbar").hide();
}
function showChapterPage() {
  state = 2;
  var innerHTML = "";
  $(".page").hide();
  listContents = chapters;
  for (var i = 0; i < listContents.length; i++)
    innerHTML = innerHTML + "<div class='btn' id='chapterButton' onclick='show" + listContents[i][1] + "Page(" + i + ")'>" + listContents[i][0] + "</div><br>";
  document.getElementById("chapterpage").innerHTML = innerHTML;
  $("#chapterpage").show();
  q = 0;
  setAnswerLocation();
  showTopbar();
  $("#bottombar").hide();
  $("#scrollbar").hide();
  clearInterval(timer);
}
function main() {
  showClassPage();
}
