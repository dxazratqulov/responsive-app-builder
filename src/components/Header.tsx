import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showMenu?: boolean;
}

export const Header = ({ title, showBack = false, onBack, showMenu = true }: HeaderProps) => {
  return (
    <header className="bg-gradient-header text-header-foreground px-4 py-4 flex items-center justify-between shadow-md relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />
      
      <div className="flex items-center gap-3 relative z-10">
        {showBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-header-foreground hover:bg-white/15 h-9 w-9 rounded-full transition-all duration-200 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      </div>
      
      {showMenu && (
        <Button 
          variant="ghost" 
          size="icon"
          className="text-header-foreground hover:bg-white/15 h-9 w-9 rounded-full transition-all duration-200 hover:scale-105 relative z-10"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      )}
    </header>
  );
};