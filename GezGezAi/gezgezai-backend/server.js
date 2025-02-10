const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/user");

app.use("/api/user", userRoutes);


// Middleware
app.use(cors());
app.use(express.json());

// Rotalar
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("GezGezAi Backend Çalışıyor!");
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda çalışıyor...`);
});
