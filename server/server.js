
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



app.post('/api/user/purchase', async (req, res) => {
  const { userDetails, bikeDetails } = req.body;

  console.log('Received Purchase Request:', req.body); // Debugging: Log the incoming data

  // Check if data is complete
  if (!userDetails || !bikeDetails) {
    console.error('Invalid request data:', req.body);
    return res.status(400).json({ message: 'Invalid request data' });
  }

  try {
    const purchase = new Purchase({
      userId: userDetails.email, // Use email as userId
      userDetails: {
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        phone: userDetails.phone,
      },
      bikeDetails,
    });

    await purchase.save();

    res.status(201).json({ message: 'Purchase successful!' });
  } catch (error) {
    console.error('Error saving purchase:', error); // Log the full error
    res.status(500).json({ message: 'Error saving purchase', error });
  }
});



// Fetch Orders by Email
// Define Orders Endpoint to Fetch User's Purchases
// Endpoint to get user orders based on email
app.get('/api/user/orders', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const orders = await Purchase.find({ 'userDetails.email': email });

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this email' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
});


// API endpoint to fetch all purchases
app.get('/admin/purchases', async (req, res) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error fetching purchase details:', error);
    res.status(500).json({ error: 'Failed to fetch purchase details' });
  }
});


app.post('/subscribe', async (req, res) => {
  try {
    const membershipData = req.body;
    if (!membershipData.plan || !membershipData.name || !membershipData.email || !membershipData.phone || !membershipData.state || !membershipData.district || !membershipData.address) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const newMembership = new Membership(membershipData);
    await newMembership.save();

    res.status(201).json({ message: 'Membership subscribed successfully!', data: newMembership });
  } catch (error) {
    console.error('Error saving membership:', error);
    res.status(500).json({ message: 'Server Error: Unable to process request.' });
  }
});


// GET Endpoint to Fetch User Details - Assuming you provide the email or ID as a query param
app.get('/user-details', async (req, res) => {
  const { email } = req.query;  // Get email from query parameters

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
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





//Balaji Ganta World



