import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@asianode/shared/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold tracking-normal ring-offset-background transition-[background-color,color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-primary/15 bg-primary text-primary-foreground shadow-[0_8px_24px_-14px_hsl(var(--primary)/0.8)] hover:bg-primary/90 hover:shadow-[0_12px_30px_-14px_hsl(var(--primary)/0.72)]",
        destructive:
          "border-destructive/20 bg-destructive/12 text-danger hover:bg-destructive hover:text-destructive-foreground",
        outline:
          "border-border/75 bg-card/70 text-foreground hover:border-primary/40 hover:bg-accent/60",
        secondary:
          "border-secondary/30 bg-secondary/85 text-secondary-foreground hover:bg-secondary",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-accent/50 hover:text-foreground",
        link: "rounded-none border-transparent bg-transparent px-0 text-link underline-offset-4 hover:text-link hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-12 px-7",
        icon: "h-11 w-11 px-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
