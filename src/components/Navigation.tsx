import { Home, Heart, User, TrendingUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Beranda' },
    { to: '/progress', icon: TrendingUp, label: 'Progres' },
    { to: '/favorites', icon: Heart, label: 'Favorit' },
    { to: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50 animate-slide-in-left">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn('flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300', isActive ? 'text-primary scale-110' : 'text-muted-foreground hover:text-foreground hover:scale-105')}
            >
              <div className={cn('transition-all duration-300', isActive && 'animate-bounce-subtle')}>
                <Icon className={cn('h-5 w-5 transition-all duration-300', isActive && 'fill-primary/20')} />
              </div>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
