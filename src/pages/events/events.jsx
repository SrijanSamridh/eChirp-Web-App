import React, { useState } from 'react';
import AllEvents from './components/allevents';
import MyCreatedEvents from './components/mycreatedEvent';
import './events.css'; 

function Events() {
    const [activeTab, setActiveTab] = useState('all-events');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <h2>Events Contents</h2>
            <div className="tab-bar">
                <button className={activeTab === 'all-events' ? 'active' : ''} onClick={() => handleTabChange('all-events')}>All Events</button>
                <button className={activeTab === 'my-created-events' ? 'active' : ''} onClick={() => handleTabChange('my-created-events')}>My Created Events</button>
                <button className={activeTab === 'upcoming-events' ? 'active' : ''} onClick={() => handleTabChange('upcoming-events')}>Upcoming Events</button>
                <button className={activeTab === 'join-via-link' ? 'active' : ''} onClick={() => handleTabChange('join-via-link')}>Join via Link</button>
            </div>
            <hr />
            <div className="scrollable-content">
                {/* Rendering different content based on the active tab */}
                {activeTab === 'all-events' && <AllEvents/>} 
                {activeTab === 'my-created-events' && <MyCreatedEvents />}
                {activeTab === 'upcoming-events' && <UpcomingEvents />}
                {activeTab === 'join-via-link' && <JoinViaLink />}
            </div>
        </div>
    );
}

// Placeholder components for different tabs
function UpcomingEvents() {
    return <div>Upcoming Events</div>;
}

function JoinViaLink() {
    return <div>Join via Link</div>;
}

export default Events;
