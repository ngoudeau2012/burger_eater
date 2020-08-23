// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $("#submit-burger-btn").on("click", function(event) {
    event.preventDefault();

    // ensures empty field isn't submitted
    if ($("#input-burger-name").val().trim() != "") {
        let newBurger = {
            burger_name: $("#input-burger-name").val().trim()
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("new burger added!");
            location.reload();
        });
    } else {
        alert("Please enter valid burger name")
    }
});

$(".devour-btn").on("click", function(event) {
  event.preventDefault();

  let id = $(this).data("burgerid");
  let burgerData = {
      devoured: 1
  };
console.log(burgerData)
  $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: burgerData
  }).then(function() {
      console.log("Burger devoured!");
      location.reload();
  });
});

   // delete burger 
   $(".delete-btn").on("click", function(event) {
    event.preventDefault();

    let id = $(this).data("burgerid");
    
    $.ajax("/api/burgers/" + id, {
        type:"DELETE"
    }).then(function() {
        console.log("Burger deleted!")
        location.reload();
    });
});
});
