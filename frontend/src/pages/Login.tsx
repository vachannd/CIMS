import React, { SyntheticEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const content = await response.json();
        console.log(content);
        if (response.ok) {
            window.localStorage.setItem("token", content.token);
            navigate("/");
        }
    };

    return (
        <div>
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

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
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
                <p className="mt-5 mb-3 text-body-secondary">Car Inventory management System</p>
            </form>
        </div>

    );
};

export default Login;