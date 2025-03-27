


// //new code after admin logic 

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/userDB";

// console.log("MongoDB URL:", dbUrl); // Add this line
// if (!dbUrl) {
//   console.error("MONGO_URL is not defined. Check your environment variables.");
//   process.exit(1); // Exit the app if the database URL is missing
// }

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(dbUrl);
// }

// // Define User Schema
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   aadhaarNumber: { type: String, required: true, unique: true },
//   mobileNumber: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model("User", userSchema);

// // Define Admin Schema
// const adminSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const Admin = mongoose.model("Admin", adminSchema);

// const alertSchema = new mongoose.Schema({
//   message: { type: String, required: true },
//   type: { type: String, required: true },
//   description: { type: String, required: true }, 
//   location: { type: String, required: true }, 
//   createdAt: { type: Date, default: Date.now },
// })


// const Alert = mongoose.model("Alert", alertSchema);

// app.post("/admin/alert", async (req, res) => {
//   try {
//     const { message, type } = req.body;
//     if (!message || !type) {
//       return res.status(400).json({ message: "Message and type are required" });
//     }

//     const newAlert = new Alert({ message, type });
//     await newAlert.save();
//     res.status(201).json({ message: "Alert created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.get("/alerts", async (req, res) => {
//   try {
//     const alerts = await Alert.find().sort({ createdAt: -1 });
//     res.status(200).json(alerts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


  
// // Register Route
// app.post("/register", async (req, res) => {
//   try {
//     const { email, aadhaarNumber, mobileNumber, password } = req.body;

    
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create new user
//     const newUser = new User({ email, aadhaarNumber, mobileNumber, password });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


// app.post("/admin/login", (req, res) => {
//   const { email, password } = req.body;

//   if (email === "admin@example.com" && password === "admin123") {
//     res.send("Success");
//   } else {
//     res.status(401).send("Invalid credentials");
//   }
// });




// // Login Route
// app.post("/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       const user = await User.findOne({ email });
  
//       if (!user) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }
 
//       if (user.password !== password) {
//         return res.status(400).json({ message: "Invalid email or password" });
//       }
  
     
//       res.status(200).json("Success");
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });


// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017/userDB";

console.log("MongoDB URL:", dbUrl);
if (!dbUrl) {
  console.error("MONGO_URL is not defined. Check your environment variables.");
  process.exit(1); // Exit the app if the database URL is missing
}

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// Define User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  aadhaarNumber: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Define Admin Schema
const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);

// Updated Alert Schema
const alertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true }, // New field
  location: { type: String, required: true }, // New field
  createdAt: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", alertSchema);

// Create Alert Endpoint
app.post("/admin/alert", async (req, res) => {
  try {
    const { message, type, description, location } = req.body;

    if (!message || !type || !description || !location) {
      return res
        .status(400)
        .json({ message: "Message, type, description, and location are required" });
    }

    const newAlert = new Alert({ message, type, description, location });
    await newAlert.save();
    res.status(201).json({ message: "Alert created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get Alerts Endpoint
app.get("/alerts", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ createdAt: -1 });
    res.status(200).json(alerts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, aadhaarNumber, mobileNumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ email, aadhaarNumber, mobileNumber, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Admin Login Route
app.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@example.com" && password === "admin123") {
    res.send("Success");
  } else {
    res.status(401).send("Invalid credentials");
  }
});

// User Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
