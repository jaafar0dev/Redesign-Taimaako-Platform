import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Home, Mail, Lock, ArrowLeft } from "lucide-react";
import { Logo } from "../Logo";

interface WorkerLoginProps {
  onLogin: (email: string) => void;
  onSignUp: () => void;
  onBack: () => void;
}

export function WorkerLogin({ onLogin, onSignUp, onBack }: WorkerLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <Logo className="h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold">Worker Login</h2>
          <p className="text-muted-foreground">Access your worker dashboard</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span>Remember me</span>
              </label>
              <button type="button" className="text-primary hover:underline">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>
        </Card>

        <Card className="p-4 text-center">
          <p className="text-sm text-muted-foreground mb-3">New to Taimaako?</p>
          <Button variant="outline" className="w-full" onClick={onSignUp}>
            Apply to Become a Worker
          </Button>
        </Card>

        <p className="text-xs text-center text-muted-foreground">
          By signing in, you agree to our Terms & Conditions and Privacy Policy
        </p>
      </div>
    </div>
  );
}
