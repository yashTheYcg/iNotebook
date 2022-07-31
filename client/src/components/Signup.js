import React,{useState} from 'react';
import {useNavigate} from "react-router-dom"

const Signup = (props) => {

    let navigate = useNavigate();
    const [user, setUser] = useState({
        name:"",email:"",password:"",cpassword:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name,email,password} = user;

        const response = await fetch("http://localhost:8080/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authtoken);
            navigate('/login');
            props.showAlert("Account created Successfully", "success");
        }else{
            props.showAlert("Invalide Credentials", "danger")
        }


    }


   const onChange=(e)=>{
        setUser({...user,[e.target.name]: (e.target.value)})
   }
    
  return (
    <div className='container my-3'>
          <h2>Create an account to use iNotebook</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" name='name' onChange={onChange} value={user.name}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" aria-describedby="email" name='email' onChange={onChange} value={user.email} required/>
                  <div id="email" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" name='password' onChange={onChange} value={user.password} minLength={5} required/>
              </div>
              <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} value={user.cpassword} minLength={5} required />
              </div>

              
              <button type="submit" className="btn btn-outline-secondary">Submit</button>
          </form>
    </div>
  )
}


export default Signup
