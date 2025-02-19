import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserRole } from '../../types/auth';

interface NavLinksProps {
  role: UserRole;
}

export const NavLinks: React.FC<NavLinksProps> = ({ role }) => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? 'border-b-2 border-white' : 'border-b-2 border-transparent'} block py-2`;

  if (role === 'HOD') {
    return (
      <div className="flex sm:flex-row flex-col sm:gap-5 gap-2">
        <NavLink to={`/${role}/dashboard`} className={linkClass}>Dashboard</NavLink>
        <NavLink to={`/${role}/QuickHelp`} className={linkClass}>QuickHelp</NavLink>
        
      </div>
    );
  }

  if (role === 'FACULTY') {
    return (
      <div className="flex sm:flex-row flex-col sm:gap-5 gap-2">
         <NavLink to={`/${role}/dashboard`} className={linkClass}>Dashboard</NavLink>
         <NavLink to={`/${role}/QuickHelp`} className={linkClass}>QuickHelp</NavLink>
      </div>
    );
  }

  if (role === 'DIRECTOR') {
    return (
      <div className="flex sm:flex-row flex-col sm:gap-5 gap-2">
         <NavLink to={`/${role}/dashboard`} className={linkClass}>Dashboard</NavLink>
         <NavLink to={`/${role}/QuickHelp`} className={linkClass}>QuickHelp</NavLink>
      </div>
    );
  }

  return null;
};