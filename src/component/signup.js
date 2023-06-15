import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../service/auth.service";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [accountCreated, setAccountCreated] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const navigate = useNavigate();
    const Registered = () => {
        return (
            <div>
                <h1>Registered</h1>
                <p>Email: {accountCreated.email.value}</p>
                <button onClick={() => navigate("/login")}>Login</button>
            </div>
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== retypePassword){
            alert("Passwords do not match");
            return;
        }
        authService.register(email, password)
        .then(response => {
            setAccountCreated(response.data);
            setIsRegistered(true);
        })
        .catch(()=>{
            alert("Invalid email or password");
        })
    }

  return (
    <div className="formDiv">
      <h1>Register</h1>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <label htmlFor="loginEmail">Email</label>
          <input
            type="email"
            className="form-control"
            name="loginEmail"
            id="emailInput"
            aria-describedby="emailHelpId"
            placeholder="xxx@email.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputContainer">
          <label htmlFor="loginPassword">Password</label>
          <input
            type="password"
            className="form-control"
            name="login-password"
            id="passInput"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputContainer">
            <label htmlFor="retypePassword">Re-type Password</label>
            <input
              type="password"
              className="form-control"
              name="retypePassword"
              id="retypePassword"
              placeholder="re-type password"
              required
              onChange={(e) => setRetypePassword(e.target.value)}
            />
        </div>

        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
      
      <div className="register">
        {isRegistered ? <Registered /> : null}
      </div>
    </div>
  );
}
