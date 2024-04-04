import React ,{useState} from 'react'
import axios from 'axios';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
const [username, setUsername] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserInfo(response.data);
    } catch (error) {
      setError(error.response.data.message || 'An error occurred while fetching user info.');
      setUserInfo(null);
    }
  };

  return (
    <>
     <div className="App">
      <div className="container">
        <h2 className='text-white'>GitHub Profile Finder</h2>
        <form onSubmit={handleSubmit} className='input-group '>
          <input
            type="text"
            value={username}
            onChange={handleChange}
            placeholder="Enter GitHub Username"
            className='form-control'
          />
          <button type="submit">Get Info</button>
        </form>
        {error && <p className="error text-white">{error}</p>}
        {userInfo && (
          <div className="card mt-5">
            <div class="d-flex align-items-center justify-content-between border-bottom m-3 p-2">
            <h2><i class="bi bi-github"></i></h2>
            <h2>GitHub</h2>
            <h2>
              
              <i class="bi bi-send"></i></h2>
          </div>
          
          <div>
            <img src={userInfo.avatar_url} alt="Avatar" class="rounded-circle "  />
            <p><strong>Username:</strong> {userInfo.login}</p>
            <p><strong>Name:</strong> {userInfo.name || 'N/A'}</p>
            <p><strong>No. of Public Repos:</strong> {userInfo.public_repos}</p>
            <p><strong>No. of Public Gists:</strong> {userInfo.public_gists}</p>
            <p><strong>Profile Created At:</strong> {new Date(userInfo.created_at).toISOString().split('T')[0]}</p>
            </div>
            
          </div>
        )}
      </div>

    </div>

    </>
  )
}

export default App
