import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  size?: "default" | "sm" | "lg";
}

export const PrimaryButton = ({ 
  children, 
  onClick, 
  disabled, 
  className,
  type = "button",
  size = "default"
}: PrimaryButtonProps) => {
  return (
    <Button
      type={type}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-6 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50",
        className
      )}
    >
      {children}
    </Button>
  );
};