const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();

//import image
const image = require("./dataBase");

// for (let i = 18; i <= 26; i++) {
//   console.log(image[Math.floor(i / image.length)][i % image.length]);
// }

const maskPageDefiner = chairNum => {
  return image[Math.floor(+chairNum / image.length)][+chairNum % image.length];
};

app.use(express.json());

const courses = [
  { id: 1, name: "Algorithms" },
  { id: 2, name: "Software Engineering" },
  { id: 3, name: "Human Computer Interaction" }
];

app.get("/", function (req, res) {
  //handling cors error
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);

  //when we get an http get request to the root/homepage
  let maskPage, error;
  if (
    req.query.chairNum > -1 &&
    req.query.chairNum < image.length * image[0].length
  ) {
    maskPage = maskPageDefiner(req.query.chairNum);
    error = "";
  } else {
    maskPage = -1;
    error = "لطفا عدد ورودی را درست وارد نمایید.";
  }
  res.send({ maskPage, error });
});

//when we route to /courses
app.get("/courses", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.send(courses); //respond with the array of courses
});

//To get a specific course, we need to define a parameter id
app.get("/courses/:id", function (req, res) {
  const course = courses.find(c => c.id === parseInt(req.params.id));

  //if the course does not exist return status 404 (not found)
  if (!course)
    return res.status(404).send("The course with the given id was not found");

  //return the object
  res.send(course);
});

//using the http post request we can create a new course
app.post("/courses", function (req, res) {
  //create a course object
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  //add the course to the array
  courses.push(course);

  //return the course
  res.send(course);
});

app.put("/courses/:id", function (req, res) {
  //get the course
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given id was not found");

  //update the course
  course.name = req.body.name;

  //return the updated object
  res.send(course);
});

app.put("/courses/:id", function (req, res) {
  //get the course
  const course = courses.find(c => c.id === parseInt(req.params.id));

  if (!course)
    return res.status(404).send("The course with the given id was not found");

  //update the course
  course.name = req.body.name;

  //returns the updated object
  res.send(course);
});

app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
