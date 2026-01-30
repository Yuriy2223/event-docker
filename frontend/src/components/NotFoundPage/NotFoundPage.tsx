import { Search } from "lucide-react";
import { AnimatedPage } from "../AnimatedBackground/AnimatedBackground";

export default function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleGoBack = () => window.history.back();

  return (
    <AnimatedPage
      className="flex items-center justify-center px-4"
      orbCount={8}
      orbSize="md"
    >
      <div className="relative group max-w-2xl mx-auto text-center">
        <div className="absolute -inset-8 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 transform  transition-transform duration-500">
          <div className="relative mb-8">
            <h1 className="text-9xl sm:text-[12rem] font-black bg-gradient-to-r from-violet-700 via-rose-600 to-amber-600 bg-clip-text text-transparent tracking-tight leading-none animate-pulse">
              404
            </h1>

            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full animate-bounce"></div>
            <div className="absolute -top-2 -right-8 w-6 h-6 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full animate-bounce animation-delay-300"></div>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full animate-bounce animation-delay-600"></div>
          </div>

          <div className="mb-8">
            <p className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">
              Oops! Page not found.
            </p>
            <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
              The page you're looking for seems to have vanished into the
              digital void. Let's get you back on track!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="group/btn relative overflow-hidden bg-gradient-to-r from-violet-500 to-rose-500 hover:from-violet-600 hover:to-rose-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-3"
              onClick={handleGoHome}
            >
              Go to Home
            </button>

            <button
              className="group/btn relative bg-white/60 hover:bg-white/80 backdrop-blur-sm text-slate-700 hover:text-violet-600 font-semibold py-4 px-8 rounded-2xl border border-slate-200/50 hover:border-violet-300/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-3"
              onClick={handleGoBack}
            >
              Go Back
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200/50">
            <div className="flex items-center justify-center space-x-2 text-slate-500">
              <Search className="w-5 h-5" />
              <span className="text-sm font-medium">
                Try searching for what you need
              </span>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
}
