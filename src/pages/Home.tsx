import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COURSE_CATEGORIES, ROUTES } from "@/constants";

const Home: React.FC = () => {
  const stats = [
    { label: "Active Learners", value: "10,000+" },
    { label: "Expert Instructors", value: "500+" },
    { label: "Skills Taught", value: "50+" },
    { label: "Success Stories", value: "2,500+" },
  ];

  const featuredCourses = [
    {
      id: 1,
      title: "Digital Marketing Mastery",
      category: "Business",
      students: 1200,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      category: "Technology",
      students: 950,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      id: 3,
      title: "Fashion Design & Tailoring",
      category: "Fashion & Design",
      students: 800,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
  ];

  // Enhanced animation variants with realistic timing and easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const fadeInUpVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const slideInLeftVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const slideInRightVariants = {
    hidden: {
      opacity: 0,
      x: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.3,
      },
    },
  };

  const staggerChildrenVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white dark:bg-gradient-to-br dark:from-blue-900 dark:via-blue-800 dark:to-green-900 dark:text-blue-100 py-20 relative overflow-hidden">
        {/* Enhanced animated background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 50% 20%, rgba(255,255,255,0.1) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInLeftVariants}
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                variants={fadeInUpVariants}
              >
                Empower Your Future with
                <motion.span
                  className="text-yellow-300 block"
                  variants={pulseVariants}
                  animate="animate"
                >
                  SkillUp Nigeria
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl mb-8 text-blue-100 leading-relaxed"
                variants={fadeInUpVariants}
                transition={{ delay: 0.2 }}
              >
                Learn practical vocational skills from expert Nigerian
                instructors. Build a career, start a business, or enhance your
                expertise.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={staggerChildrenVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={scaleInVariants}>
                  <Link to={ROUTES.COURSES}>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="w-full sm:w-auto group relative overflow-hidden bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-8 py-4 text-lg rounded-full shadow-lg transform transition-all duration-300"
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        Explore Courses
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                      />
                    </Button>
                  </Link>
                </motion.div>

                <motion.div variants={scaleInVariants}>
                  <Link to="/auth">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full sm:w-auto border-2 border-white text-gray-700 hover:bg-white hover:text-blue-600 group px-8 py-4 text-lg rounded-full font-semibold transition-all duration-300"
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        Start Learning
                      </motion.span>
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideInRightVariants}
              className="relative"
            >
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="relative"
              >
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    rotateY: 3,
                    rotateX: 2,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="relative"
                  style={{ perspective: "1000px" }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
                    alt="Nigerian youth learning"
                    className="rounded-2xl shadow-2xl w-full transform-gpu"
                  />

                  {/* Enhanced floating success card */}
                  <motion.div
                    className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-400 to-orange-400 text-black p-6 rounded-2xl shadow-xl backdrop-blur-sm"
                    animate={{
                      y: [0, -8, 0],
                      rotate: [0, 1, -1, 0],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{ scale: 1.1, rotate: 2 }}
                  >
                    <motion.div
                      className="font-bold text-3xl"
                      animate={{
                        textShadow: [
                          "0 0 0px rgba(0,0,0,0.3)",
                          "2px 2px 4px rgba(0,0,0,0.3)",
                          "0 0 0px rgba(0,0,0,0.3)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      2,500+
                    </motion.div>
                    <div className="text-sm font-medium">Success Stories</div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-900 dark:to-green-950 dark:text-gray-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(34,197,94,0.03) 100%)",
              "linear-gradient(135deg, rgba(34,197,94,0.03) 0%, rgba(59,130,246,0.03) 100%)",
              "linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(34,197,94,0.03) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerChildrenVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={scaleInVariants}
                className="text-center group"
                whileHover={{
                  y: -12,
                  scale: 1.05,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-yellow-300 mb-3"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
                <motion.div
                  className="text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-yellow-300 transition-colors font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Course Categories */}
      <section className="py-20 bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:via-blue-950 dark:to-green-950 dark:text-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Popular Skill Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover the skills that are in high demand in Nigeria's growing
              economy
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildrenVariants}
          >
            {COURSE_CATEGORIES.slice(0, 10).map((category, index) => (
              <motion.div
                key={category}
                variants={scaleInVariants}
                whileHover={{
                  scale: 1.08,
                  y: -8,
                  rotateY: 5,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="p-6 text-center cursor-pointer hover:shadow-2xl transition-all duration-500 group relative overflow-hidden border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl">
                  <motion.div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-800/20 dark:to-green-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

                  <motion.div
                    className="text-4xl mb-4 relative z-10 drop-shadow-lg"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      delay: index * 0.2,
                      ease: "easeInOut",
                    }}
                  >
                    {index === 0 && "💻"}
                    {index === 1 && "💼"}
                    {index === 2 && "🌱"}
                    {index === 3 && "👗"}
                    {index === 4 && "🚗"}
                    {index === 5 && "🏗️"}
                    {index === 6 && "🏨"}
                    {index === 7 && "🏥"}
                    {index === 8 && "🎨"}
                    {index === 9 && "🍳"}
                  </motion.div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-yellow-300 transition-colors relative z-10 text-base tracking-wide">
                    {category}
                  </h3>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50 dark:bg-gradient-to-br dark:from-blue-950 dark:via-gray-900 dark:to-green-950 dark:text-gray-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(34,197,94,0.05) 100%)",
              "linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(59,130,246,0.05) 100%)",
              "linear-gradient(135deg, rgba(59,130,246,0.05) 0%, rgba(34,197,94,0.05) 100%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUpVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Start your learning journey with our most popular courses
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerChildrenVariants}
          >
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={scaleInVariants}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  rotateY: 3,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group relative border-0 bg-white/90 dark:bg-gradient-to-br dark:from-gray-800 dark:via-gray-900 dark:to-gray-900 dark:bg-opacity-95 backdrop-blur-md rounded-xl">
                  <motion.div className="relative overflow-hidden">
                    <motion.img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <motion.span
                        className="text-sm text-blue-600 dark:text-yellow-300 font-semibold px-3 py-1 bg-blue-50 dark:bg-yellow-900/60 rounded-full"
                        whileHover={{ scale: 1.05 }}
                      >
                        {course.category}
                      </motion.span>
                      <motion.div
                        className="flex items-center bg-yellow-50 dark:bg-yellow-800/60 px-2 py-1 rounded-full"
                        animate={{
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5,
                        }}
                      >
                        <span className="text-yellow-500 dark:text-yellow-300 text-sm">
                          ★
                        </span>
                        <span className="text-sm text-gray-700 dark:text-yellow-100 ml-1 font-medium">
                          {course.rating}
                        </span>
                      </motion.div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-yellow-300 transition-colors leading-tight">
                      {course.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">
                      {course.students.toLocaleString()} students enrolled
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 dark:from-yellow-700 dark:to-yellow-500 dark:hover:from-yellow-800 dark:hover:to-yellow-400 rounded-xl py-3 font-semibold dark:text-gray-900 dark:shadow-lg dark:shadow-yellow-900/30">
                        <motion.span
                          className="relative z-10"
                          whileHover={{ scale: 1.05 }}
                        >
                          View Course
                        </motion.span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                      </Button>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white dark:bg-gradient-to-br dark:from-green-900 dark:via-blue-900 dark:to-blue-950 dark:text-green-100 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(34,197,94,1) 0%, rgba(59,130,246,1) 100%)",
              "linear-gradient(45deg, rgba(59,130,246,1) 0%, rgba(34,197,94,1) 100%)",
              "linear-gradient(45deg, rgba(34,197,94,1) 0%, rgba(59,130,246,1) 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUpVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8 text-white dark:text-yellow-300 drop-shadow-lg"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.3)",
                  "0 0 40px rgba(255,255,255,0.6)",
                  "0 0 20px rgba(255,255,255,0.3)",
                ],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Ready to Transform Your Career?
            </motion.h2>

            <motion.p
              className="text-xl mb-10 leading-relaxed max-w-2xl mx-auto text-white dark:text-gray-200"
              variants={fadeInUpVariants}
              transition={{ delay: 0.2 }}
            >
              Join thousands of Nigerians who have already started their journey
              to success
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Link to="/auth">
                <Button
                  size="lg"
                  variant="secondary"
                  className="group relative overflow-hidden bg-white text-blue-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold rounded-full shadow-2xl"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    Start Learning Today
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.2 }}
                    transition={{ duration: 0.4 }}
                  />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
