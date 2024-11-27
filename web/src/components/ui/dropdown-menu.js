import React from 'react';

const DropdownMenu = ({ children }) => {
  return <div className="dropdown">{children}</div>;
};

const DropdownMenuTrigger = ({ children }) => {
  return <div className="dropdown-trigger">{children}</div>;
};

const DropdownMenuContent = ({ children, align, className }) => {
  return (
    <div className={`dropdown-content ${align} ${className}`}>
      {children}
    </div>
  );
};

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent };
