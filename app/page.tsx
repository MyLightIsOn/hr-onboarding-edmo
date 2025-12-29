import { WelcomeHero } from '@/components/landing/WelcomeHero';
import { RoleSelector } from '@/components/landing/RoleSelector';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <WelcomeHero />
        <RoleSelector />
      </div>
    </main>
  );
}
