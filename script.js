// Google Identity Services initialization
function handleCredentialResponse(response) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = 'Verifying...';
    statusEl.className = 'status';

    // Decode ID token (base64url) to get payload
    try {
        const payload = response.credential.split('.')[1];
        const decoded = atob(payload);
        const userInfo = JSON.parse(decoded);

        // For demo: show success and user info
        statusEl.textContent = `Signed in as ${userInfo.name}`;
        statusEl.className = 'status success';

        // In a real app, send the credential to your backend:
        // fetch('/api/auth/google', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ credential: response.credential })
        // });
        console.log('User info:', userInfo);
    } catch (e) {
        console.error('Failed to parse credential', e);
        statusEl.textContent = 'Authentication failed.';
        statusEl.className = 'status error';
    }
}

// Render the Google button after GIS loads
window.onload = function () {
    // The button is rendered automatically via the div with class g_id_signin
    // Ensure the client ID is set (already in HTML data attribute)
    // No extra JS needed for basic render.
    // If you want to customize further, you could use:
    // google.accounts.id.initialize({...});
    // google.accounts.id.renderButton(document.getElementById('g_id_signin'), {...});
};
