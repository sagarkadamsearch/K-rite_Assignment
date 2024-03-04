const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multer = require('multer');
const csv = require('csv-parser');
const { connection } = require('./db');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// AWS Route 53 configuration
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const route53 = new aws.Route53();

// Routes for CRUD operations

// Create a new DNS record
app.post('/api/domains', async (req, res) => {
  const { domain, type, value } = req.body;

  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: {
            Name: domain,
            Type: type,
            TTL: 60,
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
    HostedZoneId: process.env.AWS_HOSTED_ZONE_ID,
  };

  try {
    const result = await route53.changeResourceRecordSets(params).promise();
    console.log('DNS record created successfully:', result);
    res.status(201).json({ message: 'DNS record created successfully' });
  } catch (error) {
    console.error('Error creating DNS record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch all DNS records
app.get('/api/domains', async (req, res) => {
  // Implement logic to fetch DNS records from AWS Route 53
  // Use route53.listResourceRecordSets(params).promise();
});

// Delete a DNS record
app.delete('/api/domains/:id', async (req, res) => {
  const id = req.params.id;

  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: 'DELETE',
          ResourceRecordSet: {
            // Implement logic to get DNS record details by id
            // Set the appropriate values for Name, Type, etc.
          },
        },
      ],
    },
    HostedZoneId: process.env.AWS_HOSTED_ZONE_ID,
  };

  try {
    const result = await route53.changeResourceRecordSets(params).promise();
    console.log('DNS record deleted successfully:', result);
    res.status(200).json({ message: 'DNS record deleted successfully' });
  } catch (error) {
    console.error('Error deleting DNS record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Bulk upload DNS records from CSV or JSON file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/bulk-upload', upload.single('file'), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file provided' });
  }

  // Implement logic to parse the CSV or JSON file and create/update DNS records
});

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running on port ${port}`);
    console.log(`Database connected`);
  } catch (error) {
    console.log({ Error: error });
  }
});
