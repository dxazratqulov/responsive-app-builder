import { Card } from "@/components/ui/card";

interface BalanceCardProps {
  label: string;
  amount: string;
  currency?: string;
}

export const BalanceCard = ({ label, amount, currency }: BalanceCardProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-secondary/50 shadow-lg border-0">
      <div className="space-y-2">
        <p className="text-muted-foreground text-sm">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold text-foreground">{amount}</span>
          {currency && <span className="text-lg text-muted-foreground">{currency}</span>}
        </div>
      </div>
    </Card>
  );
};