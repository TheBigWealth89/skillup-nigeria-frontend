import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, EyeOff, Upload, User, GraduationCap } from "lucide-react";

interface SignupFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  showPassword: boolean;
  authError: string | null;
  setShowPassword: (show: boolean) => void;
  userType: "learner" | "instructor";
  setUserType: (type: "learner" | "instructor") => void;
  avatar: string | null;
  handleAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordStrength: number;
  getPasswordStrengthColor: () => string;
  getPasswordStrengthText: () => string;
}

const SignupForm: React.FC<SignupFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  authError,
  userType,
  setUserType,
  avatar,
  handleAvatarUpload,
  passwordStrength,
  getPasswordStrengthColor,
  getPasswordStrengthText,
}) => {
  return (
    <motion.form onSubmit={handleSubmit} className="space-y-4">
      {/* User Type Selection */}
      <motion.div className="mb-6">
        <Label className="text-base font-semibold mb-3 block">
          Account Type
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            onClick={() => setUserType("learner")}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              userType === "learner"
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <User className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Learner</div>
          </motion.button>
          <motion.button
            type="button"
            onClick={() => setUserType("instructor")}
            className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              userType === "instructor"
                ? "border-green-500 bg-green-50 text-green-700"
                : "border-gray-200 hover:border-gray-300"
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <GraduationCap className="w-6 h-6 mx-auto mb-2" />
            <div className="text-sm font-medium">Instructor</div>
          </motion.button>
        </div>
      </motion.div>
      {/* Avatar Upload */}
      <motion.div className="flex flex-col items-center mb-6">
        <Label className="text-base font-semibold mb-3">Profile Picture</Label>
        <div className="relative">
          <Avatar className="w-20 h-20 border-4 border-white shadow-lg">
            <AvatarImage src={avatar || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-blue-400 to-green-400 text-white text-xl">
              {formData.firstName ? formData.firstName[0] : "👤"}
            </AvatarFallback>
          </Avatar>
          <motion.label
            className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </motion.label>
        </div>
        <p className="text-xs text-gray-500 mt-2">Max 2MB • JPG, PNG</p>
      </motion.div>
      {/* Name Fields */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter first name"
            required
            className="mt-1"
          />
        </motion.div>
        <motion.div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter last name"
            required
            className="mt-1"
          />
        </motion.div>
      </div>
      {/* Username */}
      <motion.div>
        <Label htmlFor="username">Username *</Label>
        <Input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleInputChange("username", e.target.value)}
          placeholder="Choose a unique username"
          required
          className="mt-1"
        />
        {formData.username && (
          <motion.p
            className="text-xs text-green-600 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✓ Username available
          </motion.p>
        )}
      </motion.div>
      {/* Email */}
      <motion.div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="Enter your email address"
          required
          className="mt-1"
        />
      </motion.div>
      {/* Password */}
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
            className="pr-10"
          />
          <motion.button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/4 text-gray-500 hover:text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
        </div>
        {formData.password && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between text-xs mb-1">
              <span>Password Strength</span>
              <span
                className={`font-medium ${
                  passwordStrength >= 75
                    ? "text-green-600"
                    : passwordStrength >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {getPasswordStrengthText()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                initial={{ width: 0 }}
                animate={{ width: `${passwordStrength}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 py-3 text-lg font-semibold"
        >
          Create Account
        </Button>
      </motion.div>

      {authError && (
        <motion.div className=" mt-4 p-3 rounded-md bg-red-100 text-red-700 text-center">
          {authError}
        </motion.div>
      )}
    </motion.form>
  );
};

export default SignupForm;
