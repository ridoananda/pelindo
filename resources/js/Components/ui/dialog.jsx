import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Komponen Dialog untuk modal dialog
 */
const Dialog = forwardRef(({ children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));
Dialog.displayName = "Dialog";

const DialogTrigger = forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props}>
    {children}
  </div>
));
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
DialogContent.displayName = "DialogContent";

const DialogHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogTitle = forwardRef(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

const DialogDescription = forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger };
