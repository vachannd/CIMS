'use client'
import React, { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import './registerStyle.css';

const Register = () => {
    const router = useRouter();
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
        if (response.ok) {
            router.push("/login");
        }
        
    };

  return (
    <form onSubmit={submit}>
        <h1 className="register-form">Please Register</h1>
        <div className="form-floating">
            <input
            className="form-name"
            placeholder="Name"
            style={{ color: "black" }}
            onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name"></label>
        </div>
        <div className="form-floating">
            <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            style={{ color: "black" }}
            onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email"></label>
        </div>
        <div className="form-floating">
            <input
            type="password"
            className="form-control"
            placeholder="Password"
            style={{ color: "black" }}
            onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password"></label>
        </div>
        <button className="submit-button w-100" type="submit">
            Submit
        </button>
        <p className="mt-5 mb-3 text-body-secondary">
            Car Inventory management System
        </p>
    </form>
  );
};

export default Register;
