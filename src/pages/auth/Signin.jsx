import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSignin } from '@/hooks/api/useSignin';

export const SigninContainer = () => {
  const navigate = useNavigate();

  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Added confirmPassword to the state
  });

  const { isPending, isSuccess, error, siginMutation } = useSignin();

  async function handleSubmit(e) {
    e.preventDefault(); // Correct usage of preventDefault without passing any argument.
    
    // Optional: You can add validation before sending
    if (signinForm.password !== signinForm.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await siginMutation({
      email: signinForm.email,
      password: signinForm.password,
    });
  }

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Sign In
        </h2>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"  // Ensure id is unique
            name="email"
            onChange={(e) => setSigninForm({ ...signinForm, email: e.target.value })}
            value={signinForm.email}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"  // Ensure id is unique
            name="password"
            onChange={(e) => setSigninForm({ ...signinForm, password: e.target.value })}
            value={signinForm.password}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"  // Ensure id is unique
            name="confirmPassword"
            onChange={(e) => setSigninForm({ ...signinForm, confirmPassword: e.target.value })}
            value={signinForm.confirmPassword}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Signin Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Sign In
        </button>

        <p className="text-s text-muted-foreground mt-4">
          Don't have an account?{" "}
          <span
            className="text-sky-600 hover:underline cursor-pointer"
            onClick={() => navigate("/auth/signup")}
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};
