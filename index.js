const express = require("express");
const app = express();
const port = 3000;
// const AWS = require("aws-sdk");
const http = require('http');
const os = require('os');

// Initialize AWS SDK
// const ec2Metadata = new AWS.MetadataService();

app.get("/", (req, res) => {
    // console.log("trying to access availability zone");
    // console.log(ec2Metadata);
    const hostname = os.hostname();
    // const ipAddress = os.networkInterfaces()['eth0'][0]['address'];
    // res.json({"hostname": hostname, "ipAddress": ipAddress});
    // ec2Metadata.request("/latest/meta-data/placement/availability-zone", (err, data) => {
    res.send(hostname)
    //     if (err) {
    //         console.error("Error fetching instance metadata:", err);
    //         // res.status(500).send("Error fetching instance metadata");
    //         res.status(500).json(err);
    //     } else {
    //         const availabilityZone = data.toString();
    //         console.log("availabilty zone: ", availabilityZone);
    //         res.send(`Instance is in Availability Zone: ${availabilityZone}`);
    //     }
    // });

    http.get('http://169.254.169.254/latest/meta-data/', (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('EC2 Instance Metadata:', data);
        });
    }).on('error', (err) => {
        console.error('Error fetching EC2 instance metadata:', err);
    });

});

app.get("/test", (req, res) => {
    res.status(200).json({response: 'API working'});
});

// Add api should return AZ later
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
