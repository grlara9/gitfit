// Get references to page elements
var $name = $("#name");
var $height = $("#height");
var $weight = $("#weight");
var $age = $("#age");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $goal = $("#goal");
var $activity = $("#activity");
var $sex = $("#sex");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.name)
        .attr("href", "/example/" + example.id);
      console.log(example.text);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete btn-flat")
        .attr('id', 'delete-btn')
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();
  // console.log($goal.val());
  console.log($("#goal"));
  var example = {
    name: $name.val().trim(),
    age: $age.val().trim(),
    weight: $weight.val().trim(),
    height: $height.val().trim(),
    goal: $("#goal option:selected").text(),
    activity: $("#activity option:selected").text(),
    sex: $("#sex option:selected").text()
  };

  // if (!example.name || !example.age || !example.weight || example.height) {
  //   alert("Please fill out all fields before submitting!");
  //   return;
  // }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $name.val("");
  $height.val("");
  $weight.val("");
  $age.val("");
  $goal.val("");
  $activity.val("");
  $sex.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
