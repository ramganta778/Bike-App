// //membership form

// // Import Dependencies
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Initialize Express App
// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB Connection
// const mongoURI = "mongodb://localhost:27017/membershipDB";
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("Failed to connect to MongoDB", err));

// // Membership Schema and Model
// const membershipSchema = new mongoose.Schema({
//   plan: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   rcNumber: { type: String },
//   aadharNumber: { type: String },
//   state: { type: String, required: true },
//   district: { type: String, required: true },
//   address: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Membership = mongoose.model("Membership", membershipSchema);

// // Routes

// // Health Check Route
// app.get("/", (req, res) => {
//   res.send("Membership API is running!");
// });

// // Submit Membership Form
// app.post("/subscribe", async (req, res) => {
//   try {
//     const membershipData = req.body;

//     // Validate Input
//     if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
//       return res.status(400).json({ message: "All required fields must be filled." });
//     }

//     // Create and Save Membership
//     const newMembership = new Membership(membershipData);
//     await newMembership.save();

//     res.status(201).json({ message: "Membership subscribed successfully!", data: newMembership });
//   } catch (error) {
//     console.error("Error saving membership:", error);
//     res.status(500).json({ message: "Server Error: Unable to process request." });
//   }
// });

// // Fetch All Memberships (For Admin View)
// app.get("/memberships", async (req, res) => {
//   try {
//     const memberships = await Membership.find();
//     res.status(200).json(memberships);
//   } catch (error) {
//     console.error("Error fetching memberships:", error);
//     res.status(500).json({ message: "Server Error: Unable to fetch memberships." });
//   }
// });

// // Start the Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// //membership form











// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Bike Schema and Model
// const bikeSchema = new mongoose.Schema({
//   image: String, // Image URL
//   model: String,
//   price: Number,
//   company: String,
//   name: String,
//   phone: String,
// });
// const Bike = mongoose.model('Bike', bikeSchema);

// // Multer Configuration for Image Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Set destination folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filename
//   },
// });
// const upload = multer({ storage });

// // Routes

// // Add a Bike
// app.post('/add-bike', upload.single('image'), async (req, res) => {
//   try {
//     const { model, price, company, name, phone } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save image URL
//     const newBike = new Bike({
//       image: imageUrl,
//       model,
//       price,
//       company,
//       name,
//       phone,
//     });
//     await newBike.save();
//     res.status(201).json({ message: 'Bike added successfully!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add bike' });
//   }
// });

// // Get All Bikes
// app.get('/bikes', async (req, res) => {
//   try {
//     const bikes = await Bike.find();
//     res.status(200).json(bikes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch bikes' });
//   }
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
















// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Create uploads folder if it doesn't exist
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Bike Schema and Model
// const bikeSchema = new mongoose.Schema({
//   image: String, // Image URL
//   model: String,
//   price: Number,
//   company: String,
//   name: String,
//   phone: String,
// });
// const Bike = mongoose.model('Bike', bikeSchema);

// // Multer Configuration for Image Uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); // Set destination folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`); // Generate unique filename
//   },
// });
// const upload = multer({ storage });

// // Routes

// // Add a Bike
// app.post('/add-bike', upload.single('image'), async (req, res) => {
//   try {
//     const { model, price, company, name, phone } = req.body;
//     const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; // Save image URL
//     const newBike = new Bike({
//       image: imageUrl,
//       model,
//       price,
//       company,
//       name,
//       phone,
//     });
//     await newBike.save();
//     res.status(201).json({ message: 'Bike added successfully!', bike: newBike });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to add bike' });
//   }
// });

// // Get All Bikes
// app.get('/bikes', async (req, res) => {
//   try {
//     const bikes = await Bike.find();
//     res.status(200).json(bikes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to fetch bikes' });
//   }
// });

// // Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });






// //aws images storing

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const multer = require("multer");
// const aws = require("aws-sdk");
// const bodyParser = require("body-parser");

// // MongoDB connection
// mongoose
//   .connect("mongodb://localhost:27017/bikeMarket", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Schema
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // Store S3 URL here
// });

// const Bike = mongoose.model("Bike", bikeSchema);

// // AWS S3 configuration
// const s3 = new aws.S3({
//   accessKeyId: "AKIAVFIWI5HRDEYL32MA",
//   secretAccessKey: "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",
//   region: "us-east-1",
// });

// // Multer setup for S3
// const upload = multer({
//   storage: multer.memoryStorage(), // Use memory storage for temporary file storage
// });

// // Express app setup
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // API routes
// app.post("/api/bikes", upload.single("image"), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ success: false, message: "Image upload failed" });
//     }

//     // Upload image to S3
//     const params = {
//       Bucket: "bike-profile", // S3 bucket name
//       Key: `${Date.now()}_${req.file.originalname}`, // Unique file name
//       Body: req.file.buffer,
//       ContentType: req.file.mimetype,
//       ACL: "public-read", // Make the file publicly readable
//     };

//     const uploadResult = await s3.upload(params).promise();

//     // Save bike details with S3 URL in MongoDB
//     const newBike = new Bike({
//       bikeModel,
//       companyName,
//       price,
//       imageUrl: uploadResult.Location, // S3 URL
//     });

//     await newBike.save();
//     res.status(200).json({ success: true, message: "Bike details saved successfully" });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error", error });
//   }
// });

// // Start server
// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// //aws images storing





// //getting image
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const port = 5000;

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/bikeMarket', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// // Define the bike schema
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imagePath: String // path to the image stored in the uploads folder
// });

// const Bike = mongoose.model('Bike', bikeSchema);

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve images from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/api/bikes', async (req, res) => {
//   try {
//     const bikes = await Bike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bikes', error: err });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// //getting image













// //getting images from aws 
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const app = express();
// const port = 5000;

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.log('MongoDB connection error:', err));

// // Define the bike schema
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // Full S3 URL for the image
// });

// const Bike = mongoose.model('Bike', bikeSchema);

// // Middleware
// app.use(cors());
// app.use(express.json());

// // AWS S3 setup
// const s3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA', // Replace with actual AWS access key
//     secretAccessKey: '3oFdS7xJhl/32P1invR5xV1sTnmLkaL4zbFWH6to', // Replace with actual secret access key
//   },
// });

// // Fetch all bikes
// app.get('/api/bikes', async (req, res) => {
//   try {
//     const bikes = await Bike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching bikes', error: err });
//   }
// });

// // Add a bike and upload image to S3
// app.post('/api/bikes', async (req, res) => {
//   const { bikeModel, companyName, price, imageFile } = req.body;

//   if (!imageFile) {
//     return res.status(400).json({ message: 'Image file is required.' });
//   }

//   // Upload the image to S3
//   const uploadParams = {
//     Bucket: 'bike-profile', // Your S3 bucket name
//     Key: `uploads/${Date.now()}_${imageFile.name}`,
//     Body: Buffer.from(imageFile.base64, 'base64'),
//     ContentType: imageFile.type,
//   };

//   try {
//     // Upload image to S3
//     const uploadResult = await s3.send(new PutObjectCommand(uploadParams));

//     // Construct the S3 URL
//     const imagePath = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;

//     // Save bike details in MongoDB
//     const bike = new Bike({ bikeModel, companyName, price, imagePath });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully.', bike });
//   } catch (error) {
//     console.error('Error uploading to S3:', error);
//     res.status(500).json({ message: 'Error uploading bike.', error });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });


// //getting images from aws 











// //aws image storing

// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 5000;

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/bikeMarket', { 
//   useNewUrlParser: true, 
//   useUnifiedTopology: true 
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Define the Bike schema
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // URL of the image stored in S3
// });

// const Bike = mongoose.model('Bike', bikeSchema);

// // AWS S3 Client
// const s3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Upload and save bike details
// app.post('/api/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ success: false, message: 'Image file is required.' });
//     }

//     // Prepare file for S3 upload
//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'bike-profile',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     // Upload to S3
//     const result = await s3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3:', result);

//     // Remove local file after upload
//     fs.unlinkSync(file.path);

//     // Save bike details in MongoDB
//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new Bike({
//       bikeModel,
//       companyName,
//       price,
//       imageUrl,
//     });
//     await bike.save();

//     res.status(201).json({ success: true, message: 'Bike uploaded successfully.', bike });
//   } catch (error) {
//     console.error('Error uploading bike:', error);
//     res.status(500).json({ success: false, message: 'Error uploading bike.', error });
//   }
// });

// // Get all bikes
// app.get('/api/bikes', async (req, res) => {
//   try {
//     const bikes = await Bike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes.', error: err });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });





// //aws image storing
























// both sell and spareparts

// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 5000;

// // MongoDB connections
// mongoose.connect('mongodb://localhost:27017/spareparts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB - spareparts'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// const bikeMarketConnection = mongoose.createConnection('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// bikeMarketConnection.on('connected', () => {
//   console.log('Connected to MongoDB - bikeMarket');
// });

// bikeMarketConnection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Define the Bike schema
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // URL of the image stored in S3
// });

// const SparePartsBike = mongoose.model('SparePartsBike', bikeSchema);
// const BikeMarketBike = bikeMarketConnection.model('BikeMarketBike', bikeSchema);

// // AWS S3 Clients
// const sparePartsS3 = new S3Client({
//   region: 'us-west-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// const bikeMarketS3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Upload and save bike details to spareparts database and bucket
// app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ success: false, message: 'Image file is required.' });
//     }

//     // Prepare file for S3 upload
//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'spare-parts',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     // Upload to S3
//     const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (spare-parts):', result);

//     // Remove local file after upload
//     fs.unlinkSync(file.path);

//     // Save bike details in MongoDB
//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new SparePartsBike({
//       bikeModel,
//       companyName,
//       price,
//       imageUrl,
//     });
//     await bike.save();

//     res.status(201).json({ success: true, message: 'Bike uploaded successfully to spareparts.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to spareparts:', error);
//     res.status(500).json({ success: false, message: 'Error uploading bike to spareparts.', error });
//   }
// });

// // Upload and save bike details to bikeMarket database and bucket
// app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ success: false, message: 'Image file is required.' });
//     }

//     // Prepare file for S3 upload
//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'bike-profile',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     // Upload to S3
//     const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (bike-profile):', result);

//     // Remove local file after upload
//     fs.unlinkSync(file.path);

//     // Save bike details in MongoDB
//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new BikeMarketBike({
//       bikeModel,
//       companyName,
//       price,
//       imageUrl,
//     });
//     await bike.save();

//     res.status(201).json({ success: true, message: 'Bike uploaded successfully to bikeMarket.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to bikeMarket:', error);
//     res.status(500).json({ success: false, message: 'Error uploading bike to bikeMarket.', error });
//   }
// });

// // Get all bikes from spareparts
// app.get('/api/spareparts/bikes', async (req, res) => {
//   try {
//     const bikes = await SparePartsBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from spareparts.', error: err });
//   }
// });

// // Get all bikes from bikeMarket
// app.get('/api/bikemarket/bikes', async (req, res) => {
//   try {
//     const bikes = await BikeMarketBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from bikeMarket.', error: err });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// both sell and spareparts



// //3 items 

// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');

// const app = express();
// const port = 5000;

// // MongoDB connections
// mongoose.connect('mongodb://localhost:27017/spareparts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => console.log('Connected to MongoDB - spareparts'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// const bikeMarketConnection = mongoose.createConnection('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const membershipDBConnection = mongoose.createConnection('mongodb://localhost:27017/membershipDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// bikeMarketConnection.on('connected', () => {
//   console.log('Connected to MongoDB - bikeMarket');
// });

// membershipDBConnection.on('connected', () => {
//   console.log('Connected to MongoDB - membershipDB');
// });

// bikeMarketConnection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// membershipDBConnection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Bike schema
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // URL of the image stored in S3
// });

// const SparePartsBike = mongoose.model('SparePartsBike', bikeSchema);
// const BikeMarketBike = bikeMarketConnection.model('BikeMarketBike', bikeSchema);

// // Membership schema
// const membershipSchema = new mongoose.Schema({
//   plan: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   rcNumber: { type: String },
//   aadharNumber: { type: String },
//   state: { type: String, required: true },
//   district: { type: String, required: true },
//   address: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Membership = membershipDBConnection.model('Membership', membershipSchema);

// // AWS S3 Clients
// const sparePartsS3 = new S3Client({
//   region: 'us-west-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// const bikeMarketS3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Upload and save bike details to spareparts database and bucket
// app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ success: false, message: 'Image file is required.' });
//     }

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'spare-parts',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (spare-parts):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new SparePartsBike({
//       bikeModel,
//       companyName,
//       price,
//       imageUrl,
//     });
//     await bike.save();

//     res.status(201).json({ success: true, message: 'Bike uploaded successfully to spareparts.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to spareparts:', error);
//     res.status(500).json({ success: false, message: 'Error uploading bike to spareparts.', error });
//   }
// });

// // Upload and save bike details to bikeMarket database and bucket
// app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ success: false, message: 'Image file is required.' });
//     }

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'bike-profile',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (bike-profile):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new BikeMarketBike({
//       bikeModel,
//       companyName,
//       price,
//       imageUrl,
//     });
//     await bike.save();

//     res.status(201).json({ success: true, message: 'Bike uploaded successfully to bikeMarket.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to bikeMarket:', error);
//     res.status(500).json({ success: false, message: 'Error uploading bike to bikeMarket.', error });
//   }
// });

// // Get all bikes from spareparts
// app.get('/api/spareparts/bikes', async (req, res) => {
//   try {
//     const bikes = await SparePartsBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from spareparts.', error: err });
//   }
// });

// // Get all bikes from bikeMarket
// app.get('/api/bikemarket/bikes', async (req, res) => {
//   try {
//     const bikes = await BikeMarketBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from bikeMarket.', error: err });
//   }
// });

// // Membership Routes
// app.get("/", (req, res) => {
//   res.send("Membership API is running!");
// });

// app.post("/subscribe", async (req, res) => {
//   try {
//     const membershipData = req.body;

//     if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
//       return res.status(400).json({ message: "All required fields must be filled." });
//     }

//     const newMembership = new Membership(membershipData);
//     await newMembership.save();

//     res.status(201).json({ message: "Membership subscribed successfully!", data: newMembership });
//   } catch (error) {
//     console.error("Error saving membership:", error);
//     res.status(500).json({ message: "Server Error: Unable to process request." });
//   }
// });

// app.get("/memberships", async (req, res) => {
//   try {
//     const memberships = await Membership.find();
//     res.status(200).json(memberships);
//   } catch (error) {
//     console.error("Error fetching memberships:", error);
//     res.status(500).json({ message: "Server Error: Unable to fetch memberships." });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// //3 items





// // 4 databases

// // Import necessary modules
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // MongoDB Connections
// const userDBConnection = mongoose.createConnection('mongodb://localhost:27017/user', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const sparepartsDBConnection = mongoose.createConnection('mongodb://localhost:27017/spareparts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const bikeMarketDBConnection = mongoose.createConnection('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const membershipDBConnection = mongoose.createConnection('mongodb://localhost:27017/membershipDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Test MongoDB connections
// userDBConnection.on('connected', () => console.log('Connected to MongoDB - userDB'));
// sparepartsDBConnection.on('connected', () => console.log('Connected to MongoDB - sparepartsDB'));
// bikeMarketDBConnection.on('connected', () => console.log('Connected to MongoDB - bikeMarketDB'));
// membershipDBConnection.on('connected', () => console.log('Connected to MongoDB - membershipDB'));

// // MongoDB connection errors
// userDBConnection.on('error', (err) => console.error('MongoDB userDB connection error:', err));
// sparepartsDBConnection.on('error', (err) => console.error('MongoDB sparepartsDB connection error:', err));
// bikeMarketDBConnection.on('error', (err) => console.error('MongoDB bikeMarketDB connection error:', err));
// membershipDBConnection.on('error', (err) => console.error('MongoDB membershipDB connection error:', err));

// // AWS S3 Clients
// const sparePartsS3 = new S3Client({
//   region: 'us-west-1',
//   credentials: {
//  accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//  secretAccessKey: '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',
//   },
// });

// const bikeMarketS3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//  accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//  secretAccessKey: '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',
//   },
// });

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'user' },
// });
// const User = userDBConnection.model('User', userSchema);

// // Bike schema for spareparts and bike market
// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // URL of the image stored in S3
// });
// const SparePartsBike = sparepartsDBConnection.model('SparePartsBike', bikeSchema);
// const BikeMarketBike = bikeMarketDBConnection.model('BikeMarketBike', bikeSchema);

// // Membership schema
// const membershipSchema = new mongoose.Schema({
//   plan: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   rcNumber: { type: String },
//   aadharNumber: { type: String },
//   state: { type: String, required: true },
//   district: { type: String, required: true },
//   address: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
// const Membership = membershipDBConnection.model('Membership', membershipSchema);

// // Register Endpoint (User)
// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, phone, address, password } = req.body;
//   if (!firstName || !lastName || !email || !phone || !address || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newUser = new User({ firstName, lastName, email, phone, address, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }
//     console.error('Registration Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Login Endpoint (User)
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Bike Upload Endpoint for spareparts
// app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: 'Image file is required.' });

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'spare-parts',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (spare-parts):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new SparePartsBike({ bikeModel, companyName, price, imageUrl });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully to spareparts.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to spareparts:', error);
//     res.status(500).json({ message: 'Error uploading bike to spareparts.', error });
//   }
// });

// // Bike Upload Endpoint for bikeMarket
// app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: 'Image file is required.' });

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'bike-profile',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (bike-profile):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new BikeMarketBike({ bikeModel, companyName, price, imageUrl });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully to bikeMarket.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to bikeMarket:', error);
//     res.status(500).json({ message: 'Error uploading bike to bikeMarket.', error });
//   }
// });


// // Get all bikes from spareparts
// app.get('/api/spareparts/bikes', async (req, res) => {
//   try {
//     const bikes = await SparePartsBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from spareparts.', error: err });
//   }
// });


// // Get all bikes from bikeMarket
// app.get('/api/bikemarket/bikes', async (req, res) => {
//   try {
//     const bikes = await BikeMarketBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from bikeMarket.', error: err });
//   }
// });


// // Membership Routes
// app.get("/", (req, res) => {
//   res.send("Membership API is running!");
// });


// // Membership Routes
// app.post('/subscribe', async (req, res) => {
//   try {
//     const membershipData = req.body;
//     if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
//       return res.status(400).json({ message: "All required fields must be filled." });
//     }

//     const newMembership = new Membership(membershipData);
//     await newMembership.save();

//     res.status(201).json({ message: "Membership subscribed successfully!", data: newMembership });
//   } catch (error) {
//     console.error("Error saving membership:", error);
//     res.status(500).json({ message: "Server Error: Unable to process request." });
//   }
// });

// app.get("/memberships", async (req, res) => {
//   try {
//     const memberships = await Membership.find();
//     res.status(200).json(memberships);
//   } catch (error) {
//     console.error("Error fetching memberships:", error);
//     res.status(500).json({ message: "Server Error: Unable to fetch memberships." });
//   }
// });


// // // Logout Endpoint
// app.post('/logout', async (req, res) => {
//   // If you're using sessions:
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error during logout:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//       res.status(200).json({ message: 'Logged out successfully' });
//     });
//   } else {
//     // If not using sessions, just return a success message
//     res.status(200).json({ message: 'Logged out successfully' });
//   }
// });


// // GET Endpoint to Fetch User Details - Assuming you provide the email or ID as a query param
// app.get('/user-details', async (req, res) => {
//   const { email } = req.query;  // Get email from query parameters

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// // Start the server
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// // 4 databases







// //login

// // Import necessary modules
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// const mongoURI = 'mongodb://localhost:27017/user'; // Replace with your MongoDB URI
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true, // Parses connection string correctly
//   useUnifiedTopology: true, // Ensures the use of the new MongoDB connection management engine
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'user' },
// });

// const User = mongoose.model('User', userSchema);

// // Register Endpoint
// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, phone, address, password } = req.body;

//   // Validate required fields
//   if (!firstName || !lastName || !email || !phone || !address || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newUser = new User({ firstName, lastName, email, phone, address, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     if (error.code === 11000) {
//       // Duplicate email error
//       res.status(400).json({ message: 'User with this email already exists' });
//     } else {
//       console.error('Registration Error:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   }
// });

// // Login Endpoint
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   // Validate required fields
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // GET Endpoint to Fetch User Details - Assuming you provide the email or ID as a query param
// app.get('/user-details', async (req, res) => {
//   const { email } = req.query;  // Get email from query parameters

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// // // Logout Endpoint
// app.post('/logout', async (req, res) => {
//   // If you're using sessions:
//   if (req.session) {
//     req.session.destroy((err) => {
//       if (err) {
//         console.error('Error during logout:', err);
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//       res.status(200).json({ message: 'Logged out successfully' });
//     });
//   } else {
//     // If not using sessions, just return a success message
//     res.status(200).json({ message: 'Logged out successfully' });
//   }
// });
// app.post('/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     // Generate reset token and send email with link
//     const resetToken = generateResetToken(); // Implement token generation logic
//     await sendResetPasswordEmail(user.email, resetToken); // Send the reset link
//     res.send({ success: true });
//   } else {
//     res.status(400).send({ error: 'Email not found' });
//   }
// });




// // Start the server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });






// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // MongoDB Connections
// const userDBConnection = mongoose.createConnection('mongodb://localhost:27017/user', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const sparepartsDBConnection = mongoose.createConnection('mongodb://localhost:27017/spareparts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const bikeMarketDBConnection = mongoose.createConnection('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const membershipDBConnection = mongoose.createConnection('mongodb://localhost:27017/membershipDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose
//   .connect('mongodb://localhost:27017/bikeStore', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to bikeStore MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Test MongoDB connections
// userDBConnection.on('connected', () => console.log('Connected to MongoDB - userDB'));
// sparepartsDBConnection.on('connected', () => console.log('Connected to MongoDB - sparepartsDB'));
// bikeMarketDBConnection.on('connected', () => console.log('Connected to MongoDB - bikeMarketDB'));
// membershipDBConnection.on('connected', () => console.log('Connected to MongoDB - membershipDB'));

// // MongoDB connection errors
// userDBConnection.on('error', (err) => console.error('MongoDB userDB connection error:', err));
// sparepartsDBConnection.on('error', (err) => console.error('MongoDB sparepartsDB connection error:', err));
// bikeMarketDBConnection.on('error', (err) => console.error('MongoDB bikeMarketDB connection error:', err));
// membershipDBConnection.on('error', (err) => console.error('MongoDB membershipDB connection error:', err));

// // AWS S3 Clients
// const sparePartsS3 = new S3Client({
//   region: 'us-west-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// const bikeMarketS3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Define Schemas
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'user' },
// });
// const User = userDBConnection.model('User', userSchema);

// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // URL of the image stored in S3
// });
// const SparePartsBike = sparepartsDBConnection.model('SparePartsBike', bikeSchema);
// const BikeMarketBike = bikeMarketDBConnection.model('BikeMarketBike', bikeSchema);

// const membershipSchema = new mongoose.Schema({
//   plan: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   rcNumber: { type: String },
//   aadharNumber: { type: String },
//   state: { type: String, required: true },
//   district: { type: String, required: true },
//   address: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
// const Membership = membershipDBConnection.model('Membership', membershipSchema);

// const purchaseSchema = new mongoose.Schema({
//   userId: String,
//   bikeDetails: {
//     imageUrl: String,
//     companyName: String,
//     price: String,
//   },
//   purchaseDate: { type: Date, default: Date.now },
// });
// const Purchase = mongoose.model('Purchase', purchaseSchema);

// // Endpoints
// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, phone, address, password } = req.body;
//   if (!firstName || !lastName || !email || !phone || !address || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newUser = new User({ firstName, lastName, email, phone, address, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }
//     console.error('Registration Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: 'Image file is required.' });

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'spare-parts',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (spare-parts):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new SparePartsBike({ bikeModel, companyName, price, imageUrl });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully to spareparts.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to spareparts:', error);
//     res.status(500).json({ message: 'Error uploading bike to spareparts.', error });
//   }
// });

// app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: 'Image file is required.' });

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'bike-profile',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (bike-profile):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new BikeMarketBike({ bikeModel, companyName, price, imageUrl });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully to bikeMarket.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to bikeMarket:', error);
//     res.status(500).json({ message: 'Error uploading bike to bikeMarket.', error });
//   }
// });

// app.get('/api/spareparts/bikes', async (req, res) => {
//   try {
//     const bikes = await SparePartsBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from spareparts.', error: err });
//   }
// });

// app.get('/api/bikemarket/bikes', async (req, res) => {
//   try {
//     const bikes = await BikeMarketBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from bikeMarket.', error: err });
//   }
// });

// app.post('/api/user/purchase', async (req, res) => {
//   const { userId, bikeDetails } = req.body;
//   if (!userId || !bikeDetails) {
//     return res.status(400).send({ message: 'Invalid data' });
//   }

//   try {
//     const purchase = new Purchase({ userId, bikeDetails });
//     await purchase.save();
//     res.send({ message: 'Purchase successful!' });
//   } catch (error) {
//     res.status(500).send({ message: 'Error saving purchase', error });
//   }
// });

// app.post('/subscribe', async (req, res) => {
//   try {
//     const membershipData = req.body;
//     if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const newMembership = new Membership(membershipData);
//     await newMembership.save();

//     res.status(201).json({ message: 'Membership subscribed successfully!', data: newMembership });
//   } catch (error) {
//     console.error('Error saving membership:', error);
//     res.status(500).json({ message: 'Server Error: Unable to process request.' });
//   }
// });

// app.get('/memberships', async (req, res) => {
//   try {
//     const memberships = await Membership.find();
//     res.status(200).json(memberships);
//   } catch (error) {
//     console.error('Error fetching memberships:', error);
//     res.status(500).json({ message: 'Server Error: Unable to fetch memberships.' });
//   }
// });

// // GET Endpoint to Fetch User Details - Assuming you provide the email or ID as a query param
// app.get('/user-details', async (req, res) => {
//   const { email } = req.query;  // Get email from query parameters

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });









































// Most Important Code 

// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const bodyParser = require('body-parser');

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // MongoDB Connections
// const userDBConnection = mongoose.createConnection('mongodb://localhost:27017/user', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const sparepartsDBConnection = mongoose.createConnection('mongodb://localhost:27017/spareparts', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const bikeMarketDBConnection = mongoose.createConnection('mongodb://localhost:27017/bikeMarket', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const membershipDBConnection = mongoose.createConnection('mongodb://localhost:27017/membershipDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose
//   .connect('mongodb://localhost:27017/bikeStore', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to bikeStore MongoDB'))
//   .catch((err) => console.error('MongoDB connection error:', err));

// // Test MongoDB connections
// userDBConnection.on('connected', () => console.log('Connected to MongoDB - userDB'));
// sparepartsDBConnection.on('connected', () => console.log('Connected to MongoDB - sparepartsDB'));
// bikeMarketDBConnection.on('connected', () => console.log('Connected to MongoDB - bikeMarketDB'));
// membershipDBConnection.on('connected', () => console.log('Connected to MongoDB - membershipDB'));

// // MongoDB connection errors
// userDBConnection.on('error', (err) => console.error('MongoDB userDB connection error:', err));
// sparepartsDBConnection.on('error', (err) => console.error('MongoDB sparepartsDB connection error:', err));
// bikeMarketDBConnection.on('error', (err) => console.error('MongoDB bikeMarketDB connection error:', err));
// membershipDBConnection.on('error', (err) => console.error('MongoDB membershipDB connection error:', err));

// // AWS S3 Clients
// const sparePartsS3 = new S3Client({
//   region: 'us-west-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// const bikeMarketS3 = new S3Client({
//   region: 'us-east-1',
//   credentials: {
//     accessKeyId: 'AKIAVFIWI5HRDEYL32MA',
//     secretAccessKey: '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',
//   },
// });

// // Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// // Define Schemas
// const userSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   address: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, default: 'user' },
// });
// const User = userDBConnection.model('User', userSchema);

// const bikeSchema = new mongoose.Schema({
//   bikeModel: String,
//   companyName: String,
//   price: String,
//   imageUrl: String, // URL of the image stored in S3
// });
// const SparePartsBike = sparepartsDBConnection.model('SparePartsBike', bikeSchema);
// const BikeMarketBike = bikeMarketDBConnection.model('BikeMarketBike', bikeSchema);

// const membershipSchema = new mongoose.Schema({
//   plan: { type: String, required: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: String, required: true },
//   rcNumber: { type: String },
//   aadharNumber: { type: String },
//   state: { type: String, required: true },
//   district: { type: String, required: true },
//   address: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });
// const Membership = membershipDBConnection.model('Membership', membershipSchema);

// const purchaseSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   userDetails: {
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//   },
//   bikeDetails: {
//     imageUrl: { type: String, required: true },
//     companyName: { type: String, required: true },
//     price: { type: String, required: true },
//   },
//   purchaseDate: { type: Date, default: Date.now },
// });


// const Purchase = mongoose.model('Purchase', purchaseSchema);



// // const purchaseSchema = new mongoose.Schema({
// //   userId: { type: String, required: true },
// //   userDetails: {
// //     firstName: { type: String, required: true },
// //     lastName: { type: String, required: true },
// //     email: { type: String, required: true },
// //     phone: { type: String, required: true },
// //   },
// //   bikeDetails: {
// //     imageUrl: { type: String, required: true },
// //     companyName: { type: String, required: true },
// //     price: { type: String, required: true },
// //   },
// //   purchaseDate: { type: Date, default: Date.now },
// // });

// // const Purchase = mongoose.model('Purchase', purchaseSchema);



// // Endpoints
// app.post('/register', async (req, res) => {
//   const { firstName, lastName, email, phone, address, password } = req.body;
//   if (!firstName || !lastName || !email || !phone || !address || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   try {
//     const newUser = new User({ firstName, lastName, email, phone, address, password });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'User with this email already exists' });
//     }
//     console.error('Registration Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
//   } catch (error) {
//     console.error('Login Error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: 'Image file is required.' });

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'spare-parts',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (spare-parts):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new SparePartsBike({ bikeModel, companyName, price, imageUrl });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully to spareparts.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to spareparts:', error);
//     res.status(500).json({ message: 'Error uploading bike to spareparts.', error });
//   }
// });

// app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
//   try {
//     const { bikeModel, companyName, price } = req.body;
//     const file = req.file;
//     if (!file) return res.status(400).json({ message: 'Image file is required.' });

//     const fileStream = fs.createReadStream(file.path);
//     const uploadParams = {
//       Bucket: 'bike-profile',
//       Key: `uploads/${Date.now()}_${file.originalname}`,
//       Body: fileStream,
//       ContentType: file.mimetype,
//     };

//     const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
//     console.log('File uploaded to S3 (bike-profile):', result);

//     fs.unlinkSync(file.path);

//     const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
//     const bike = new BikeMarketBike({ bikeModel, companyName, price, imageUrl });
//     await bike.save();

//     res.status(201).json({ message: 'Bike uploaded successfully to bikeMarket.', bike });
//   } catch (error) {
//     console.error('Error uploading bike to bikeMarket:', error);
//     res.status(500).json({ message: 'Error uploading bike to bikeMarket.', error });
//   }
// });

// app.get('/api/spareparts/bikes', async (req, res) => {
//   try {
//     const bikes = await SparePartsBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from spareparts.', error: err });
//   }
// });

// app.get('/api/bikemarket/bikes', async (req, res) => {
//   try {
//     const bikes = await BikeMarketBike.find();
//     res.json(bikes);
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Error fetching bikes from bikeMarket.', error: err });
//   }
// });

// app.post('/api/user/purchase', async (req, res) => {
//   const { userDetails, bikeDetails } = req.body;

//   console.log('Received Purchase Request:', req.body); // Debugging: Log the incoming data

//   // Check if data is complete
//   if (!userDetails || !bikeDetails) {
//     console.error('Invalid request data:', req.body);
//     return res.status(400).json({ message: 'Invalid request data' });
//   }

//   try {
//     const purchase = new Purchase({
//       userId: userDetails.email, // Use email as userId
//       userDetails: {
//         firstName: userDetails.firstName,
//         lastName: userDetails.lastName,
//         email: userDetails.email,
//         phone: userDetails.phone,
//       },
//       bikeDetails,
//     });

//     await purchase.save();

//     res.status(201).json({ message: 'Purchase successful!' });
//   } catch (error) {
//     console.error('Error saving purchase:', error); // Log the full error
//     res.status(500).json({ message: 'Error saving purchase', error });
//   }
// });



// // Fetch Orders by Email
// // Define Orders Endpoint to Fetch User's Purchases
// // Endpoint to get user orders based on email
// app.get('/api/user/orders', async (req, res) => {
//   const email = req.query.email;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const orders = await Purchase.find({ 'userDetails.email': email });

//     if (!orders.length) {
//       return res.status(404).json({ message: 'No orders found for this email' });
//     }

//     res.status(200).json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ message: 'Failed to fetch orders', error });
//   }
// });


// // API endpoint to fetch all purchases
// app.get('/admin/purchases', async (req, res) => {
//   try {
//     const purchases = await Purchase.find();
//     res.status(200).json(purchases);
//   } catch (error) {
//     console.error('Error fetching purchase details:', error);
//     res.status(500).json({ error: 'Failed to fetch purchase details' });
//   }
// });


// app.post('/subscribe', async (req, res) => {
//   try {
//     const membershipData = req.body;
//     if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
//       return res.status(400).json({ message: 'All required fields must be filled.' });
//     }

//     const newMembership = new Membership(membershipData);
//     await newMembership.save();

//     res.status(201).json({ message: 'Membership subscribed successfully!', data: newMembership });
//   } catch (error) {
//     console.error('Error saving membership:', error);
//     res.status(500).json({ message: 'Server Error: Unable to process request.' });
//   }
// });

// app.get('/memberships', async (req, res) => {
//   try {
//     const memberships = await Membership.find();
//     res.status(200).json(memberships);
//   } catch (error) {
//     console.error('Error fetching memberships:', error);
//     res.status(500).json({ message: 'Server Error: Unable to fetch memberships.' });
//   }
// });

// // GET Endpoint to Fetch User Details - Assuming you provide the email or ID as a query param
// app.get('/user-details', async (req, res) => {
//   const { email } = req.query;  // Get email from query parameters

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       phone: user.phone,
//       address: user.address,
//       role: user.role,
//     });
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


//Most Important Code









require('dotenv').config(); // Import dotenv to read from .env file

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MongoDB Connections
const userDBConnection = mongoose.createConnection(process.env.MONGO_USER_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sparepartsDBConnection = mongoose.createConnection(process.env.MONGO_SPAREPARTS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bikeMarketDBConnection = mongoose.createConnection(process.env.MONGO_BIKEMARKET_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const membershipDBConnection = mongoose.createConnection(process.env.MONGO_MEMBERSHIP_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose
  .connect(process.env.MONGO_BIKESTORE_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to bikeStore MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Test MongoDB connections
userDBConnection.on('connected', () => console.log('Connected to MongoDB - userDB'));
sparepartsDBConnection.on('connected', () => console.log('Connected to MongoDB - sparepartsDB'));
bikeMarketDBConnection.on('connected', () => console.log('Connected to MongoDB - bikeMarketDB'));
membershipDBConnection.on('connected', () => console.log('Connected to MongoDB - membershipDB'));

// MongoDB connection errors
userDBConnection.on('error', (err) => console.error('MongoDB userDB connection error:', err));
sparepartsDBConnection.on('error', (err) => console.error('MongoDB sparepartsDB connection error:', err));
bikeMarketDBConnection.on('error', (err) => console.error('MongoDB bikeMarketDB connection error:', err));
membershipDBConnection.on('error', (err) => console.error('MongoDB membershipDB connection error:', err));

// AWS S3 Clients
const sparePartsS3 = new S3Client({
  region: process.env.AWS_REGION1,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const bikeMarketS3 = new S3Client({
  region: process.env.AWS_REGION2,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Define Schemas
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
});
const User = userDBConnection.model('User', userSchema);

const bikeSchema = new mongoose.Schema({
  bikeModel: String,
  companyName: String,
  price: String,
  imageUrl: String, // URL of the image stored in S3
});
const SparePartsBike = sparepartsDBConnection.model('SparePartsBike', bikeSchema);
const BikeMarketBike = bikeMarketDBConnection.model('BikeMarketBike', bikeSchema);

const membershipSchema = new mongoose.Schema({
  plan: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  rcNumber: { type: String },
  aadharNumber: { type: String },
  state: { type: String, required: true },
  district: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Membership = membershipDBConnection.model('Membership', membershipSchema);

const purchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userDetails: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  bikeDetails: {
    imageUrl: { type: String, required: true },
    companyName: { type: String, required: true },
    price: { type: String, required: true },
  },
  purchaseDate: { type: Date, default: Date.now },
});
const Purchase = mongoose.model('Purchase', purchaseSchema);

// Endpoints

app.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, address, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !address || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ firstName, lastName, email, phone, address, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/spareparts/bikes', upload.single('image'), async (req, res) => {
  try {
    const { bikeModel, companyName, price } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'Image file is required.' });

    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: 'spare-parts',
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const result = await sparePartsS3.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded to S3 (spare-parts):', result);

    fs.unlinkSync(file.path);

    const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    const bike = new SparePartsBike({ bikeModel, companyName, price, imageUrl });
    await bike.save();

    res.status(201).json({ message: 'Bike uploaded successfully to spareparts.', bike });
  } catch (error) {
    console.error('Error uploading bike to spareparts:', error);
    res.status(500).json({ message: 'Error uploading bike to spareparts.', error });
  }
});

app.post('/api/bikemarket/bikes', upload.single('image'), async (req, res) => {
  try {
    const { bikeModel, companyName, price } = req.body;
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'Image file is required.' });

    const fileStream = fs.createReadStream(file.path);
    const uploadParams = {
      Bucket: 'bike-profile',
      Key: `uploads/${Date.now()}_${file.originalname}`,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    const result = await bikeMarketS3.send(new PutObjectCommand(uploadParams));
    console.log('File uploaded to S3 (bike-profile):', result);

    fs.unlinkSync(file.path);

    const imageUrl = `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`;
    const bike = new BikeMarketBike({ bikeModel, companyName, price, imageUrl });
    await bike.save();

    res.status(201).json({ message: 'Bike uploaded successfully to bikeMarket.', bike });
  } catch (error) {
    console.error('Error uploading bike to bikeMarket:', error);
    res.status(500).json({ message: 'Error uploading bike to bikeMarket.', error });
  }
});

app.get('/api/spareparts/bikes', async (req, res) => {
  try {
    const bikes = await SparePartsBike.find();
    res.status(200).json(bikes);
  } catch (error) {
    console.error('Error fetching bikes from spareparts:', error);
    res.status(500).json({ message: 'Error fetching bikes from spareparts.', error });
  }
});

app.get('/api/bikemarket/bikes', async (req, res) => {
  try {
    const bikes = await BikeMarketBike.find();
    res.status(200).json(bikes);
  } catch (error) {
    console.error('Error fetching bikes from bikeMarket:', error);
    res.status(500).json({ message: 'Error fetching bikes from bikeMarket.', error });
  }
});

app.post('/membership', async (req, res) => {
  const { plan, name, email, phone, rcNumber, aadharNumber, state, district, address } = req.body;

  if (!plan || !name || !email || !phone || !state || !district || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newMembership = new Membership({
      plan,
      name,
      email,
      phone,
      rcNumber,
      aadharNumber,
      state,
      district,
      address,
    });
    await newMembership.save();
    res.status(201).json({ message: 'Membership registered successfully' });
  } catch (error) {
    console.error('Membership Registration Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Server starts listening on specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});









