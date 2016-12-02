var topmenu = [ [["More", "More"], ["Test Your English", "Title"], ["Share", "Share"]],
                [["Back", "Class"], ["Test Your English", "Title"], ["Share", "Share"]],
                [["Back", "Menu"], ["Contents", "Title"], ["Share", "Share"]],
                [["Back", "Chapter"], ["Questions", "Title"], ["Submit", "Result"]],
                [["Back", "Chapter"], ["Results", "Title"], ["Rating", "Rating"]],
                [["Back", "Menu"], ["Reports", "Title"], ["Rating", "Rating"]],
                [["Back", "Menu"], ["Syllabus", "Title"], ["Rating", "Rating"]]];


var listContents = "";
function showTopbar() {
  var innerHTML = "";
  listContents = topmenu;
  for (var i = 0; i < listContents[state].length; i++) {
    if (i == 1)
        innerHTML = innerHTML + "<div class='btn' id='titleButton' onclick='show" + listContents[state][i][1] + "Page()'>" + listContents[state][i][0] + "</div>";
    else
        innerHTML = innerHTML + "<div class='btn' id='skButton' onclick='show" + listContents[state][i][1] + "Page()'>" + listContents[state][i][0] + "</div>";
  }
  document.getElementById("topbar").innerHTML = innerHTML; 
}

function showScrollbar() {
  var innerHTML = "";
  listContents = topmenu;
  for (var i = 1; i <= 20; i++)
    innerHTML = innerHTML + "<div class='btn' id='scrollButton' onclick='q =" + (i-1) + "; showQuizPage(" + chapter + ")'>" + i +"</div>";
  document.getElementById("container").innerHTML = innerHTML; 
  $("#scrollbar").show();
}
