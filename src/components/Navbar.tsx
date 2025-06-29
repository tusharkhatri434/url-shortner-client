
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, BarChart3, Settings, User, Menu, X, User2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {isAuthenticated} = useAuth();

  const navItems = [
    { path: "/", label: "Home", icon: LinkIcon },
    { path: "/manage", label: "Manage URLs", icon: Settings },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
    { path: "/about", label: "About", icon: User },
  ];

  return (
    <nav className="glass-effect border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LinkIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">NeoLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "text-cyan-400 bg-cyan-500/10"
                    : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          {(!isAuthenticated)?
          (<div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="btn-neon">Sign Up</Button>
            </Link>
          </div>):null}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "text-cyan-400 bg-cyan-500/10"
                      : "text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              {(!isAuthenticated) ? (<div className="pt-4 flex flex-col space-y-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start text-gray-300">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="btn-neon w-full">Sign Up</Button>
                </Link>
              </div>):null}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
