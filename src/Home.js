import React, { useState } from 'react';
import './Home.css';

function Home() {
    const [events, setEvents] = useState([
        { id: 1, name: 'Winter Spades Tournament', venue: 'Guild Hall', date: '2024-06-05', time: '19:00' },
        { id: 2, name: 'Summer Euchre Bash', venue: 'Beach Resort', date: '2024-06-12', time: '16:00' },
    ]);

    const [students, setStudents] = useState([
        { id: 1, name: 'Kristine Joy E. Pacatang', course: 'BSIT', yearLevel: 'III', attendanceCount: 3 },
        // More students can be added here
    ]);

    const addEvent = () => {
        const newId = events.length + 1;
        const newEvent = { id: newId, name: '', venue: '', date: '', time: '' };
        setEvents([...events, newEvent]);
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
                                <input type="text" value={event.name} placeholder="Event Name" />
                                <input type="text" value={event.venue} placeholder="Venue" />
                                <input type="date" value={event.date} />
                                <input type="time" value={event.time} />
                            </div>
                        ))}
                        <button type="button" onClick={addEvent}>Add Event</button>
                    </form>
                </aside>
                <div className="student-attendance-container"> {/* Encapsulation starts here */}
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
            </div>
            <footer className="footer">
                <p>ALL STUDENTS ARE REQUIRED TO HAVE 5 EVENTS!</p>
            </footer>
        </div>
    );
}

export default Home;
