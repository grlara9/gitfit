var db = require("../models");

function bmrValue(height, weight, age, sex) {
  if (sex === "female") {
    // eslint-disable-next-line prettier/prettier
    return 655 + 4.35 * parseInt(weight) + 4.7 * parseInt(height) - 4.7 * parseInt(age);
  } else {
    // eslint-disable-next-line prettier/prettier
    return (66 + 6.23 * parseInt(weight) + 12.7 * parseInt(height) - 6.8 * parseInt(age));
  }
}

function bmrAct(activity, bmr) {
  var act;
  switch (activity) {
    case "Sedentary":
      act = 1.2 * bmr;
      break;
    case "Lightly Active":
      act = 1.375 * bmr;
      break;
    case "Moderately Active":
      act = 1.53 * bmr;
      break;
    case "Active":
      act = 1.725 * bmr;
      break;
    case "Very Active":
      act = 1.9 * bmr;
      break;
  }
  return act;
}

function bmrMod(goalFactor) {
  var bmrMod;
  switch (goalFactor) {
    case "Gain Muscle":
      bmrMod = 1.15;
      break;
    case "Weight Loss":
      bmrMod = 0.8;
      break;
    case "Eat Healthy":
      bmrMod = 1;
      break;
  }
  return bmrMod;
}

// console.log(bmrAct("active", 1));

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(info) {
      var basalMetRate = bmrValue(info.height, info.weight, info.age, info.sex);
      var bmrActivity = bmrAct(info.activity, basalMetRate).toFixed(2);
      var bmrRec = (bmrMod(info.goal) * bmrActivity).toFixed(0);
      var protein = Math.round(0.8 * info.weight); //0.8 means grams of protein. We are multiplying by bodyweight to get how many grams of protein they should eat.
      var fat = Math.round((0.25 * bmrRec) / 9); //The calories from fat should be 25% of total goal calories. You then need to divide by 9 in order to get the grams of fat they should eat.
      var carbs = Math.round((bmrRec - protein * 4 - fat * 9) / 4); //The remaining macro is carbs. We just subtract the amount of calories from protein AND fat from the total goal calories. We then divide by 4 to get the amount of carbs in grams.
      console.log(info.activity);
      console.log(basalMetRate);
      res.render("example", {
        example: info,
        bmr: basalMetRate,
        bmrAct: bmrActivity,
        bmrRec: bmrRec,
        proteins: protein,
        fats: fat,
        carbz: carbs
      });
    });
    // db.Example.findAll({ where: { id: req.params.id } }).then(function(info) {
    //   console.log(info);
    //   var activityLevel = info[0].dataValues.activity;
    //   console.log("Activity Level: " + activityLevel);
    //   var height = info[0].dataValues.height;
    //   console.log("Height: " + height);
    //   var weight = info[0].dataValues.weight;
    //   console.log("Weight: " + weight);
    //   var age = info[0].dataValues.age;
    //   console.log("Age: " + age);
    //   var sex = info[0].dataValues.sex;
    //   console.log("Sex: " + sex);
    //   res.render("example", {
    //     test: height
    //   });
    // });
  });

  app.get("/workout", function(req, res) {
    res.render("workout", {
      workout: "Workout"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
