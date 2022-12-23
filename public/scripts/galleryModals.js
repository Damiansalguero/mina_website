var exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function(event) {
  var myCarousel = $(event.target).find(".carousel");
  var clickedImg = event.relatedTarget;
  console.log(event.relatedTarget);
  var position = clickedImg.getAttribute("data-bs-position");
  var items = myCarousel
    .find(".carousel-item")
    .eq(position)
    .addClass("active");
  var carousel = new bootstrap.Carousel(myCarousel.element);
});
