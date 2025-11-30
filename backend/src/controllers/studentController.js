const {con : pool} = require('../db/db');

const createStudent = async (req, res) => {
  try {
    const { name, email, phone, dob, gender, address } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required." });
    }

    const query = `
      INSERT INTO students (name, email, phone, dob, gender, address)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [name, email, phone, dob, gender, address];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "Student created successfully",
      student: result.rows[0]
    });

  } catch (error) {
    console.error("Error creating student:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = createStudent;


module.exports = {
  createStudent
};