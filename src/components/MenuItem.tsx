import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
  className?: string;
}

export const MenuItem = ({ icon: Icon, title, onClick, className }: MenuItemProps) => {
  return (
    <Card className={cn("p-0 bg-card shadow-sm border border-border hover:bg-accent/50 transition-colors", className)}>
      <Button 
        variant="ghost" 
        className="w-full h-auto p-4 justify-between text-left font-normal"
        onClick={onClick}
      >
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-foreground">{title}</span>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </Button>
    </Card>
  );
};