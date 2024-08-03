"use client";
import Submit from "./Submit";
import { Input } from "@mui/material";
import { Checkbox } from "@mui/material";
import Link from "next/link";
import { useFormState } from "react-dom";
import { signinUser } from "@/actions/auth";

const Signin = () => {
  const [state, action] = useFormState(signinUser, {
    error: null,
    message: null,
  });
  return (
    <div className="item-center p-28">
      <div className="flex gap-5 mb-6">
        <div>icon</div>
        <h1 className="font-semibold text-2xl ">Book Rent</h1>
      </div>
      <div className="font-semibold mb-8">
        <p>Login into Book Rent</p>
        <hr className=" border-gray-300" />
      </div>
      <hr />
      <form action={action} className="grid gap-0.5">
        <div>
          <label htmlFor="email">Email address</label>
          <Input
            id="email"
            type="email"
            name="email"
            className="border-gray-400"
          />
          {state.error?.email && (
            <p className="text-sm text-red-500">{state.error?.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            className="border-gray-400"
          />
          {state.error?.password && (
            <p className="text-sm text-red-500">{state.error?.password}</p>
          )}
        </div>
        <div className="items-center flex space-x-2 my-4">
          <Checkbox id="remember" name="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        {state.error?.remember && (
          <p className="text-sm text-red-500">{state.error?.remember}</p>
        )}
        <Submit label="LOGIN" />
        <p className="text-center my-4">
          Have not an account?{" "}
          <Link href="/signup" className="text-cyan-600">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
