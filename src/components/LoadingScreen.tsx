
import { Loader } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="text-center">
        <div className="relative mb-8">
          <Loader className="w-16 h-16 text-cyan-400 animate-spin mx-auto" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/30 rounded-full animate-pulse mx-auto"></div>
        </div>
        <h2 className="text-2xl font-bold gradient-text mb-4">Loading NeoLink</h2>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
