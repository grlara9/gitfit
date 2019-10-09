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


console.log(bmrAct("active"));

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
      var bmr = bmrValue(info.height, info.weight, info.age, info.sex);
      var bmrMod 
      switch(info.goal){
        case "Gain Muscle":
          bmrMod = 1.15;
          break;
        case "Weight Loss":
          bmrMod = .8;
          break;
      }
      // console.log("BMR LOGGING", bmr);
      res.render("example", {
        example: info,
        bmr: bmr,
        test: bmrAct(info.activity, bmr),
        bmrRec: bmrAct(info.activity, bmr) * bmrMod
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

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
