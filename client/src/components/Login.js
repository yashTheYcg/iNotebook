import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

   let navigate = useNavigate();
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

    const handleSubmit= async (e) =>{
        e.preventDefault();
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password})
        });
        const json = await response.json();
        console.log(json);
        
        if (json.success) {
            // Save the auth token and redirect it
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Login Successfully", "success");
            navigate('/');
        } else {
            props.showAlert("Invalide details", "danger")
        }
    }



  return (
    <div className='container my-3'>
        <h2>Login to continue iNotebook</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" name="email" value={email} aria-describedby="email" onChange={(e) => setEmail(e.target.value)} />
                      <div id="email" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              
              <button type="submit" className="btn btn-dark" >Submit</button>
          </form>
    </div>
  )
}

export default Login
