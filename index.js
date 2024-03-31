const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    name: "Leo",
    lastName: "Brave",
  });
});

// Add api should return AZ later

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
