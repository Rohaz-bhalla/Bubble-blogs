import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login as authLogin } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { useForm } from "react-hook-form";
import Logo from '../Logo';
import Input from './Input';
import Button from './Button';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("");
        try {
            // Optional: clear any existing session before new login
            await authService.logout();

            const session = await authService.login(data);
            console.log("✅ Login successful:", session);

            if (session) {
                const userData = await authService.getCurrentUser();
                console.log("✅ User data:", userData);

                if (userData) {
                    dispatch(authLogin(userData));
                    navigate("/");
                }
            }
        } catch (error) {
            console.error("❌ Login error:", error);
            setError(error?.message || "Something went wrong");
        }
    };

    return (
        <div className='flex items-center justify-center w-full'>
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
                    <Input
                        label="Email:"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            validate: {
                                matchPattern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Invalid email format",
                            },
                        })}
                    />

                    <Input
                        label="Password:"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />

                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
