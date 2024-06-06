import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
    const [events, setEvents] = useState([]);
    const [students, setStudents] = useState([]);
    const [showAddEventPopup, setShowAddEventPopup] = useState(false);
    const [showEditStudentPopup, setShowEditStudentPopup] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [editedStudent, setEditedStudent] = useState({});

    useEffect(() => {
        fetch('http://localhost:3001/api/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:3001/api/students')
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error('Error fetching student list:', error));
    }, []);

    const [finedStudents, setFinedStudents] = useState([
        { id: 1, name: 'Alice Johnson', course: 'BSIT', yearLevel: 'IV', result: 'Fined' }
    ]);

    const [unfinedStudents, setUnfinedStudents] = useState([
        { id: 2, name: 'Bob Smith', course: 'BSCS', yearLevel: 'III', result: 'Unfined' }
    ]);

    const [newEvent, setNewEvent] = useState({ name: '', venue: '', date: '', time: '' });

    const handleAddEvent = () => {
        setNewEvent({ name: '', venue: '', date: '', time: '' });
        setShowAddEventPopup(true);
    };

    const handleSaveEvent = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEvent),
            });
            if (!response.ok) {
                throw new Error('Failed to add event');
            }

            const result = await response.text();
            console.log(result);
    
            setEvents([...events, newEvent]);
            setShowAddEventPopup(false);
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleEditStudent = (student) => {
        setEditedStudent({ ...student });
        setSelectedStudent(student);
        setShowEditStudentPopup(true);
    };

    const handleSaveEditedStudent = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/students/${selectedStudent.stud_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedStudent),
            });
            if (!response.ok) {
                throw new Error('Failed to save edited student');
            }

            // Update the students state with the edited student
            const updatedStudents = students.map(student => {
                if (student.stud_ID === selectedStudent.stud_ID) {
                    return editedStudent;
                }
                return student;
            });

            setStudents(updatedStudents);
            
            // Close the popup
            setShowEditStudentPopup(false);
        } catch (error) {
            console.error('Error saving edited student:', error);
        }
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedStudent({ ...editedStudent, [name]: value });
    };

    const handleDeleteStudent = async (studentId) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`http://localhost:3001/api/students/${studentId}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete student');
                }

                // Remove the deleted student from the students state
                setStudents(students.filter(student => student.id !== studentId));
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Confed Attendance Tracker</h1>
            </header>
            <div className="content">
                <aside className="sidebar">
                    <h2>List of Events</h2>
                    <form>
                        {events.map((event, index) => (
                            <div key={index} className="event-entry">
                                <input type="text" value={event.event_Name} placeholder="Event Name" readOnly />
                                <input type="text" value={event.event_Loc} placeholder="Venue" readOnly />
                                <input type="date" value={event.event_Date} readOnly />
                                <input type="time" value={event.event_Time} readOnly />
                            </div>
                        ))}
                        <button type="button" onClick={handleAddEvent}>Add Event</button>
                    </form>
                </aside>
                <div className="student-attendance-container">
                    <div className="student-attendance">
                        <h2>List of Attendance of Students</h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Year Level</th>
                                    <th>Attendance Count</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={index}>
                                        <td>{student.stud_Name}</td>
                                        <td>{student.stud_Course}</td>
                                        <td>{student.stud_yLevel}</td>
                                        <td>{student.stud_Attend}</td>
                                        <td>
                                        <button className="action-buttons edit-button" onClick={() => handleEditStudent(student)}>Edit</button>
                                            <button className="action-buttons delete-button" onClick={() => handleDeleteStudent(student.stud_ID)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Fined and Unfined Students List */}
                <div className="fines-section">
                    <div className="fines-list">
                        <h2>List of Fined Students</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Year Level</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {finedStudents.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.course}</td>
                                        <td>{student.yearLevel}</td>
                                        <td>{student.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="fines-list">
                        <h2>List of Unfined Students</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Year Level</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unfinedStudents.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.name}</td>
                                        <td>{student.course}</td>
                                        <td>{student.yearLevel}</td>
                                        <td>{student.result}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <footer className="footer">
                <p>ALL STUDENTS ARE REQUIRED TO HAVE 5 EVENTS!</p>
            </footer>
            
            {showAddEventPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Add New Event</h2>
                        <input 
                            type="text" 
                            name="name" 
                            value={newEvent.name} 
                            onChange={handleInputChange} 
                            placeholder="Event Name" 
                        />
                        <input 
                            type="text" 
                            name="venue" 
                            value={newEvent.venue} 
                            onChange={handleInputChange} 
                            placeholder="Venue" 
                        />
                        <input 
                            type="date" 
                            name="date" 
                            value={newEvent.date} 
                            onChange={handleInputChange} 
                        />
                        <input 
                            type="time" 
                            name="time" 
                            value={newEvent.time} 
                            onChange={handleInputChange} 
                        />
                        <button onClick={handleSaveEvent}>Save</button>
                        <button onClick={() => setShowAddEventPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}

            {showEditStudentPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Edit Student Information</h2>
                        <input 
                            type="text" 
                            name="stud_Name" 
                            value={editedStudent.stud_Name} 
                            onChange={handleEditInputChange} 
                            placeholder="Student Name" 
                        />
                        <input 
                            type="text" 
                            name="stud_Course" 
                            value={editedStudent.stud_Course} 
                            onChange={handleEditInputChange} 
                            placeholder="Course" 
                        />
                        <input 
                            type="text" 
                            name="stud_yLevel" 
                            value={editedStudent.stud_yLevel} 
                            onChange={handleEditInputChange} 
                            placeholder="Year Level" 
                        />
                        <input 
                            type="text" 
                            name="stud_Attend" 
                            value={editedStudent.stud_Attend} 
                            onChange={handleEditInputChange} 
                            placeholder="Attendance Count" 
                        />
                        <button onClick={handleSaveEditedStudent}>Save Changes</button>
                        <button onClick={() => setShowEditStudentPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
