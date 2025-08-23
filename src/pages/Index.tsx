import React, { useState } from "react";
import { Header } from "@/components/Header";
import { BalanceCard } from "@/components/BalanceCard";
import { MenuItem } from "@/components/MenuItem";
import { PrimaryButton } from "@/components/PrimaryButton";
import { 
  Edit3, 
  CreditCard, 
  FileText, 
  HelpCircle, 
  MessageCircle,
  CheckCircle,
  Wallet,
  Calendar
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Page = "dashboard" | "subscription" | "card-input" | "profile";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [showCardForm, setShowCardForm] = useState(false);

  const handleNavigation = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    if (currentPage === "card-input") {
      setCurrentPage("subscription");
    } else {
      setCurrentPage("dashboard");
    }
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-background">
      <Header title="Parallel Muhit" showBack={false} />
      
      <div className="p-4 space-y-4">
        <BalanceCard 
          label="Obuna tugashiga"
          amount="0"
          currency="kun"
        />

        {/* Subscription Renewal Prompt */}
        <Card className="p-8 bg-gradient-warning border-0 shadow-lg relative overflow-hidden animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full" />
          
          <div className="text-center space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-warning-foreground">Obunani yangilaysizmi?</h3>
              <p className="text-warning-foreground/90 text-sm">Sizning obunangiz tugash arafasida</p>
            </div>
            
            <div className="flex gap-4">
              <PrimaryButton 
                className="flex-1 bg-card hover:bg-card-accent text-foreground shadow-md hover:shadow-lg border border-white/20"
                onClick={() => handleNavigation("subscription")}
              >
                Ha
              </PrimaryButton>
              <Button 
                variant="outline" 
                className="flex-1 py-6 border-2 border-white/30 text-warning-foreground hover:bg-white/10 hover:border-white/40 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.02]"
                onClick={() => {}}
              >
                Yo'q
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <MenuItem 
            icon={Edit3} 
            title="Ma'lumotlarni o'zgartirish"
            onClick={() => handleNavigation("profile")}
          />
          <MenuItem 
            icon={CreditCard} 
            title="To'lovlar tarixi"
            onClick={() => {}}
          />
          <MenuItem 
            icon={FileText} 
            title="Shartnoma"
            onClick={() => {}}
          />
          <MenuItem 
            icon={HelpCircle} 
            title="FAQ"
            onClick={() => {}}
          />
          <MenuItem 
            icon={MessageCircle} 
            title="Aloqa"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );

  const renderSubscription = () => (
    <div className="min-h-screen bg-background">
      <Header title="Parallel Muhit" showBack={true} onBack={handleBack} />
      
      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <p className="text-muted-foreground font-medium">Obuna narxi</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-foreground tracking-tight">67 000</span>
              <span className="text-xl text-muted-foreground font-medium">UZS</span>
            </div>
          </div>
        </div>

        <Card className="p-8 bg-gradient-card shadow-lg border-0 relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-success/5 rounded-full -translate-y-12 translate-x-12" />
          
          <div className="space-y-6 relative z-10">
            <h3 className="text-2xl font-bold text-foreground">Parallel muhit</h3>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground text-lg">Eksklyuziv kontent</p>
                  <p className="text-muted-foreground leading-relaxed">Matnlar, savol-javoblar va rivoylanishingizga yordam beradigan videolar</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground text-lg">Parallel muhit</p>
                  <p className="text-muted-foreground leading-relaxed">Fikrlash va o'sish istagidagi odamlar bilan muloqot qilish imkoni.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-success/15 flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-5 w-5 text-success" />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground text-lg">Haftasiga yangi 2ta insho</p>
                  <p className="text-muted-foreground leading-relaxed">Har dushanba va payshanba kunlari rivoylanish uchun insholar.</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <p className="text-muted-foreground font-medium text-lg">To'lov turi</p>
          <RadioGroup defaultValue="uzcard" className="space-y-4">
            <Card className="p-6 border-2 border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-200 hover:scale-[1.01] group">
              <div className="flex items-center space-x-4">
                <RadioGroupItem value="foreign" id="foreign" className="w-5 h-5" />
                <Label htmlFor="foreign" className="flex items-center gap-4 cursor-pointer flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-red-500 to-orange-400 rounded-md shadow-sm"></div>
                    <div className="w-10 h-6 bg-blue-600 rounded-md flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-bold">V</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Chet-el kartasi</p>
                    <p className="text-sm text-muted-foreground">Tribute orqali</p>
                  </div>
                </Label>
              </div>
            </Card>
            
            <Card className="p-6 border-2 border-primary/20 bg-primary/5 hover:border-primary/40 hover:shadow-md transition-all duration-200 hover:scale-[1.01] group">
              <div className="flex items-center space-x-4">
                <RadioGroupItem value="uzcard" id="uzcard" className="w-5 h-5" />
                <Label htmlFor="uzcard" className="flex items-center gap-4 cursor-pointer flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-green-500 rounded-md shadow-sm"></div>
                    <div className="w-10 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md shadow-sm"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">UZCARD / Humo</p>
                    <p className="text-sm text-muted-foreground">Click to'lov tizimi orqali</p>
                  </div>
                </Label>
              </div>
            </Card>
          </RadioGroup>
        </div>

        <PrimaryButton onClick={() => handleNavigation("card-input")}>
          Davom etish
        </PrimaryButton>
      </div>
    </div>
  );

  const renderCardInput = () => (
    <div className="min-h-screen bg-background">
      <Header title="Parallel Muhit" showBack={true} onBack={handleBack} />
      
      <div className="p-4 space-y-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Bank kartasi ma'lumotlarini kiriting</h2>
          
          <div className="space-y-5">
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Karta raqami</label>
              <Input 
                placeholder="0000 0000 0000 0000" 
                className="text-lg py-7 rounded-2xl border-2 focus:border-primary/50 transition-all duration-200 bg-card-accent"
              />
            </div>
            
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">Amal qilish muddati</label>
              <Input 
                placeholder="MM/YY" 
                className="text-lg py-7 rounded-2xl border-2 focus:border-primary/50 transition-all duration-200 bg-card-accent"
              />
            </div>
          </div>
        </div>

        <Card className="p-6 bg-gradient-secondary border-0 shadow-card">
          <div className="text-center text-sm text-muted-foreground space-y-2 leading-relaxed">
            <p>Xavfsizlik maqsadida sizning bank kartangiz</p>
            <p>ma'lumotlari Click xizmatining serverlarida</p>
            <p>saqlanadi. Sizning shaxsingizga oid hech qanday</p>
            <p>ma'lumot saqlamaydi. <span className="text-primary underline font-medium">Click ofertasi</span></p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-6">
            <span className="text-sm text-muted-foreground font-medium">Powered by</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center shadow-sm">
                <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
              </div>
              <span className="font-bold text-primary text-lg">click</span>
            </div>
          </div>
        </Card>

        <PrimaryButton>
          Kodini olish
        </PrimaryButton>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen bg-background">
      <Header title="Ma'lumotlarni o'zgartirish" showBack={true} onBack={handleBack} />
      
      <div className="p-4 space-y-4">
        <Collapsible>
          <CollapsibleTrigger asChild>
            <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Edit3 className="h-5 w-5 text-primary" />
                  <span className="font-medium">Karta raqamini o'zgartirish</span>
                </div>
                <span className="text-sm text-muted-foreground">▼</span>
              </div>
            </Card>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <Card className="mt-2 p-4 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Sizning hozirgi ulangan kartangiz</p>
                <p className="text-muted-foreground">Aktiv obuna topilmadi</p>
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">To'lov usulini yangilash</Label>
                </div>
                
                <div>
                  <Label htmlFor="cardNumber" className="text-sm font-medium">Karta raqami</Label>
                  <Input 
                    id="cardNumber"
                    placeholder="0000 0000 0000 0000" 
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="expiryDate" className="text-sm font-medium">Amal qilish muddati</Label>
                  <Input 
                    id="expiryDate"
                    placeholder="MM/YY" 
                    className="mt-1"
                  />
                </div>
                
                <PrimaryButton className="mt-4">
                  Tasdiqlash kodini olish
                </PrimaryButton>
              </div>
            </Card>
          </CollapsibleContent>
        </Collapsible>

        <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-medium">Akkauntni o'zgartirish</span>
            </div>
            <span className="text-sm text-muted-foreground">▶</span>
          </div>
        </Card>

        <PrimaryButton className="mt-8">
          Orqaga
        </PrimaryButton>
      </div>
    </div>
  );

  // Show dashboard by default
  React.useEffect(() => {
    setCurrentPage("dashboard");
  }, []);

  switch (currentPage) {
    case "dashboard":
      return renderDashboard();
    case "subscription":
      return renderSubscription();
    case "card-input":
      return renderCardInput();
    case "profile":
      return renderProfile();
    default:
      return renderDashboard();
  }
};

export default Index;
