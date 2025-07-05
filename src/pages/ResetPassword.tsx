import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import authService from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!token) {
      setMessage("No reset token found. Please request a new link.");
      return;
    }

    if (password !== passwordConfirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.resetPassword(token, password, passwordConfirm);
      setSuccess(true);
      setMessage(
        "Password has been reset successfully! Redirecting to login..."
      );
      setTimeout(() => navigate("/auth"), 3000);
    } catch (err: any) {
      setMessage(
        err?.response?.data?.message ||
          "Failed to reset password. The link may have expired."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
      {success ? (
        <div className="p-3 rounded-md text-center bg-green-100 text-green-700 mb-4">
          Password has been reset successfully! Redirecting to login...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              required
              className="mt-1 w-full"
            />
          </div>
          <div>
            <Label htmlFor="passwordConfirm">Confirm New Password</Label>
            <Input
              id="passwordConfirm"
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm new password"
              required
              className="mt-1 w-full"
            />
          </div>
          {message && (
            <div
              className={`p-3 rounded-md text-center ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      )}
    </div>
  );
};

export default ResetPasswordPage;
