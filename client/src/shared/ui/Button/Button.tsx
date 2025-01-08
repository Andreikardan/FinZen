import type { ReactNode } from 'react';
import React from 'react';

type Props = {
  className?: string;
  text?: string;
  color?: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
  children?: ReactNode |React.ReactElement;
};

export  function Button({
  className,
  text,
  color,
  disabled,
  icon,
  onClick,
  type = 'button',
  children,
}: Props): React.ReactElement {
  return (
    <div onClick={onClick}>
      <button
      className={className}
        type={type}
        style={{ backgroundColor: color }}
        disabled={disabled}
      >
        {icon && <img src={icon} width={20} />}
        {text}
        {children}
      </button>
    </div>
  );
}