//Optional Fields Workshopregister
$("#type").change(function() {
  if ($(this).val() == "Online") {
    $("#locationregister").hide();
    $("#registerallergy").hide();
    $("#allerycats").hide();
    $("#wsdiet").hide();
  }
});
$("#type").trigger("change");
