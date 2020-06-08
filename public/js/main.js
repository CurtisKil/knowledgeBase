$(document).ready(function () {
  $(".delete-article").on("click", function (e) {
    // $target returns which DOM element triggered the event
    $target = $(e.target);
    const id = $target.attr("data-id");
    $.ajax({
      type: "DELETE",
      url: "/article/" + id,
      success: function (response) {
        alert("Deleting Article");
        // Redirect to the Homepage
        window.location.href = "/";
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
