$('input[name="Edit"]').click(function() {
  $(this)
    .val(function(i, v) {
      return v === "Edit" ? "Finished" : "Edit";
    })
    .prev("textarea[required]")
    .prop("readonly", function(i, r) {
      return !r;
    });
});
