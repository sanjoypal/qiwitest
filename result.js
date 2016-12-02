var listResult = [ ["Percentage"], ["Total Questions"], ["Attempted Questions"], ["Correct Answers"], ["Time spent"]];
var listResultVar = [ [0], [0], [0], [0], [0]];
var adjectives = ["Needs Improvements!", "Beginner Level!", "Intermediate Level!", "Advance Level!", "Professional Level!", "Expert Level!"];


function showResultPage() {
  state = 4;
  showTopbar();
  var innerHTML = "";
  $(".page").hide();
  clearInterval(timer);

  var aq = 0;
  var ca = 0;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] != 0)
      aq++;
    if (answers[i] == answersLoc[i])
      ca++;
  }
  var score = (ca/answers.length)*100;
  listResultVar[0] = score + "%";
  listResultVar[1] = answers.length;
  listResultVar[2] = aq;
  listResultVar[3] = ca;
  
  var h = Math.floor(seconds / 3600);
  var m = Math.floor((seconds % 3600) / 60);
  var s = (seconds % 3600) % 60;
  var timestr = "";
  if (h != 0)
    timestr = h + "h:";
  timestr = timestr + m + "m:" + s +"s";
  listResultVar[4] = timestr;
  seconds = 0;

  console.log(chap);
  for (var i = 0; i < listResult.length; i++)
    innerHTML = innerHTML + "<div class='btn' id='listButton' onclick='showMenuPage(" + i + ")'>" + listResult[i] + " :  " + listResultVar[i] + "</div><br>";
  document.getElementById("resultpage").innerHTML = innerHTML + buildListResults();
  $("#resultpage").show();
  $("#bottombar").hide();
  $("#scrollbar").hide();
  if (score < 20)
    document.getElementById("titleButton").innerHTML = adjectives[0];
  else if (score > 20 && score <= 40)
    document.getElementById("titleButton").innerHTML = adjectives[1];
  else if (score > 40 && score <= 60)
    document.getElementById("titleButton").innerHTML = adjectives[2];
  else if (score > 60 && score <= 80)
    document.getElementById("titleButton").innerHTML = adjectives[3];
  else if (score > 80 && score <= 90)
    document.getElementById("titleButton").innerHTML = adjectives[4];
  else if (score > 90)
    document.getElementById("titleButton").innerHTML = adjectives[5];
}
function buildListResults() {
  var innerHTML = "";
  for (var k = 0; k < chap.length; k++) {

  innerHTML = innerHTML + "<div class='btn' id='listButton'>" + chap[k][0] + "</div><br>";
  var j = 2;
  for (var i = 1; i < chap[k].length; i++) {
    if (i == answersLoc[k])
      answerStr = chap[k][1];
    else {
      answerStr = chap[k][j];
      j++;
    } 
    var col = "grey";
    if (answers[k] == answersLoc[k] && i == answersLoc[k])
      col = "lightgreen";
    else if (i == answersLoc[k])
      col = "green";
    else if (answers[k] != 0 && i == answers[k])
      col = "pink";
   
    innerHTML = innerHTML + "<div class='btn' style='background : " + col +";' id='listButton" + k + i +"'>" + answerStr + "</div><br>";
  }
  }
  return innerHTML;
}
