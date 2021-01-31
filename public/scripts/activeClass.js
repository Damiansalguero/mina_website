$(function() {
  var current = location.pathname;
  $(".navbar-nav .nav-item a").each(function() {
    var $this = $(this);
    if ($this.attr("href").indexOf(current) !== -1) {
      $this.addClass("active");
    } else if ($this.attr("href").indexOf(current) === "/") {
      $this.addClass("active");
    }
  });
});

// $(".navbar-nav .nav-item").on("click", function() {
//   $(".navbar-nav .nav-item a")
//     .find("a.active")
//     .removeClass("active");
//   $(this)
//     .parent("a")
//     .addClass("active");
// });
