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
    <header className="bg-header text-header-foreground px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onBack}
            className="text-header-foreground hover:bg-white/10 h-8 w-8"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-medium">{title}</h1>
      </div>
      
      {showMenu && (
        <Button 
          variant="ghost" 
          size="icon"
          className="text-header-foreground hover:bg-white/10 h-8 w-8"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      )}
    </header>
  );
};