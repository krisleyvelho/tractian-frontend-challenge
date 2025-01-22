import { cn } from '@/app/utils/cn';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap text-sm font-bold rounded-sm ',
  {
    variants: {
      variant: {
        default:
          'bg-defaultBlue text-white hover:bg-activeBlue data-[selected=true]:bg-activeBlue text-nowrap ',
        ghost:
          'bg-transparent rounded-sm text-title-inactive-color border border-defaultSlate  data-[selected=true]:bg-activeBlue data-[selected=true]:text-white',
        itemTree:
          'flex hover:bg-activeBlue hover:text-white justify-between p-1 data-[selected=true]:bg-activeBlue data-[selected=true]:text-white w-full',
      },
      size: {
        default: 'h-7 text-sm px-2',
        md: 'h-10 py-1.5 pl-3.5 pr-4',
        none: ''
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariants & {
    icon?: ReactNode;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, icon, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), className)}
        ref={ref}
        {...props}
      >
        {icon && <div className=" pr-2 fill-defaultBlue">{icon}</div>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
