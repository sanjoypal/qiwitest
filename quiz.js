var q = 0;
var chap = "";
var chapter = 0;
var answers = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0];
var answersLoc = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0];
var timer;
var seconds = 0;
function increment() {
  seconds++;
}
function setAnswerLocation() {
  for (var i = 0; i < 20; i++) {
    answersLoc[i] = rand(4);
    answers[i] = 0;
  }
}
function showQuizPage(i) {
  if (seconds == 0)
    timer = setInterval(function() {increment()}, 1000);
  state = 3;
  setChapter(i);
  var innerHTML = "";
  $(".page").hide();
  $("#bottombar").show();
  showTopbar();
  document.getElementById("titleButton").innerHTML = chapters[i][0] + " (" + (q+1) + "/20)";
  showScrollbar();
  console.log("answersLoc " + answersLoc);
  var answerStr;
  innerHTML = innerHTML + "<div class='btn' id='listButton'>" + chap[q][0] + "</div><br>";
  var j = 2;
  for (var i = 1; i < chap[q].length; i++) {
    if (i == answersLoc[q])
      answerStr = chap[q][1];
    else {
      answerStr = chap[q][j];
      j++;
    } 
    innerHTML = innerHTML + "<div class='btn' id='listButton" + i +"' onclick='verifyAnswer(" + i + ")'>" + answerStr + "</div><br>";
  }
  document.getElementById("quizpage").innerHTML = innerHTML;
  $("#quizpage").show();
  for (var i = 1; i < chap[q].length; i++) {
    if (answers[q] != 0) {
    var selected = "listButton" + i;
    if (i == answers[q])
      document.getElementById(selected).style.background = "lightblue";
    else
      document.getElementById(selected).style.background = "grey";
    }
  }
}
function verifyAnswer(j) {
  console.log("answer : " + j);
  answers[q] = j;
  for (var i = 1; i < chap[q].length; i++) {
    var selected = "listButton" + i;
    if (j == i)
      document.getElementById(selected).style.background = "lightblue";
    else
      document.getElementById(selected).style.background = "grey";
  }
}
function goNext() {
  if (q < chap.length - 1) {
    q++;
    showQuizPage(chapter);
  } else {
    //q = 0;
    showResultPage();
    console.log(answers);
  }
}
function goPrevious() {
  if (q > 0)
    q--;
  else
    q = chap.length - 1;
  showQuizPage(chapter);
}
function rand(i) {
  return Math.floor((Math.random() * i) + 1);
}
function setChapter(i) {
  chapter = i;
  if (i == 0)
    chap = chap1;
  if (i == 1)
    chap = chap2;
  if (i == 2)
    chap = chap3;
  if (i == 3)
    chap = chap4;
  if (i == 4)
    chap = chap5;
  if (i == 5)
    chap = chap6;
  if (i == 6)
    chap = chap7;
  if (i == 7)
    chap = chap8;
}
