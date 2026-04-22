import React from 'react';
import Button from '../atoms/Button';

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon, active, onClick }) => {
  return (
    <Button 
      variant={active ? 'primary' : 'secondary'} 
      onClick={onClick}
      className={active ? 'active-nav' : ''}
      style={{ 
        width: '100%', 
        justifyContent: 'flex-start',
        border: active ? 'none' : '1px solid transparent',
        background: active ? undefined : 'transparent',
      }}
    >
      {icon} {label}
    </Button>
  );
};

export default NavItem;
