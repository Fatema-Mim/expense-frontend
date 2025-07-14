"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import auth from "../../image/auth.png";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        data
      );
      const token = res.data.token;
      const fullname = res.data.user.fullname;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("fullname", fullname);

      router.push("/dashboard"); // ✅ Redirect after login
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setServerError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500 mb-6">
            Please enter your details to log in
          </p>

          {serverError && (
            <p className="text-sm text-red-600 mb-4 text-center">
              {serverError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 px-4 py-2 border rounded"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 px-4 py-2 border rounded"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
              />
              <div
                className="absolute top-3 right-3 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            Don’t have an account?{" "}
            <Link href="/register" className="text-blue-500 underline">
              Register
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-purple-100">
        <Image
          src={auth}
          alt="Auth illustration"
          className="max-w-[80%] object-contain"
        />
      </div>
    </div>
  );
}
