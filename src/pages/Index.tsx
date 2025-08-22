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
        <Card className="p-6 bg-card border-2 border-warning/20">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Obunani yangilaysizmi?</h3>
            
            <div className="flex gap-3">
              <PrimaryButton 
                className="flex-1 bg-primary hover:bg-primary-hover"
                onClick={() => handleNavigation("subscription")}
              >
                Ha
              </PrimaryButton>
              <Button 
                variant="outline" 
                className="flex-1 py-6 border-2 hover:bg-muted"
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
        <div className="space-y-2">
          <p className="text-muted-foreground">Obuna narxi</p>
          <p className="text-4xl font-bold text-foreground">67 000 UZS</p>
        </div>

        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Parallel muhit</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Eksklyuziv kontent</p>
                <p className="text-sm text-muted-foreground">Matnlar, savol-javoblar va rivoylanishingizga yordam beradigan videolar</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Parallel muhit</p>
                <p className="text-sm text-muted-foreground">Fikrlash va o'sish istagidagi odamlar bilan muloqot qilish imkoni.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-foreground">Haftasiga yangi 2ta insho</p>
                <p className="text-sm text-muted-foreground">Har dushanba va payshanba kunlari rivoylanish uchun insholar.</p>
              </div>
            </div>
          </div>
        </Card>

        <div>
          <p className="text-muted-foreground mb-4">To'lov turi</p>
          <RadioGroup defaultValue="uzcard" className="space-y-3">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="foreign" id="foreign" />
                <Label htmlFor="foreign" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-gradient-to-r from-red-500 to-orange-400 rounded-sm"></div>
                    <div className="w-8 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                      <span className="text-white text-xs font-bold">V</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">Chet-el kartasi</p>
                    <p className="text-sm text-muted-foreground">Tribute orqali</p>
                  </div>
                </Label>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="uzcard" id="uzcard" />
                <Label htmlFor="uzcard" className="flex items-center gap-3 cursor-pointer flex-1">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-5 bg-gradient-to-r from-blue-600 to-green-500 rounded-sm"></div>
                    <div className="w-8 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-sm"></div>
                  </div>
                  <div>
                    <p className="font-medium">UZCARD / Humo</p>
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
        <h2 className="text-xl font-semibold text-foreground">Bank kartasi ma'lumotlarini kiriting</h2>
        
        <div className="space-y-4">
          <div>
            <Input 
              placeholder="0000 0000 0000 0000" 
              className="text-lg py-6 rounded-xl border-2"
            />
          </div>
          
          <div>
            <Input 
              placeholder="MM/YY" 
              className="text-lg py-6 rounded-xl border-2"
            />
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground space-y-2">
          <p>Xavfsizlik maqsadida sizning bank kartangiz</p>
          <p>ma'lumotlari Click xizmatining serverlarida</p>
          <p>saqlanadi. Sizning shaxsingizga oid hech qanday</p>
          <p>ma'lumot saqlamaydi. <span className="text-primary underline">Click ofertasi</span></p>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-primary">click</span>
          </div>
        </div>

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
