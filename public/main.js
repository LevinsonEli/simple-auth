

const API_BASE_URL = 'http://localhost:3000/api/v1';




// Login form handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    
    const payload = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const msgDiv = document.getElementById('loginMessage');

      if (res.ok) {
        msgDiv.style.color = 'green';
        msgDiv.textContent = 'Login successful!';
        localStorage.setItem('authToken', data.token);
      } else {
        msgDiv.style.color = 'red';
        msgDiv.textContent = data.error || 'Login failed';
      }
    } catch (err) {
      document.getElementById('loginMessage').textContent = 'Network error';
    }
  });
}

// Register form handler
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const payload = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      const msgDiv = document.getElementById('registerMessage');
      if (res.ok) {
        msgDiv.style.color = 'green';
        msgDiv.textContent = 'Registration successful! Please login.';
      } else {
        msgDiv.style.color = 'red';
        msgDiv.textContent = data.error || 'Registration failed';
      }
    } catch (err) {
      alert('Network error');
    }
  });
}


// Protected Page
const protectedBtn = document.getElementById('testProtected');
if (protectedBtn) {
  protectedBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      document.getElementById('protectedResult').textContent = 'No token found. Please log in first.';
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/protected`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      const resultBox = document.getElementById('protectedResult');

      if (res.ok) {
        resultBox.style.color = 'green';
        resultBox.textContent = `${data.message}`;
      } else {
        resultBox.style.color = 'red';
        resultBox.textContent = `${data.error || 'Access denied'}`;
      }
    } catch (err) {
      document.getElementById('protectedResult').textContent = 'Network error';
    }
  });
}