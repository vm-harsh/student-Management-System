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

const getAllStudents = async (req, res) => {
  try {
    const query = 'SELECT * FROM students;';
    const result = await pool.query(query);
    return res.status(200).json({ students: result.rows });
  } catch (error) {
    console.error("Error fetching students:", error); 
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'SELECT * FROM students WHERE student_id = $1;';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ student: result.rows[0] });
  } catch (error) {
    console.error("Error fetching student by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM students WHERE student_id = $1 RETURNING *;';
    const values = [id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, dob, gender, address } = req.body;

    const query = `
      UPDATE students
      SET name = $1, email = $2, phone = $3, dob = $4, gender = $5, address = $6
      WHERE student_id = $7
      RETURNING *;
    `;

    const values = [name, email, phone, dob, gender, address, id];

    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    return res.status(200).json({
      message: "Student updated successfully",
      student: result.rows[0]
    });
  } catch (error) {
    console.error("Error updating student:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudent,
  updateStudent
};