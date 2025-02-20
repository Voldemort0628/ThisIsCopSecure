"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <>
      <h2 className="text-3xl font-bold">Welcome back</h2>
      <p className="text-muted-foreground mt-2 mb-8">
        Sign in to your account to continue
      </p>
      
      <div className="provider-card rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-pink-500 hover:text-pink-400"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full glow-button bg-gradient-to-r from-pink-500 to-purple-500"
          >
            Sign in
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-pink-500 hover:text-pink-400"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}