import { WelcomeHero } from '@/components/landing/WelcomeHero';
import { RoleSelector } from '@/components/landing/RoleSelector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 animate-in fade-in duration-500">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-12 animate-in slide-in-from-bottom duration-700">
          <WelcomeHero />
          <RoleSelector />
        </div>
      </div>
    </div>
  );
}
