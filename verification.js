(function verifyIdentity() {
  // Skip verification for index.html
  if(window.location.pathname.includes('index.html')) return;

  // Get stored identity
  const storedIdentity = localStorage.getItem('gameIdentity');
  const urlParams = new URLSearchParams(window.location.search);
  const urlPlayerId = urlParams.get('playerId');

  // Basic validation
  if(!storedIdentity || !urlPlayerId) {
    localStorage.removeItem('gameIdentity');
    window.location.href = 'index.html';
    return;
  }

  // Verify session with Firebase
  database.ref(`activeSessions/${urlPlayerId}`).once('value').then(snapshot => {
    const session = snapshot.val();
    
    if(!session?.valid) {
      localStorage.removeItem('gameIdentity');
      window.location.href = 'index.html';
      return;
    }

    // Verify local storage matches URL parameters
    try {
      const identity = JSON.parse(storedIdentity);
      if(identity.playerId !== urlPlayerId) throw new Error('ID mismatch');
    } catch(e) {
      localStorage.removeItem('gameIdentity');
      database.ref(`activeSessions/${urlPlayerId}`).remove();
      window.location.href = 'index.html';
    }
  }).catch(() => {
    window.location.href = 'index.html';
  });
})();




  window.addEventListener('beforeunload', () => {
    database.ref(`activeSessions/${playerId}`).update({
      lastActive: Date.now()
    });
  });
  
  // Add periodic session validation
  setInterval(() => {
    database.ref(`activeSessions/${playerId}`).once('value').then(snap => {
      if (!snap.exists() || !snap.val().valid) {
        window.location.href = 'index.html';
      }
    });
  }, 30000);


  


  // Session heartbeat
let heartbeatInterval;

function startHeartbeat() {
  heartbeatInterval = setInterval(() => {
    database.ref(`activeSessions/${playerId}`).update({
      lastActive: Date.now()
    });
  }, 15000); // Update every 15 seconds
}

// Cleanup on exit
window.addEventListener('beforeunload', () => {
  clearInterval(heartbeatInterval);
  database.ref(`activeSessions/${playerId}`).remove();
});

// Start heartbeat after verification
startHeartbeat();