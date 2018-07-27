const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
app.use(bodyParser.text());

app.get("/parrot/:word", function(req, res) {
  res.send(req.params.word);
  res.end();
});

app.get("/secret", function(req, res) {
  res.json({
    parrot_app_service_host: process.env.PARROT_APP_SERVICE_HOST,
    mariadb_service_host: process.env.MARIADB_SERVICE_HOST,
    mariadb_root_password: process.env.MYSQL_ROOT_PASSWORD,
  });
  res.end();
});

app.post("/connect", async function(req, res) {
  let conn, results;

  try {
    conn = await db.pool().getConnection()
    results = await conn.query(req.body);
  } catch (e) {
    res.status(500);
    res.end(e.toString());
  }

  res.json(results);
  res.end();
});

const port = process.env.PORT || 8080;
const host = "0.0.0.0";
console.log(`parrot server listening on http://${host}:${port}`);

app.listen(port, host);
