const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "trial",
});

exports.fetch = async function (req, res) {
  const sqlFetch = "SELECT * FROM phonebook";
  db.query(sqlFetch, (data, err) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

exports.insert = async function (req, res) {
  const sqlInsert =
    "INSERT INTO phonebook (`firstName`, `lastName`, `phoneNumber`, `email`) VALUES (?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.phoneNumber,
    req.body.email,
  ];
  db.query(sqlInsert, [values], (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json(result);
  });
};

exports.edit = async function (req, res) {
  const sqlEdit =
    "update phonebook set `firstName` = ?, `lastName` = ?, `phoneNumber` = ?, `email` = ? where ID = ?";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.phoneNumber,
    req.body.email,
  ];
  const id = req.params.id;
  db.query(sqlEdit, [...values, id], (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json(result);
  });
};

exports.deletion = function (req, res) {
  const sqlDelete = "DELETE FROM phonebook WHERE ID = ?";

  const id = req.params.id;
  db.query(sqlDelete, [id], (error, result) => {
    if (error) {
      return res.json(error);
    }
    return res.json(result);
  });
};
