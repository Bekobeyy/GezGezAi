const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const router = express.Router();

// Kullanıcı Kayıt (Signup)
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Kullanıcının zaten kayıtlı olup olmadığını kontrol et
    const userCheck = await pool.query("SELECT * FROM \"User\" WHERE email = $1", [email]);

    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "Bu e-posta adresi zaten kayıtlı." });
    }

    // Şifreyi hash'le
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Kullanıcıyı veritabanına ekle
    const newUser = await pool.query(
      "INSERT INTO \"User\" (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu.", user: newUser.rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası" });
  }
});


// Kullanıcı Giriş (Login)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Kullanıcıyı veritabanında ara
      const user = await pool.query("SELECT * FROM \"User\" WHERE email = $1", [email]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({ message: "E-posta kayıtlı değil" });
      }
  
      // Şifreyi doğrula
      const isMatch = await bcrypt.compare(password, user.rows[0].password);
      if (!isMatch) {
        return res.status(400).json({ message: "Şifre hatalı." });
      }
  
      // JWT oluştur
      const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({ message: "Giriş başarılı.", token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Sunucu hatası" });
    }
  });
  

module.exports = router;
