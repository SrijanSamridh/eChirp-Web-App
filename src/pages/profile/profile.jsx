import React, { useState, useEffect } from 'react';
import './profile.css';

function Profile() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://api.eventchirp.com/api/auth', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-auth-token': localStorage.getItem('x-auth-token'), // Include the authentication token in the headers
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user data'); 
                }

                const userData = await response.json(); // Parse the JSON response

                // Update the state with the fetched user data
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching user data:', error.message);
                // Handle the error, display a message to the user, or retry the request
            }
        };

        fetchUserData(); // Call fetchUserData when the component mounts
    }, []);

    return (
        <div className="profile-container">
            <h2 className="profile-heading">User Profile</h2>
            {userData ? (
                <div className="profile-details">
                    <p><strong>Username:</strong> {userData.username}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>First Name:</strong> {userData.firstName}</p>
                    <p><strong>Last Name:</strong> {userData.lastName}</p>
                    <p><strong>Bio:</strong> {userData.bio}</p>
                    <p><strong>Number of Friends:</strong> {userData.numberOfFriends}</p>
                    <p><strong>Number of Events Created:</strong> {userData.numberOfEventsCreated}</p>
                    <p><strong>Number of Events Attended:</strong> {userData.numberOfEventsAttended}</p>

                    <div className="events-section">
                        <h3>My Created Events</h3>
                        <ul className="events-list">
                            {userData.myCreatedEvents.map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="events-section">
                        <h3>Events Attended</h3>
                        <ul className="events-list">
                            {userData.eventsAttended.map((event, index) => (
                                <li key={index}>{event}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                <p className="loading-message">Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;
