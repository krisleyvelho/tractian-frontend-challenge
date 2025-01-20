import { ReactNode } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  active?: boolean;
}


export function Button({ icon, children, active, className, ...props }: ButtonProps) {
  console.log("🚀 ~ Button ~ icon:", icon)
  let activeClassName;

  if (active) {
    activeClassName = 'bg-activeBlue text-white font-semibold hover:bg-defaultBlue';
  } else {
    activeClassName = 'bg-defaultBlue text-white font-semibold hover:bg-activeBlue';
  }

  return (
    <button className={` ${activeClassName} px-2 py-1 rounded-sm ${icon ? 'flex items-center gap-2 p-4 ' : ''} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  );
}
