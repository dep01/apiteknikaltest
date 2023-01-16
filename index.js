const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;

function validate(req) {
  const user_id = req.get("User-id");
  const scope = req.get("Scope");
  let status = {
    code: 400,
    success: false,
    message: "BAD REQUEST",
    data: null,
  };
  if (user_id == undefined || scope == undefined) {
    return status;
  } else {
    if (user_id != "ifabula" || scope != "user") {
      status.code = 401;
      status.message = "UNAUTHORIZED";
      return status;
    } else {
      status.code = 200;
      status.success = true;
      status.message = "success";
      return status;
    }
  }
}

app.get("/data", (req, res) => {
  const response = validate(req);
  if (response.success) {
    response.data = { status: "success", validation: "success" };
    res.status(response.code).json(response);
  } else {
    res.status(response.code).json(response);
  }
});

app.use(bodyParser.json());
app.post("/data", (req, res) => {
  const response = validate(req);
  if (response.success) {
      response.data = req.body;
    // console.log(req);
    res.status(response.code).json(response);
  } else {
    res.status(response.code).json(response);
  }
});
app.listen(port, () => {
  console.log(`apiteknikaltest listening at http://localhost:${port}`);
});
