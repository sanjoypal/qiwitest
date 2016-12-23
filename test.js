var arrayLevels = ["Beginner Level", "Intermediate Level", "Advance Level", "Professional Level", "Expert Level"];
var chaptersL1 = ["Spelling", "Article", "Proverb", "Preposition", "Adverb", "Phrasal Verb", "Chapter 7", "Chapter 8", "Chapter 9"];
var chaptersL2 = ["Spelling", "Article", "Proverb", "Preposition", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9"];
var chaptersL3 = ["Spelling", "Article", "Proverb", "Preposition", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9"];
var chaptersL4 = ["Spelling", "Article", "Proverb", "Preposition", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9"];
var chaptersL5 = ["Spelling", "Article", "Proverb", "Preposition", "Chapter 5", "Chapter 6", "Chapter 7", "Chapter 8", "Chapter 9"];

var currentLevel = 1;
var currentMenu = 0;
var currentQ = 0;
var chapterIndex = 0;
var currentChapter = "";
var answers = [-1 , -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
var answersLoc = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0];
var testIndex = [0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0];
var testPaper = [];

var timer;
var TIME = 600;
var score = TIME;
var listContents;
var correct = 30;
var unattempted = 20;
var wrong = 50;

var starred = "";

$(document).on( "ready", function() {
  clearInterval(timer);
  $(":input[name='radio-choice-v-2']").on('change', function() {
    var radioButtons = $("#quizform input:radio[name='radio-choice-v-2']");
    var selectedIndex = radioButtons.index(radioButtons.filter(':checked'));
    answers[currentQ] = selectedIndex;
    $('#panellist li').eq(currentQ+1).children().buttonMarkup({ theme: "b"});
    console.log(selectedIndex);
    setTimeout(function() { goNext(); }, 250);
  });
  var radioButtons = $("#quizform input:radio[name='radio-choice-v-2']");
  var selectedIndex = radioButtons.index(radioButtons.find(':checked'));
// Start Homepage navigation
  $("#levels").on('click', 'li', function(e) {
    currentLevel = $(this).closest('li').index();
    $("#menuheader").html(arrayLevels[currentLevel - 1]);
  });
// End Homepage navigation

// Start Chapterpage navigation
  $("#menus").on('click', 'li', function(e) {
    // Refresh panel list
    for (var li = 1; li < 21; li++) {
      answers[li - 1] = -1;
      answersLoc[li - 1] = 0;
      $('#panellist li').eq(li).children().buttonMarkup({ theme: "c"});;
    }
    score = TIME;
    clearInterval(timer);
    currentMenu = $(this).closest('li').index();
    if (currentMenu == 0) {
      $("#chapters").html("");
      var output = "";
      if (currentLevel == 1)
        listContents = chaptersL1;
      if (currentLevel == 2)
        listContents = chaptersL2;
      if (currentLevel == 3)
        listContents = chaptersL3;
      if (currentLevel == 4)
        listContents = chaptersL4;
      if (currentLevel == 5)
        listContents = chaptersL5;
      for (var i = 0; i < listContents.length; i++) {
        output += "<li id='cid" + i +  "'><a href='#quizpage'>" + listContents[i];
        var percent = localStorage.getItem(currentLevel + "C" + i);
        console.log(percent);
        if (percent != undefined)
          output += " (" + percent + "%)";
        output += "</a></li>";
      }
     
      $("#chapters").html(output);
      $("#chapters").listview("refresh");
    }
    if (currentMenu == 1) {
      createTestPaper();
      score = TIME;
      $("#chapterheader").html(score);
      timer = setInterval(function() {decrement()}, 1000);
      currentQ = 0;
      setChapter(0);
      refreshQuizPage()
    }
    if (currentMenu == 2) {
      $("#bookmarksList").html("");
      var output = "<li data-role='list-divider'><h1>Review answers</h1></li>";
      var j = 1;
      for (var i = 1; i <= 400; i++) {
        var x = (currentLevel-1)*400 + i;
        if (localStorage.getItem("Q"+ x) == "1") {
          //console.log(Math.floor((i-1)/20));
          getChapter(Math.floor((i-1)/20));
          //console.log(currentChapter[Math.floor(i%20)-1]);
          output += "<li data-role='list-divider'><h1>" + "Question " + j + "</h1></li>";
          j++;
          output += "<li style='white-space: normal;'>";
          var qi = Math.floor((i-1)%20);
          output += currentChapter[qi][0];
          output += "<ul>";
          for (var k = 1; k < currentChapter[qi].length; k++) {
            output += "<li ";
            if (k == 1) 
              output += "style='white-space: normal; background-color: lightgreen;'>";
            else
              output += "style='white-space: normal; background-color: lightgray;'>";
            output += currentChapter[qi][k];
            output += "</li>";
          }
          output += "</ul>";
          output += "</li>";
        }
      }
      $("#bookmarksList").html(output);
      $("#bookmarksList").listview("refresh");
    }
    if (currentMenu == 3) {
      $("#progressList").html("");
      var output = "<li data-role='list-divider'><h1>Test Scores</h1></li>";
      var testcount = localStorage.getItem("TestCount"+currentLevel);
      if (testcount != undefined) {
        var totalScore = 0;
        var testCount = 0;
        for (var i = testcount - 1; i >= 1; i--) {
          var testscore = localStorage.getItem(currentLevel + "T" + i);
          if (testscore != undefined) {
            totalScore = totalScore + testscore * 1;
            testCount++;
            output += "<li>";
            output += "Test " + i + " : " + testscore + "%";
            output += "</li>";
          }
        }
        var avgScore = totalScore / testCount;
        console.log("avgScore = " + avgScore);
        console.log("totalScore = " + totalScore);
        console.log("testCount = " + testCount);
        $("#progressCircle").empty();
        $("#progressCircle").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            percent: avgScore,
            textSize: 28,
            textStyle: 'font-size: 12px;',
            textColor: '#666',
            text: 'Your percentile',
            halfCircle: 1
        });
        
        $("#progressList").html(output);
        $("#progressList").listview("refresh");
      }
    }
  });
// End Chapterpage navigation
  $("#quizback").click(function() {
    score = TIME;
    clearInterval(timer);
    console.log("Clicked Quiz Page back");
    if (currentMenu == 1) {
      //$("body").pagecontainer("change", "menupage", {});
      $.mobile.changePage("#menupage");
    } else if (currentMenu == 0) {
      $.mobile.changePage("#chapterspage");
    }
  });
  $("#resultback").click(function() {
    score = TIME;
    clearInterval(timer);
    if (currentMenu == 1) {
      //$("body").pagecontainer("change", "menupage", {});
      $.mobile.changePage("#menupage");
    } else if (currentMenu == 0) {
      $.mobile.changePage("#chapterspage");
    }
  });
  $("#star").click(function() {
    starred = (currentLevel-1)*400 + chapterIndex*20 + (currentQ+1);
    if (localStorage.getItem("Q"+starred) != "1") {
      localStorage.setItem("Q"+starred, "1");
      $("#star").buttonMarkup({ theme: "b" });
      alert("Bookmark added!");
    } else {
      localStorage.removeItem("Q"+starred);
      $("#star").buttonMarkup({theme: "c" });
      alert("Bookmark removed!");
    }
    console.log(starred);
  });
  $("#resultbtn").click(function() {
    score = TIME;
    clearInterval(timer);
    var aq = 0;
    var ca = 0;
    for (var i = 0; i < answers.length; i++) {
      if (answers[i] != -1)
        aq++;
      if (answers[i]+1 == answersLoc[i])
        ca++;
    }

    var uaq = answers.length - aq;
    $("#ca").html("Correct Answer : " + ca);
    $("#wa").html("Wrong Answer : " + (aq-ca));
    $("#ua").html("Unanswered : " + (answers.length - aq));
    var percent =  Math.floor((ca/answers.length)*100);
    $("#resultheader").html("Your Score : " + percent + "%");
    if (currentMenu == 0) {
      localStorage.setItem(currentLevel + "C" + chapterIndex, percent);
    } else if (currentMenu == 1) {
      var testcount = localStorage.getItem("TestCount"+currentLevel);
      if (testcount == undefined)
        testcount = 1;
      localStorage.setItem(currentLevel + "T" + testcount, percent);
      testcount++;
      localStorage.setItem("TestCount"+currentLevel, testcount);
    }
    $("#resultCircle").empty();
    $("#resultCircle").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            percent: percent,
            textSize: 28,
            textStyle: 'font-size: 12px;',
            textColor: '#666',
            multiPercentage: 1,
            percentages: [10, 20, 30]
        });
    $("#answersList").html("");
    var output = "<li data-role='list-divider'><h1>Review answers</h1></li>";
    for (var i = 0; i < answers.length; i++) {
      output += "<li data-role='list-divider'><h1>" + "Question " + (i+1) + "</h1></li>";
      output += "<li style='white-space: normal;'>";
      output += currentChapter[i][0];
      output += "<ul>";
      //var answerStr;
      var j = 2;
      for (var k = 1; k < currentChapter[currentQ].length; k++) {
        //output += "<li style='white-space: normal;'>";
        output += "<li ";
        if (answersLoc[i] == k) {
          if ((answers[i] + 1) == answersLoc[i]) 
            output += "style='white-space: normal; background-color: lightgreen;'>";
          else
            output += "style='white-space: normal; color: green;'>";
          output += currentChapter[i][1];
        } else {
          if ((answers[i] + 1) == k) 
            output += "style='white-space: normal; background-color: pink;'>";
          else
            output += "style='white-space: normal; background-color: lightgrey;'>";
          output += currentChapter[i][j];
          j++;
        }
        output += "</li>";
      }
      output += "</ul>";
      output += "</li>";
    }
    $("#answersList").html(output);
    $("#answersList").listview("refresh");
  });
  $("#chapters").on('click', 'li', function(e) {
    setChapter($(this).closest('li').index());
    $("#chapterheader").html(listContents[chapterIndex]);
    refreshQuizPage()
    console.log(currentChapter[0][0]);
    // Refresh panel list
    for (var li = 1; li < 21; li++) {
      answers[li - 1] = -1;
      $('#panellist li').eq(li).children().buttonMarkup({ theme: "c"});;
    }
  });

  function decrement() {
    if (score > 0) {
      score--;
      var date = new Date(null);
      date.setSeconds(score);
      console.log(date.toISOString());
      $("#chapterheader").html("Time Left : " + date.toISOString().substr(14, 5));
    }
  }
  function refreshQuizPage() {
    $("#questionnumber").html((currentQ+1) + "/" + currentChapter.length);
    $("#question").html(currentChapter[currentQ][0]);
    // Refresh bookmark icon
    var starIndex = (currentLevel-1)*400 + chapterIndex*20 + (currentQ+1);
    var star = localStorage.getItem("Q" + starIndex);
    console.log("star : " + starIndex +" " + star);
    if (star == 1)
        $("#star").buttonMarkup({ theme: "b" });
    else
        $("#star").buttonMarkup({ theme: "c" });
    
    var answerStr;
    var j = 2;
    for (var i = 1; i < currentChapter[currentQ].length; i++) {
      if (i == answersLoc[currentQ])
        answerStr = currentChapter[currentQ][1];
      else {
        answerStr = currentChapter[currentQ][j];
        j++;
      }
      if (i == 1)
        $("#opta").html(answerStr);
      if (i == 2)
        $("#optb").html(answerStr);
      if (i == 3)
        $("#optc").html(answerStr);
      if (i == 4)
        $("#optd").html(answerStr);
    }
    
    var radioButtons = $("#quizform input:radio[name='radio-choice-v-2']");
    radioButtons.each(function() {
      $(this).prop("checked", false).checkboxradio("refresh");
    });
    if (answers[currentQ] == 0) {
      radioButtons.filter('[value=a]').prop("checked", true).checkboxradio("refresh");
      console.log("cuurentQ = "+answers[currentQ]);
    }
    if (answers[currentQ] == 1) {
      radioButtons.filter('[value=b]').prop("checked", true).checkboxradio("refresh");
      console.log("cuurentQ = "+answers[currentQ]);
    }
    if (answers[currentQ] == 2) {
      radioButtons.filter('[value=c]').prop("checked", true).checkboxradio("refresh");
      console.log("cuurentQ = "+answers[currentQ]);
    }
    if (answers[currentQ] == 3) {
      radioButtons.filter('[value=d]').prop("checked", true).checkboxradio("refresh");
      console.log("cuurentQ = "+answers[currentQ]);
    }
  }
/*
$('#index').live('pagebeforeshow',function(e,data){    
    $("li").tap(function() {
        $(this).buttonMarkup({ icon: "edit" });
    });  
});
*/
  $("#panellist").on('click', 'li', function(e) {
    //$(this).closest("li").buttonMarkup({icon: 'edit'});
    currentQ = $(this).closest('li').index() - 1;
    refreshQuizPage();
    $("[data-role=panel]").panel("close");
  });
  function goNext() {
    if (currentQ < currentChapter.length - 1) {
      currentQ++;
      refreshQuizPage();
    } else {
      //showResultPage();
      console.log(answers);
    }
  }
  $("#nextbtn").click(function() {
    goNext();
  });
  $("#prevbtn").click(function() {
    if (currentQ > 0)
      currentQ--;
    else
      currentQ = currentChapter.length - 1;
    refreshQuizPage();
  });
});


function setAnswerLocation() {
  for (var i = 0; i < 20; i++) {
    answersLoc[i] = rand(4);
    answers[i] = -1;
    currentQ = 0;
  }
}
function rand(i) {
  return Math.floor((Math.random() * i) + 1);
}

function setChapter(i) {
  setAnswerLocation();
  chapterIndex = i;
  if (currentMenu == 1) {
    currentChapter = testPaper;
    return;
  }
  getChapter(i);
}
function getChapter(i) { 
  if (currentLevel == 1) {
    if (i == 0)
      currentChapter = level1_chapter1;
    if (i == 1)
      currentChapter = level1_chapter2;
    if (i == 2)
      currentChapter = level1_chapter3;
    if (i == 3)
      currentChapter = level1_chapter4;
    if (i == 4)
      currentChapter = level1_chapter5;
    if (i == 5)
      currentChapter = level1_chapter6;
    if (i == 6)
      currentChapter = level1_chapter7;
    if (i == 7)
      currentChapter = level1_chapter8;
    if (i == 8)
      currentChapter = level1_chapter9;
    if (i == 9)
      currentChapter = level1_chapter10;
  }
  if (currentLevel == 2) {
    if (i == 0)
      currentChapter = level2_chapter1;
    if (i == 1)
      currentChapter = level2_chapter2;
    if (i == 2)
      currentChapter = level2_chapter3;
    if (i == 3)
      currentChapter = level2_chapter4;
    if (i == 4)
      currentChapter = level2_chapter5;
    if (i == 5)
      currentChapter = level2_chapter6;
    if (i == 6)
      currentChapter = level2_chapter7;
    if (i == 7)
      currentChapter = level2_chapter8;
    if (i == 8)
      currentChapter = level2_chapter9;
    if (i == 9)
      currentChapter = level2_chapter10;
  }
  if (currentLevel == 3) {
    if (i == 0)
      currentChapter = level3_chapter1;
    if (i == 1)
      currentChapter = level3_chapter2;
    if (i == 2)
      currentChapter = level3_chapter3;
    if (i == 3)
      currentChapter = level3_chapter4;
    if (i == 4)
      currentChapter = level3_chapter5;
    if (i == 5)
      currentChapter = level3_chapter6;
    if (i == 6)
      currentChapter = level3_chapter7;
    if (i == 7)
      currentChapter = level3_chapter8;
    if (i == 8)
      currentChapter = level3_chapter9;
    if (i == 9)
      currentChapter = level3_chapter10;
  }
  if (currentLevel == 4) {
    if (i == 0)
      currentChapter = level4_chapter1;
    if (i == 1)
      currentChapter = level4_chapter2;
    if (i == 2)
      currentChapter = level4_chapter3;
    if (i == 3)
      currentChapter = level4_chapter4;
    if (i == 4)
      currentChapter = level4_chapter5;
    if (i == 5)
      currentChapter = level4_chapter6;
    if (i == 6)
      currentChapter = level4_chapter7;
    if (i == 7)
      currentChapter = level4_chapter8;
    if (i == 8)
      currentChapter = level4_chapter9;
    if (i == 9)
      currentChapter = level4_chapter10;
  }
  if (currentLevel == 5) {
    if (i == 0)
      currentChapter = level5_chapter1;
    if (i == 1)
      currentChapter = level5_chapter2;
    if (i == 2)
      currentChapter = level5_chapter3;
    if (i == 3)
      currentChapter = level5_chapter4;
    if (i == 4)
      currentChapter = level5_chapter5;
    if (i == 5)
      currentChapter = level5_chapter6;
    if (i == 6)
      currentChapter = level5_chapter7;
    if (i == 7)
      currentChapter = level5_chapter8;
    if (i == 8)
      currentChapter = level5_chapter9;
    if (i == 9)
      currentChapter = level5_chapter10;
  }
}
function createTestPaper() {
  for (var i = 0; i < testIndex.length; i++)
    testIndex[i] = rand(20) - 1;
  for (var i = 0; i < testIndex.length; i++) {
    if (currentLevel == 1) {
    if (i == 0)
      testPaper[0] = level1_chapter1[testIndex[0]]; 
    if (i == 1)
      testPaper[1] = level1_chapter2[testIndex[1]]; 
    if (i == 2)
      testPaper[2] = level1_chapter3[testIndex[i]]; 
    if (i == 3)
      testPaper[3] = level1_chapter4[testIndex[i]]; 
    if (i == 4)
      testPaper[4] = level1_chapter5[testIndex[i]]; 
    if (i == 5)
      testPaper[5] = level1_chapter6[testIndex[i]]; 
    if (i == 6)
      testPaper[6] = level1_chapter7[testIndex[i]]; 
    if (i == 7)
      testPaper[7] = level1_chapter8[testIndex[i]]; 
    if (i == 8)
      testPaper[8] = level1_chapter9[testIndex[i]]; 
    if (i == 9)
      testPaper[9] = level1_chapter10[testIndex[i]]; 
    if (i == 10)
      testPaper[10] = level1_chapter11[testIndex[i]]; 
    if (i == 11)
      testPaper[11] = level1_chapter12[testIndex[i]]; 
    if (i == 12)
      testPaper[12] = level1_chapter13[testIndex[i]]; 
    if (i == 13)
      testPaper[13] = level1_chapter14[testIndex[i]]; 
    if (i == 14)
      testPaper[14] = level1_chapter15[testIndex[i]]; 
    if (i == 15)
      testPaper[15] = level1_chapter16[testIndex[i]]; 
    if (i == 16)
      testPaper[16] = level1_chapter17[testIndex[i]]; 
    if (i == 17)
      testPaper[17] = level1_chapter18[testIndex[i]]; 
    if (i == 18)
      testPaper[18] = level1_chapter19[testIndex[i]]; 
    if (i == 19)
      testPaper[19] = level1_chapter20[testIndex[i]]; 
    }
    if (currentLevel == 2) {
    if (i == 0)
      testPaper[0] = level2_chapter1[testIndex[0]]; 
    if (i == 1)
      testPaper[1] = level2_chapter2[testIndex[1]]; 
    if (i == 2)
      testPaper[2] = level2_chapter3[testIndex[i]]; 
    if (i == 3)
      testPaper[3] = level2_chapter4[testIndex[i]]; 
    if (i == 4)
      testPaper[4] = level2_chapter5[testIndex[i]]; 
    if (i == 5)
      testPaper[5] = level2_chapter6[testIndex[i]]; 
    if (i == 6)
      testPaper[6] = level2_chapter7[testIndex[i]]; 
    if (i == 7)
      testPaper[7] = level2_chapter8[testIndex[i]]; 
    if (i == 8)
      testPaper[8] = level2_chapter9[testIndex[i]]; 
    if (i == 9)
      testPaper[9] = level2_chapter10[testIndex[i]]; 
    if (i == 10)
      testPaper[10] = level2_chapter11[testIndex[i]]; 
    if (i == 11)
      testPaper[11] = level2_chapter12[testIndex[i]]; 
    if (i == 12)
      testPaper[12] = level2_chapter13[testIndex[i]]; 
    if (i == 13)
      testPaper[13] = level2_chapter14[testIndex[i]]; 
    if (i == 14)
      testPaper[14] = level2_chapter15[testIndex[i]]; 
    if (i == 15)
      testPaper[15] = level2_chapter16[testIndex[i]]; 
    if (i == 16)
      testPaper[16] = level2_chapter17[testIndex[i]]; 
    if (i == 17)
      testPaper[17] = level2_chapter18[testIndex[i]]; 
    if (i == 18)
      testPaper[18] = level2_chapter19[testIndex[i]]; 
    if (i == 19)
      testPaper[19] = level2_chapter20[testIndex[i]]; 
    }
    if (currentLevel == 3) {
    if (i == 0)
      testPaper[0] = level3_chapter1[testIndex[0]]; 
    if (i == 1)
      testPaper[1] = level3_chapter2[testIndex[1]]; 
    if (i == 2)
      testPaper[2] = level3_chapter3[testIndex[i]]; 
    if (i == 3)
      testPaper[3] = level3_chapter4[testIndex[i]]; 
    if (i == 4)
      testPaper[4] = level3_chapter5[testIndex[i]]; 
    if (i == 5)
      testPaper[5] = level3_chapter6[testIndex[i]]; 
    if (i == 6)
      testPaper[6] = level3_chapter7[testIndex[i]]; 
    if (i == 7)
      testPaper[7] = level3_chapter8[testIndex[i]]; 
    if (i == 8)
      testPaper[8] = level3_chapter9[testIndex[i]]; 
    if (i == 9)
      testPaper[9] = level3_chapter10[testIndex[i]]; 
    if (i == 10)
      testPaper[10] = level3_chapter11[testIndex[i]]; 
    if (i == 11)
      testPaper[11] = level3_chapter12[testIndex[i]]; 
    if (i == 12)
      testPaper[12] = level3_chapter13[testIndex[i]]; 
    if (i == 13)
      testPaper[13] = level3_chapter14[testIndex[i]]; 
    if (i == 14)
      testPaper[14] = level3_chapter15[testIndex[i]]; 
    if (i == 15)
      testPaper[15] = level3_chapter16[testIndex[i]]; 
    if (i == 16)
      testPaper[16] = level3_chapter17[testIndex[i]]; 
    if (i == 17)
      testPaper[17] = level3_chapter18[testIndex[i]]; 
    if (i == 18)
      testPaper[18] = level3_chapter19[testIndex[i]]; 
    if (i == 19)
      testPaper[19] = level3_chapter20[testIndex[i]]; 
    }
    if (currentLevel == 4) {
    if (i == 0)
      testPaper[0] = level4_chapter1[testIndex[0]]; 
    if (i == 1)
      testPaper[1] = level4_chapter2[testIndex[1]]; 
    if (i == 2)
      testPaper[2] = level4_chapter3[testIndex[i]]; 
    if (i == 3)
      testPaper[3] = level4_chapter4[testIndex[i]]; 
    if (i == 4)
      testPaper[4] = level4_chapter5[testIndex[i]]; 
    if (i == 5)
      testPaper[5] = level4_chapter6[testIndex[i]]; 
    if (i == 6)
      testPaper[6] = level4_chapter7[testIndex[i]]; 
    if (i == 7)
      testPaper[7] = level4_chapter8[testIndex[i]]; 
    if (i == 8)
      testPaper[8] = level4_chapter9[testIndex[i]]; 
    if (i == 9)
      testPaper[9] = level4_chapter10[testIndex[i]]; 
    if (i == 10)
      testPaper[10] = level4_chapter11[testIndex[i]]; 
    if (i == 11)
      testPaper[11] = level4_chapter12[testIndex[i]]; 
    if (i == 12)
      testPaper[12] = level4_chapter13[testIndex[i]]; 
    if (i == 13)
      testPaper[13] = level4_chapter14[testIndex[i]]; 
    if (i == 14)
      testPaper[14] = level4_chapter15[testIndex[i]]; 
    if (i == 15)
      testPaper[15] = level4_chapter16[testIndex[i]]; 
    if (i == 16)
      testPaper[16] = level4_chapter17[testIndex[i]]; 
    if (i == 17)
      testPaper[17] = level4_chapter18[testIndex[i]]; 
    if (i == 18)
      testPaper[18] = level4_chapter19[testIndex[i]]; 
    if (i == 19)
      testPaper[19] = level4_chapter20[testIndex[i]]; 
    }
    if (currentLevel == 5) {
    if (i == 0)
      testPaper[0] = level5_chapter1[testIndex[0]]; 
    if (i == 1)
      testPaper[1] = level5_chapter2[testIndex[1]]; 
    if (i == 2)
      testPaper[2] = level5_chapter3[testIndex[i]]; 
    if (i == 3)
      testPaper[3] = level5_chapter4[testIndex[i]]; 
    if (i == 4)
      testPaper[4] = level5_chapter5[testIndex[i]]; 
    if (i == 5)
      testPaper[5] = level5_chapter6[testIndex[i]]; 
    if (i == 6)
      testPaper[6] = level5_chapter7[testIndex[i]]; 
    if (i == 7)
      testPaper[7] = level5_chapter8[testIndex[i]]; 
    if (i == 8)
      testPaper[8] = level5_chapter9[testIndex[i]]; 
    if (i == 9)
      testPaper[9] = level5_chapter10[testIndex[i]]; 
    if (i == 10)
      testPaper[10] = level5_chapter11[testIndex[i]]; 
    if (i == 11)
      testPaper[11] = level5_chapter12[testIndex[i]]; 
    if (i == 12)
      testPaper[12] = level5_chapter13[testIndex[i]]; 
    if (i == 13)
      testPaper[13] = level5_chapter14[testIndex[i]]; 
    if (i == 14)
      testPaper[14] = level5_chapter15[testIndex[i]]; 
    if (i == 15)
      testPaper[15] = level5_chapter16[testIndex[i]]; 
    if (i == 16)
      testPaper[16] = level5_chapter17[testIndex[i]]; 
    if (i == 17)
      testPaper[17] = level5_chapter18[testIndex[i]]; 
    if (i == 18)
      testPaper[18] = level5_chapter19[testIndex[i]]; 
    if (i == 19)
      testPaper[19] = level5_chapter20[testIndex[i]]; 
    }
    console.log(testPaper[i] + " ");
  }
}
/*
You would have to do it programmatically, AFAIK.

Something along the lines of:

$(document).bind( "mobileinit", function () 
{
    ...
    $.mobile.page.prototype.options.contentTheme = "z"; //your theme
    ...
});
Now, since there is no centralized hook - you will have to do the similar line for all theme options there are:

$.mobile.page.prototype.options.headerTheme
$.mobile.page.prototype.options.footerTheme
and so on.

I don't have a list of all of them, but a quick look through the jquery.mobile-1.0rc1.js searching for .prototype.options. reveals these:

$.mobile.page.prototype.options.backBtnTheme
$.mobile.page.prototype.options.headerTheme
$.mobile.page.prototype.options.footerTheme
$.mobile.page.prototype.options.contentTheme
$.mobile.listview.prototype.options.filterTheme
so it seems to me that you can go with these and discover more as you go. Note that not all of them are created like that - some are constructed dynamically in the code. Look for Theme string to see what I mean.

Update

$.mobile.page.prototype.options.theme should be updated as well - based on Moak's 
*/
