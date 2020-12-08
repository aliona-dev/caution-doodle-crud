const express = require("express");
const bodyParser = require("body-parser");
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.listen(process.env.PORT || 4000);

const employees = []; //=> [{fName: "Matt", lName: "Doe", email: "doe@gmail.com", role: "sde", eId: "12345" }]

//body=>{name: "Matt"}
//const student = [];
// server.post("/employees", (req, res) => {
//   //varification
//   if (req.body.name !== undefined && typeof req.body.name === "string") {
//     students.push(req.body.name);
//     res.send(students);
//   } else {
//     res.status(404).send("error need valid name parameters");
//   }
// });

server.post("/employees", (req, res) => {
  //varification
  // if (req.body.name !== undefined && typeof req.body.name === "string") {
  employees.push(req.body);
  res.send(employees);
});

//route to return list of all employees.
server.get("/employees", (req, res) => {
  res.send(employees);
});
//route to return employees by role.
server.get("/employees/:role", (req, res) => {
  const role = req.params.role;
  const results = employees.filter(
    (emp) => emp.role.toUpperCase() === role.toUpperCase()
  );
  res.send(results);
});
//route to return employees by id.
server.get("/employees/:id", (req, res) => {
  const id = req.params.id;
  const results = employees.filter(
    (emp) => emp.eId.toUpperCase() === id.toUpperCase()
  );
  res.send(results);
});
//route to change employees info by an id.
server.put("/employees/:id", (req, res) => {
  const id = req.params.id;
  const employee = req.body;
  let results = employees.filter((emp) => emp.eId === id);
  if (employee.fName !== underfined) {
    results[0].fName = employee.fName;
  } else if (employee.fName !== underfined) {
    results[0].fName = employee.lName;
  } else if (employee.email !== underfined) {
    results[0].email = employee.email;
  } else if (employee.role !== underfined) {
    results[0].role = employee.role;
  } else {
    res.status(404).send("error not valid parameters");
  }
  res.send(results[0]);
});
//route to delete an employee by an id.
server.delete("/employees/:id", (req, res) => {
  const id = req.params.id;
  let empIdx = -1;
  employees.map((emp, idx) => {
    if (emp.eId === id) {
      empIdx = idx;
      return;
    }
  });
  if (empIdx === -1) {
    return res.status(404).send("Employee not found");
  }
  employees.splice(empIdx, 1);
  res.send({ success: "Success" });
});
