document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch welcome message
        const messageResponse = await fetch('/api/message');
        const messageData = await messageResponse.json();
        document.getElementById('message').textContent = messageData.message;

        // Fetch health status
        const healthResponse = await fetch('/api/health');
        const healthData = await healthResponse.json();
        document.getElementById('health').textContent = `Server Status: ${healthData.status} (${healthData.timestamp})`;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('message').textContent = 'Error loading data';
        document.getElementById('message').style.backgroundColor = '#fce8e6';
        document.getElementById('message').style.color = '#d93025';
    }
});