import React from 'react';

const Button = ({ children, variant, size, className, onClick }) => {
  return (
    <button
      className={`${variant} ${size} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };
