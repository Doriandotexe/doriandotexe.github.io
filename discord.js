async function fetchDiscordStatus() {
    try {
        const response = await fetch('https://api.lanyard.rest/v1/users/774413933653393449');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching Discord status:', error);
        return null;
    }
}

async function updateStatus() {
    const statusElement = document.getElementById('discord-status');
    const statusData = await fetchDiscordStatus();
    if (statusData && statusData.data) {
        const status = statusData.data.spotify ? 'Listening to Spotify' : (statusData.data.activities.length > 0 ? statusData.data.activities[0].name : 'Offline');
        statusElement.textContent = status;
    } else {
        statusElement.textContent = 'Error fetching status';
    }
}

updateStatus();
setInterval(updateStatus, 60000); // Update every minute
