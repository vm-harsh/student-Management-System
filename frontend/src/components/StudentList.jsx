import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/StudentList.css';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get('http://localhost:5000/students/all');
      setStudents(response.data.students || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch students');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/students/${id}`);
        setStudents(students.filter(student => student.student_id !== id));
        alert('Student deleted successfully!');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to delete student');
        console.error('Error:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading students...</div>;

  return (
    <div className="student-list-container">
      <div className="list-header">
        <h1>All Students</h1>
        <button 
          className="add-btn"
          onClick={() => navigate('/add-student')}
        >
          + Add New Student
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {students.length === 0 ? (
        <div className="no-students">
          <p>No students found. <a href="/add-student">Add one now!</a></p>
        </div>
      ) : (
        <div className="students-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone || '-'}</td>
                  <td>{student.gender || '-'}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => navigate(`/student/${student.student_id}`)}
                    >
                      View
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student.student_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentList;
