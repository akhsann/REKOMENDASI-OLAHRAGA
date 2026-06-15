import { Home, Heart, User, TrendingUp, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function Navigation() {
  const location = useLocation();

  const links = [
    { to: '/', icon: Home, label: 'Beranda' },
    { to: '/progress', icon: TrendingUp, label: 'Progres' },
    { to: '/favorites', icon: Heart, label: 'Favorit' },
    { to: '/reminder', icon: Bell, label: 'Pengingat' },
    { to: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border z-50 animate-slide-in-left">
      <div className="flex items-center h-16 w-full px-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;

          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 rounded-xl transition-all duration-300',
                isActive
                  ? 'text-primary scale-105'
                  : 'text-muted-foreground hover:text-foreground hover:scale-102'
              )}
            >
              <div className={cn('transition-all duration-300', isActive && 'scale-110')}>
                <Icon className={cn('h-[18px] w-[18px] transition-all duration-300', isActive && 'fill-primary/20')} />
              </div>
              <span className="text-[10px] font-medium leading-none">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
