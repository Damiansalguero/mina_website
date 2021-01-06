function setActive() {
//   aObj = document
//     .getElementById("navbarNavAltMarkup")
//     .getElementsByClassName("nav-link");
//   for (i = 0; i < aObj.length; i++) {
//     if (document.location.href.indexOf(aObj[i].href) >= 0) {
//       aObj[i].className = "nav-link active";
//     }
//   }
// }
//
// window.onload = setActive;

$(function() {
  var current = location.pathname;
  console.log(location.pathname);
  $(".navbar-nav li a").each(function() {
    var $this = $(this);
    // if the current path is like this link, make it active
    if ($this.attr("href").indexOf(current) !== -1) {
      $this.addClass("active");
    } else if ($this.attr("href").indexOf(current) === "/mina") {
      $this.addClass("active");
    }
  });
});
