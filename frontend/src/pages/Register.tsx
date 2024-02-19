import React, { SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("");
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                email,
                password,
                role,
            }),
        });
        // const content = await response.json();
        // console.log(content);
        return <Navigate to="/login" />
        
    };

  return (
    <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div className="form-floating">
            <input
            className="form-control"
            placeholder="Name"
            style={{ color: "black" }}
            onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating">
            <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            style={{ color: "black" }}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email">Email address</label>
        </div>
        <div className="form-floating">
            <input
            type="password"
            className="form-control"
            placeholder="Password"
            style={{ color: "black" }}
            onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating">
            <input
            className="form-control"
            placeholder="Name"
            style={{ color: "black" }}
            onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="role">Role</label>
        </div>
        <button className="btn btn-primary w-100 py-2" type="submit">
            Submit
        </button>
        <p className="mt-5 mb-3 text-body-secondary">
            Car Inventory management System
        </p>
    </form>
  );
};

export default Register;
