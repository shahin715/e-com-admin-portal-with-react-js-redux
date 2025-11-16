// src/app/pages/auth/register/index.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import bcrypt from "bcryptjs";
import routePaths from "@/constants/routePaths.constant";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const loginPath = routePaths?.ROUTE_GHOST_ENTRY_PATH || "/login";
  const dashboardPath = routePaths?.ROUTE_DASHBOARD || "/dashboard";

  const handleRegister = (e) => {
    e.preventDefault();
    // basic validation
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password) {
      alert("Please fill all required fields.");
      return;
    }

    setSubmitting(true);

    try {
      // load existing users (array) or empty
      const raw = localStorage.getItem("users");
      const users = raw ? JSON.parse(raw) : [];

      // check duplicate email
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) {
        setSubmitting(false);
        alert("An account with this email already exists. Please login or use another email.");
        return;
      }

      // hash password (synchronous)
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync(password, salt);

      const newUser = {
        id: Date.now(),
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: hashed,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // optionally auto-login after registration: create a simple token and save
      const token = btoa(`${newUser.id}:${newUser.email}:${Date.now()}`); // simple demo token
      localStorage.setItem("auth_token", token);
      localStorage.setItem("auth_user", JSON.stringify({ id: newUser.id, email: newUser.email, firstName: newUser.firstName }));

      setSubmitting(false);
      // navigate to dashboard (or login flow)
      navigate(dashboardPath);
    } catch (err) {
      console.error("Register error:", err);
      setSubmitting(false);
      alert("Something went wrong while registering. Check console.");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT */}
      <aside className="relative bg-gradient-to-b from-[#5c038d] to-[#7009b3] p-8 flex items-start justify-start">
        <div className="absolute inset-0 auth-left-decor pointer-events-none opacity-30"></div>
        <div className="z-10 w-full max-w-lg mt-4">
          <h2 className="text-white font-bold text-4xl">View Flow</h2>
        </div>
      </aside>

      {/* RIGHT */}
      <main className="bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create an account</h1>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-purple-200"
                  autoComplete="given-name"
                  aria-required="true"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-purple-200"
                  autoComplete="family-name"
                  aria-required="true"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-purple-200"
                autoComplete="email"
                aria-required="true"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pr-12 px-4 py-3 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-4 focus:ring-purple-200"
                autoComplete="new-password"
                aria-required="true"
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-9 transform -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 rounded-md"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.09-5.815M3 3l18 18" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 11.25A3.993 3.993 0 0012 9c-.7 0-1.36.16-1.95.45" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-b from-[#5c038d] to-[#7009b3] text-white font-semibold shadow-sm hover:opacity-95 disabled:opacity-70"
            >
              {submitting ? "Please wait..." : "Sign up"}
            </button>
          </form>

          <div className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to={loginPath} className="font-medium text-purple-700 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

