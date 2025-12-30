export function WelcomeHero() {
  return (
    <div className="text-center space-y-6 animate-in slide-in-from-bottom duration-700">
      <div className="inline-block">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-in zoom-in-95 duration-500 delay-100">
          ✨ Powered by Anthropic Agent Skills
        </div>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-in slide-in-from-bottom duration-700 delay-200">
        Welcome to{' '}
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AirOnboard
        </span>
      </h1>

      <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-in slide-in-from-bottom duration-700 delay-300">
        Your personalized onboarding experience, powered by AI
      </p>

      <p className="text-base text-gray-500 max-w-xl mx-auto animate-in slide-in-from-bottom duration-700 delay-400">
        Experience intelligent, role-aware guidance that adapts to your unique position.
        Select your role to begin your journey.
      </p>
    </div>
  );
}
