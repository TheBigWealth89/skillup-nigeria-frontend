import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import auth from '@/services/auth';
import { useToast } from "@/hooks/use-toast";

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await auth.resetPassword(email)
      toast({
        title: "Success!",
        description: "Password reset link has been sent to your email!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className=''>
      <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="space-y-4 min-h-[220px] flex flex-col justify-center">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="mt-1 w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>
    </div>

  </div>  );
};

export default ResetPassword;