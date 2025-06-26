
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Glowing 404 */}
        <div className="relative mb-8">
          <h1 className="text-8xl md:text-9xl font-bold gradient-text mb-4 animate-pulse-neon">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-cyan-400/20 blur-xl">
            404
          </div>
        </div>

        {/* Error message */}
        <div className="card-neon mb-8 p-8">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-yellow-400 mr-2" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Page Not Found
            </h2>
          </div>
          <p className="text-lg text-gray-300 mb-2">
            Oops! The page you're looking for doesn't exist in our digital realm.
          </p>
          <p className="text-sm text-gray-400">
            Route: <code className="bg-gray-800 px-2 py-1 rounded text-cyan-400">{location.pathname}</code>
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="btn-neon w-full sm:w-auto">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400 w-full sm:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>

        {/* Decorative elements */}
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
