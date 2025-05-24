import React from 'react';
import { Link, useRouter } from '@tanstack/react-router';

export const HeaderBar: React.FC = () => {
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const navItems = [
    { label: 'Home', to: '/' },
    { label: 'Posts', to: '/posts' },
    { label: 'Layout', to: '/layout' },
    { label: 'Invalid', to: '/invalid' },
    { label: 'Logout', to: '/logout' },
    { label: 'Youtube', to: '/youtube' },
  ];

  return (
    <header style={{
      width: '100%',
      background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
      padding: '0 24px',
      boxShadow: '0 2px 8px #e3f2fd',
      display: 'flex',
      alignItems: 'center',
      height: 56,
      position: 'sticky',
      top: 0,
      zIndex: 1000,
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', height: '100%', width: '100%' }}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            style={{
              color: currentPath === item.to ? '#fff' : '#e3f2fd',
              fontWeight: currentPath === item.to ? 700 : 500,
              fontSize: 18,
              textDecoration: 'none',
              marginRight: 28,
              padding: '8px 0',
              borderBottom: currentPath === item.to ? '3px solid #fff' : '3px solid transparent',
              transition: 'color 0.2s, border-bottom 0.2s',
              letterSpacing: 1,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};
