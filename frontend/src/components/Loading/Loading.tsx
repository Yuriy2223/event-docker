import { AnimatedPage } from "../AnimatedBackground/AnimatedBackground";

export const Loading = () => {
  return (
    <AnimatedPage
      className="flex items-center justify-center"
      orbCount={6}
      orbSize="lg"
    >
      <div className="relative group">
        <div className="absolute -inset-8 bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000 animate-pulse"></div>

        <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-transparent border-t-violet-500 border-r-rose-500 border-b-amber-500 border-l-emerald-500 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-transparent border-t-rose-400 border-r-amber-400 border-b-violet-400 border-l-emerald-400 rounded-full animate-spin animation-direction-reverse"></div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-700 via-rose-600 to-amber-600 bg-clip-text text-transparent mb-2">
              Loading...
            </h2>
            <p className="text-slate-600 font-medium">
              Preparing something amazing
            </p>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-rose-500 animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};
