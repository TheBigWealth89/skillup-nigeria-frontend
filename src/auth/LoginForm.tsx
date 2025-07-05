import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

interface LoginFormData {
  identifier: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  formData: LoginFormData;
  handleInputChange: (
    field: keyof LoginFormData,
    value: string | boolean
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  passwordStrength: number;
  isLoading: boolean;
  authError: string | null;
  setResetPassword?: (value: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  isLoading,
  authError,
}) => {
  return (
    <motion.form onSubmit={handleSubmit} className="space-y-4">
      <motion.div>
        <Label htmlFor="email">Username or Email *</Label>
        <Input
          id="identifier"
          type="text"
          value={formData.identifier}
          onChange={(e) => handleInputChange("identifier", e.target.value)}
          placeholder="Enter your username or email"
          required
          disabled={isLoading}
          className="mt-1"
        />
      </motion.div>
      <motion.div>
        <Label htmlFor="password">Password *</Label>
        <div className="relative mt-1">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Enter your password"
            required
            disabled={isLoading}
            className="pr-10"
          />

          <motion.button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/4  text-gray-500 hover:text-gray-700"
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        </div>

        {authError && (
          <motion.div className=" mt-4 p-3 rounded-md bg-red-100 text-red-700 text-center">
            {authError}
          </motion.div>
        )}
      </motion.div>
      <motion.div className="flex justify-between items-center">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) =>
              handleInputChange("rememberMe", e.target.checked as any)
            }
            onChange={(e) => handleInputChange("rememberMe", e.target.checked)}
            className="mr-2"
          />
          Remember me
        </label>
        <motion.button
          type="button"
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          whileHover={{ scale: 1.05 }}
        >
          <Link to="/reset-password" className="text-blue-600 hover:text-blue-700">
            Forgot Password?
          </Link>
          <Link to="/reset-password">Forgot Password?</Link>
        </motion.button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 py-3 text-lg font-semibold"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </Button>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
