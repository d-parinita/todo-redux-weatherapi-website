"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInRequest } from "../Redux/actions";
import { routes } from "../utils/routes";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { authLoading, authError, user } = useSelector((state) => state);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInRequest(email, password));
  };

 if (user) {
    router.push(routes.HOME);
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="card p-4 shadow bg-dark text-light" style={{ maxWidth: "400px", width: "100%", borderRadius: "12px" }}>
        <h4 className="text-center mb-3">Sign In</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {authError && <p className="text-danger">{authError}</p>}
          <button type="submit" className="btn bg-light fw-semibold text-dark w-100 mt-3" disabled={authLoading}>
            {authLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
