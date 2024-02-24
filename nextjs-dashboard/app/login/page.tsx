'use client'
import React, { SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import '../ui/global.css';
import './loginStyle.css';

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const router = useRouter();

    const registerUser = () => {
        router.push("/register");
    };
    
    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();


        const decodeToken = (token) => {
            const encodedPayload = token.split('.')[1];
            const decodedPayload = atob(encodedPayload);
            const parsedPayload = JSON.parse(decodedPayload);
            return parsedPayload;
          };

        const response = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        const content = await response.json();
        const loginInfo = decodeToken(content.token);
        // console.log(loginInfo);
        // if the user is an admin then redirect to admin page else redirect to user page
        if (response.ok) {
            window.localStorage.setItem("token", content.token);
            if (loginInfo.role === "admin"){
                router.push("/admin");
            }
            else{
                router.push("/user");
            }
        }
    };

    return (
        <div className="centered-container">
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
                <div className="button-container">
                    <button className="submit-button w-100" type="submit">
                        Sign in
                    </button>
                    <div className="button-gap"></div>
                    <button type="button" className="submit-button w-100" onClick={registerUser}>
                        Register here
                    </button>
                </div>
                <p className="mt-5 mb-3 text-body-secondary">
                    Car Inventory management System
                </p>

            </form>
        </div>

    );
};

export default Login;