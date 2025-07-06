import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants";
import { Bell, GraduationCap } from "lucide-react";
import { courses } from "@/mock/courseMock";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<false | "search" | "avatar">(
    false
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      // Optionally show a toast or alert here
      // e.g. toast({ title: "Logout failed", description: "Please try again.", variant: "destructive" });
      console.error("Logout failed", error);
    }
  };

  // Filter courses by title (case-insensitive)
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="bg-background text-foreground shadow-md border-b border-border sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 w-full">
          <Link to="/">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  SkillUp Nigeria
                </h1>
              </div>
            </div>
          </Link>

          {/* Search Bar (centered, hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-center px-4">
            <form
              className="w-full max-w-md"
              onSubmit={(e) => e.preventDefault()}
              autoComplete="off"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses, topics..."
                  className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 shadow-sm text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 150)}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                    />
                  </svg>
                </button>
                {/* Dropdown results */}
                {showResults && searchQuery && (
                  <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {filteredCourses.length > 0 ? (
                      filteredCourses.slice(0, 6).map((course) => (
                        <div
                          key={course.id}
                          className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer flex items-center space-x-2"
                          onMouseDown={() => {
                            navigate(`/course/${course.id}`);
                            setShowResults(false);
                            setSearchQuery("");
                          }}
                        >
                          <img
                            src={course.coverImage}
                            alt={course.title}
                            className="w-8 h-8 rounded object-cover mr-2"
                          />
                          <span className="text-sm text-gray-900 dark:text-gray-100">
                            {course.title}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500 text-sm">
                        No courses found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Theme toggle only if user is logged in */}
            {user && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    />
                  </svg>
                )}
              </button>
            )}
            {user && (
              <Link to="/">
                <div
                  className="relative group px-4 py-2 cursor-pointer rounded-full font-medium text-gray-700 dark:text-gray-100 hover:text-white hover:bg-primary transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  style={{ minWidth: 100 }}
                >
                  <span className="flex items-center space-x-2">
                    <svg
                      className="w-5 h-5 text-blue-500 group-hover:text-white dark:text-blue-300 dark:group-hover:text-white transition-colors"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z"
                      />
                    </svg>
                    <span>Courses</span>
                  </span>
                  <span className="absolute left-[17%] -bottom-1 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-200 rounded-full"></span>
                </div>
              </Link>
            )}

            {user ? (
              <div className="flex items-center h-10 space-x-4">
                {/* Notification Bell with badge */}
                <div className="relative group mt-3 ">
                  <button className="relative focus:outline-none">
                    <Bell className="w-7 h-7 text-gray-600 hover:text-blue-600 transition-colors" />
                    {/* Notification badge (example: 3) */}
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                      3
                    </span>
                  </button>
                </div>

                {/* Profile dropdown */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none group/profile">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border border-gray-300 object-cover shadow-sm"
                      />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 font-bold text-lg uppercase border border-gray-300 dark:border-gray-600">
                        {user.username?.[0] || "U"}
                      </span>
                    )}
                  </button>
                  {/* Dropdown menu */}
                  <div className="absolute -right-1/2 mt-2 min-w-[250px] max-w-[360px] h-[180.333px] cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-150 shadow-md">
                    <div className="px-2 py-2  border-b mx-3">
                      <p className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {user.name.firstName} {user.name.lastName}
                      </p>
                      <p className="block text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm py-2 hover:rounded-md">
                        {user.username}
                      </p>
                    </div>

                    <div className="border-b mx-3">
                      <Link
                        to={ROUTES.ADMIN_DASHBOARD}
                        className="block px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm"
                      >
                        Dashboard
                      </Link>

                      <Link
                        to="/courses"
                        className="block px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm"
                      >
                        Courses
                      </Link>

                      <Link
                        to="/settings"
                        className="block px-2 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm"
                      >
                        Settings
                      </Link>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-800 text-sm ml-2 "
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth">
                  <Button
                    size="sm"
                    className="bg-primary hover:from-blue-700 hover:to-green-700"
                  >
                    Start Learning
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile search, notification, theme toggle, and avatar with dropdown */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Theme toggle only if user is logged in */}
            {user && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
                title={
                  theme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                }
              >
                {theme === "dark" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.66 4.95l-.71-.71M4.05 4.05l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                    />
                  </svg>
                )}
              </button>
            )}
            {/* Mobile search icon triggers a dropdown search */}
            <div className="relative">
              <button
                onClick={() =>
                  setIsMenuOpen(isMenuOpen === "search" ? false : "search")
                }
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
                aria-label="Open search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
              </button>
              {/* Mobile search dropdown */}
              {isMenuOpen === "search" && (
                <div
                  className="fixed inset-0 top-5 flex flex-col items-center justify-start z-50 p-4 bg-black/40"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-full max-w-lg mt-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
                    <form
                      className="w-full"
                      onSubmit={(e) => e.preventDefault()}
                      autoComplete="off"
                    >
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Search courses, topics..."
                          className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-sm text-base transition-all"
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowResults(true);
                          }}
                        />
                        <button
                          type="submit"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                            />
                          </svg>
                        </button>
                        {/* Dropdown results */}
                        {showResults && searchQuery && (
                          <div className="absolute left-0 right-0 mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                            {filteredCourses.length > 0 ? (
                              filteredCourses.slice(0, 6).map((course) => (
                                <div
                                  key={course.id}
                                  className="px-4 py-2 hover:bg-blue-50 dark:hover:bg-gray-800 cursor-pointer flex items-center space-x-2"
                                  onMouseDown={() => {
                                    navigate(`/course/${course.id}`);
                                    setShowResults(false);
                                    setSearchQuery("");
                                    setIsMenuOpen(false);
                                  }}
                                >
                                  <img
                                    src={course.coverImage}
                                    alt={course.title}
                                    className="w-8 h-8 rounded object-cover mr-2"
                                  />
                                  <span className="text-sm text-gray-900 dark:text-gray-100">
                                    {course.title}
                                  </span>
                                </div>
                              ))
                            ) : (
                              <div className="px-4 py-2 text-gray-500 text-sm">
                                No courses found.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            {/* Notification Bell with badge */}
            {user && (
              <div className="relative mt-2">
                <button className="relative focus:outline-none">
                  <Bell className="w-8 h-8 text-gray-600 hover:text-blue-600 transition-colors" />
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    3
                  </span>
                </button>
              </div>
            )}
            {/* Avatar with dropdown */}
            <div className="relative group">
              {user ? (
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() =>
                    setIsMenuOpen(isMenuOpen === "avatar" ? false : "avatar")
                  }
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="w-10 h-10 rounded-full border border-gray-300 object-cover shadow-sm"
                    />
                  ) : (
                    <span className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-600 dark:bg-blue-400 text-white dark:text-gray-900 font-bold text-lg uppercase border border-gray-300 dark:border-gray-600">
                      {user.username?.[0] || "U"}
                    </span>
                  )}
                </button>
              ) : (
                <Link to="/auth">
                  <Button
                    size="sm"
                    className="bg-primary hover:from-blue-700 hover:to-green-700"
                  >
                    Start Learning
                  </Button>
                </Link>
              )}
              {/* Dropdown menu for avatar */}
              {user && isMenuOpen === "avatar" && (
                <div className="absolute -right-1/2 mt-2 min-w-[250px] max-w-[360px] h-[180.333px] cursor-pointer bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg py-2 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto transition-opacity duration-150 shadow-md">
                  <div className="px-2 py-2  border-b mx-2">
                    <p className="font-semibold">
                      {user.name.firstName} {user.name.lastName}
                    </p>
                    <p className="block text-gray-700 hover:bg-blue-50 text-sm py-2 hover:rounded-md">
                      {user.username}
                    </p>
                  </div>

                  <Link
                    to={ROUTES.ADMIN_DASHBOARD}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/courses"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm"
                  >
                    Courses
                  </Link>

                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 text-sm border-t"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
