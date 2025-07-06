import React from "react";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  GithubIcon,
  TwitterIcon,
  GraduationCap,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-white">
                    SkillUp Nigeria
                  </h1>
                </div>
              </div>
            </Link>

            <p className="text-gray-300 mb-4 mt-4">
              Empowering Nigerian youth with accessible vocational training for
              a brighter future. Building skills, creating opportunities.
            </p>
            <div className="flex space-x-4">
              <p>
                <TwitterIcon />
              </p>
              <p className="">
                <FacebookIcon />
              </p>
              <p>
                <InstagramIcon />
              </p>
              <p>
                <GithubIcon />
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/courses"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Browse Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 SkillUp Nigeria. All rights reserved. Empowering Nigerian
            youth through quality vocational education.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
