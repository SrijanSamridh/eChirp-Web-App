const fetchUserData = async (setUserData) => {
    try {
        const response = await fetch('https://e-chirp-server.vercel.app/api/auth', {
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

const updateUserProfile = async (userData) => {
    try {
        const response = await fetch('https://e-chirp-server.vercel.app/api/auth', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('x-auth-token'), // Include the authentication token in the headers
            },
            body: JSON.stringify(userData), // Convert userData to JSON string
        });

        if (!response.ok) {
            throw new Error('Failed to update user profile'); 
        }

        const updatedUserData = await response.json(); // Parse the JSON response

        return updatedUserData; // Return the updated user data
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        // Handle the error, display a message to the user, or retry the request
        throw error; // Rethrow the error to handle it in the calling function
    }
};

const Profile = {
    fetchUserData,
    updateUserProfile,
}

export default Profile;
