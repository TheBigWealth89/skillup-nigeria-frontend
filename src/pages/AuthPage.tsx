import React, { useState } from "react";
import { motion, cubicBezier } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import LoginForm from "@/auth/LoginForm";
import SignupForm from "@/auth/SignupForm";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"learner" | "instructor">("learner");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    identifier: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    rememberMe: false,
  });
  console.log("Current Role:", userType);
  const navigate = useNavigate();
  const { login, signUp, isLoading, error: authError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const loggedInUser = await login(
          formData.identifier,
          formData.password
        );

        if (loggedInUser) {
          switch (loggedInUser.role) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "instructor":
              navigate("/instructor/dashboard");
              break;
            case "learner":
            default:
              navigate("/learner/dashboard");
              break;
          }
        }
      } catch (err) {
        console.error("Login attempt failed in component:", err);
        throw err;
      }
    } else {
      try {
        await signUp({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          roles: userType,
        });
        // Responsive, beautiful toast for signup success

        toast({
          title: (
            <span className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <svg
                width="22"
                height="22"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="12"
                  fill="#22c55e"
                  className="dark:fill-green-400"
                />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#fff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Signup Successful!
            </span>
          ),
          description: (
            <span className="block text-gray-700 dark:text-gray-200 text-sm sm:text-base">
              Please log in with your new credentials.
            </span>
          ),
          className:
            "border-0 bg-green-50 dark:bg-green-900/80 shadow-xl px-4 py-3 rounded-lg max-w-[90vw] sm:max-w-md w-full animate-pop-up flex flex-col gap-1 text-center sm:text-left",
          duration: 5000,
        });

        setIsLogin(true);

        // Clear form fields
        setFormData({
          identifier: "",
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          rememberMe: false,
        });
      } catch (err) {
        throw err;
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (field === "password") {
      // Simple password strength calculation
      let strength = 0;
      if (value.length >= 8) strength += 25;
      if (/[A-Z]/.test(value)) strength += 25;
      if (/[0-9]/.test(value)) strength += 25;
      if (/[^A-Za-z0-9]/.test(value)) strength += 25;
      setPasswordStrength(strength);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Animation variants (fix: use valid 'ease' values for framer-motion)
  const easeCustom = cubicBezier(0.42, 0, 1, 1);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeCustom,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.42, 0, 1, 1),
      },
    },
  };

  // Not used for now
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: easeCustom,
      },
    },
  };
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500";
    if (passwordStrength < 50) return "bg-orange-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Weak";
    if (passwordStrength < 50) return "Fair";
    if (passwordStrength < 75) return "Good";
    return "Strong";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full max-w-md"
      >
        <motion.div variants={cardVariants}>
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  {isLogin ? "Welcome Back!" : "Join SkillUp Nigeria"}
                </CardTitle>
                <p className="text-gray-600">
                  {isLogin
                    ? "Continue your learning journey"
                    : "Start your journey to success"}
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              {isLogin ? (
                <LoginForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  isLoading={isLoading}
                  authError={authError}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  passwordStrength={passwordStrength}
                />
              ) : (
                <SignupForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                  authError={authError}
                  userType={userType}
                  setUserType={setUserType}
                  avatar={avatar}
                  handleAvatarUpload={handleAvatarUpload}
                  passwordStrength={passwordStrength}
                  getPasswordStrengthColor={getPasswordStrengthColor}
                  getPasswordStrengthText={getPasswordStrengthText}
                />
              )}

              {/* Social Login */}
              <motion.div variants={fadeInUp} className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Google
                  </motion.button>
                  <motion.button
                    type="button"
                    className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Facebook
                  </motion.button>
                </div>
              </motion.div>

              {/* Toggle Auth Mode */}
              <motion.div variants={fadeInUp} className="text-center">
                <motion.button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  {isLogin
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Login"}
                </motion.button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
