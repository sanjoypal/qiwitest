var listReport = [ ["Percentile"], ["Total questions"], ["Attempted questions"], ["Correct Answers"], ["Time spent"]];
var listReportVar = [ [90], [1000], [700], [500], [3600]];

function showReportPage() {
  var innerHTML = "";
  state = 5;
  showTopbar();
  $(".page").hide();
  for (var i = 0; i < listReport.length; i++)
    innerHTML = innerHTML + "<div class='btn' id='listButton' onclick='showMenuPage(" + i + ")'>" + listReport[i] + " :  " + listReportVar[i] + "</div><br>";
  document.getElementById("reportpage").innerHTML = innerHTML;
  $("#reportpage").show();
}
