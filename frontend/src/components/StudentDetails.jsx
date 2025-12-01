import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/StudentDetails.css';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    address: ''
  });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:5000/students/${id}`);
      setStudent(response.data.student);
      setFormData(response.data.student);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch student');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/students/${id}`, formData);
      setStudent(response.data.student);
      setIsEditing(false);
      alert('Student updated successfully!');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update student');
      console.error('Error:', err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/students/${id}`);
        alert('Student deleted successfully!');
        navigate('/students');
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to delete student');
        console.error('Error:', err);
      }
    }
  };

  if (loading) return <div className="loading">Loading student details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!student) return <div className="error-message">Student not found</div>;

  return (
    <div className="student-details-container">
      <button className="back-btn" onClick={() => navigate('/students')}>
        ← Back to Students
      </button>

      <div className="details-card">
        <h1>Student Details</h1>

        {isEditing ? (
          <form onSubmit={handleUpdate} className="details-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender || ''}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="details-view">
            <div className="detail-item">
              <span className="label">ID:</span>
              <span className="value">{student.student_id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{student.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{student.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone:</span>
              <span className="value">{student.phone || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Date of Birth:</span>
              <span className="value">{student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Gender:</span>
              <span className="value">{student.gender || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="label">Address:</span>
              <span className="value">{student.address || 'N/A'}</span>
            </div>

            <div className="action-buttons">
              <button className="edit-btn" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="delete-btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;
