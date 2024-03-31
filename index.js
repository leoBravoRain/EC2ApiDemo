const express = require("express");
const app = express();
const port = 3000;
const AWS = require("aws-sdk");

// Initialize AWS SDK
const ec2Metadata = new AWS.MetadataService();

app.get("/", (req, res) => {
  ec2Metadata.request(
    "/latest/meta-data/placement/availability-zone",
    (err, data) => {
      if (err) {
        console.error("Error fetching instance metadata:", err);
        res.status(500).send("Error fetching instance metadata");
      } else {
        const availabilityZone = data.toString();
        res.send(`Instance is in Availability Zone: ${availabilityZone}`);
      }
    }
  );
});

// Add api should return AZ later

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
