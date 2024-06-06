import React, { useState, useEffect } from 'react';
import './Home.css';

function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/events')
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.error('Error fetching events:', error));
    }, []);

    const [students, setStudents] = useState([
        { id: 1, name: 'Kristine Joy E. Pacatang', course: 'BSIT', yearLevel: 'III', attendanceCount: 3 },
        // More students can be added here
    ]);

    const [finedStudents, setFinedStudents] = useState([
        { id: 1, name: 'Alice Johnson', course: 'BSIT', yearLevel: 'IV', result: 'Fined' }
    ]);

    const [unfinedStudents, setUnfinedStudents] = useState([
        { id: 2, name: 'Bob Smith', course: 'BSCS', yearLevel: 'III', result: 'Unfined' }
    ]);

    const [showPopup, setShowPopup] = useState(false);
    const [newEvent, setNewEvent] = useState({ name: '', venue: '', date: '', time: '' });

    const handleAddEvent = () => {
        setNewEvent({ name: '', venue: '', date: '', time: '' });
        setShowPopup(true);
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
            setShowPopup(false);
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
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
                                        <td>{student.name}</td>
                                        <td>{student.course}</td>
                                        <td>{student.yearLevel}</td>
                                        <td>{student.attendanceCount}</td>
                                        <td>
                                            <button className="action-buttons edit-button">Edit</button>
                                            <button className="action-buttons delete-button">Delete</button>
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
            
            {showPopup && (
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
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
