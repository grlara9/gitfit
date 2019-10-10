$(document).ready(function() {
  $("#select").on("change", function() {
    // eslint-disable-next-line eqeqeq
    if (this.value == "beginner") {
      $("#beginnerPlan").show();
      $("#intermediatePlan").hide();
      $("#advancedPlan").hide();
    }
    // eslint-disable-next-line eqeqeq
    if (this.value == "intermediate") {
      $("#intermediatePlan").show();
      $("#beginnerPlan").hide();
      $("#advancedPlan").hide();
    }
    // eslint-disable-next-line eqeqeq
    if (this.value == "advanced") {
      $("#advancedPlan").show();
      $("#beginnerPlan").hide();
      $("#intermediatePlan").hide();
    }
  });
});
