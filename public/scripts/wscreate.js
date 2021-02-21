//Optional Fields Create Workshop
$("#type").change(function() {
  if ($(this).val() == "Präsenzseminar") {
    $("#locationDiv").show();
  } else {
    $("#locationDiv").hide();
    $("#location").val("Online");
  }
});

$("#type").trigger("change");
