import React, { useState, useEffect } from "react";
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
  Calendar,
  ChevronDown,
  Clock,
  ExternalLink
} from "lucide-react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Page = "dashboard" | "subscription" | "card-input" | "profile" | "payment-history" | "faq";

interface UserProfile {
  is_subscribed: boolean;
  rest_of_days: number;
}

const Index = () => {
  const [currentPage, setCurrentPage] = useState<Page>("dashboard");
  const [showCardForm, setShowCardForm] = useState(false);
  const [paginationPage, setPaginationPage] = useState(1);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract API key from URL parameters
  const getApiKeyFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('x_api_key');
  };

  // Fetch user profile data
  const fetchUserProfile = async () => {
    const apiKey = getApiKeyFromUrl();
    
    if (!apiKey) {
      setError("Siz hali ro'yhatdan o'tmagansiz");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://abbosxons-bot.xazratqulov.uz/api/common/profile/me/', {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        setError("Siz hali ro'yhatdan o'tmagansiz");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        throw new Error('API xatolik');
      }

      const data: UserProfile = await response.json();
      setUserProfile(data);
      setError(null);
    } catch (err) {
      setError("Siz hali ro'yhatdan o'tmagansiz");
    } finally {
      setLoading(false);
    }
  };

  // Fetch profile data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

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

  const renderDashboard = () => {
    // Show error message if API key is missing or API returns 401
    if (error) {
      return (
        <div className="min-h-screen bg-background">
          <Header title="Parallel Muhit" showBack={false} />
          
          <div className="p-4 space-y-4">
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <ExternalLink className="h-8 w-8 text-destructive" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">Xatolik yuz berdi</h3>
                <p className="text-muted-foreground">{error}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Show loading state
    if (loading) {
      return (
        <div className="min-h-screen bg-background">
          <Header title="Parallel Muhit" showBack={false} />
          
          <div className="p-4 space-y-4">
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-8 h-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <p className="text-muted-foreground">Ma'lumotlar yuklanmoqda...</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background">
        <Header title="Parallel Muhit" showBack={false} />
        
        <div className="p-4 space-y-4">
          <BalanceCard 
            label="Obuna tugashiga"
            amount={userProfile?.rest_of_days?.toString() || "0"}
            currency="kun"
          />

          {/* Subscription Renewal Prompt - Only show if not subscribed */}
          {userProfile && !userProfile.is_subscribed && (
            <Card className="p-8 bg-gradient-warning border-0 shadow-lg relative overflow-hidden animate-scale-in">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full" />
              
              <div className="text-center space-y-6 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-warning-foreground">Obunani yangilaysizmi?</h3>
                  <p className="text-warning-foreground/90 text-sm">Sizning obunangiz tugash arafasida</p>
                </div>
                
                <div className="flex gap-4 w-full">
                  <Button 
                    className="flex-1 bg-card hover:bg-card-accent text-foreground shadow-md hover:shadow-lg border border-white/20 py-6 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => handleNavigation("subscription")}
                  >
                    Ha
                  </Button>
                  <Button 
                    className="flex-1 bg-card hover:bg-card-accent text-foreground shadow-md hover:shadow-lg border border-white/20 py-6 rounded-2xl font-semibold transition-all duration-200 hover:scale-[1.02]"
                    onClick={() => {}}
                  >
                    Yo'q
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            <MenuItem 
              icon={Edit3} 
              title="Ma'lumotlarni o'zgartirish"
              onClick={() => handleNavigation("profile")}
            />
            <MenuItem 
              icon={CreditCard} 
              title="To'lovlar tarixi"
              onClick={() => handleNavigation("payment-history")}
            />
            <MenuItem 
              icon={FileText} 
              title="Shartnoma"
              onClick={() => {}}
            />
            <MenuItem 
              icon={HelpCircle} 
              title="FAQ"
              onClick={() => handleNavigation("faq")}
            />
            <MenuItem 
              icon={MessageCircle} 
              title="Aloqa"
              onClick={() => window.open("https://t.me/Xazratqulov_Diyorbek", "_blank")}
            />
          </div>
        </div>
      </div>
    );
  };

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

  const renderPaymentHistory = () => {
    const paymentsPerPage = 10;
    
    // Mock data - replace with real API data
    const payments = [
      { id: 1, date: "2024-01-15", amount: 67000, status: "Muvaffaqiyatli" },
      { id: 2, date: "2023-12-15", amount: 67000, status: "Muvaffaqiyatli" },
      { id: 3, date: "2023-11-15", amount: 67000, status: "Muvaffaqiyatli" },
    ];

    const totalPages = Math.ceil(payments.length / paymentsPerPage);
    const startIndex = (paginationPage - 1) * paymentsPerPage;
    const currentPayments = payments.slice(startIndex, startIndex + paymentsPerPage);

    return (
      <div className="min-h-screen bg-background">
        <Header title="To'lovlar tarixi" showBack={true} onBack={handleBack} />
        
        <div className="p-4 space-y-4">
          {payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">To'lovlar topilmadi</h3>
                <p className="text-muted-foreground">Hozircha hech qanday to'lov amalga oshirilmagan</p>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {currentPayments.map((payment) => (
                  <Card key={payment.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-success/15 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{payment.status}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {payment.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{payment.amount.toLocaleString()} UZS</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="pt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => setPaginationPage(Math.max(1, paginationPage - 1))}
                          className={paginationPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={page === paginationPage}
                            onClick={() => setPaginationPage(page)}
                            className="cursor-pointer"
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => setPaginationPage(Math.min(totalPages, paginationPage + 1))}
                          className={paginationPage === totalPages ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const renderFAQ = () => {
    const faqs = [
      {
        question: "Obuna qanday to'lanadi?",
        answer: "Obuna UzCard, Humo kartalar orqali Click to'lov tizimi yoki chet-el kartalar orqali Tribute to'lov tizimi orqali to'lanadi."
      },
      {
        question: "Obuna summasi qancha?",
        answer: "Oylik obuna summasi 67,000 so'm."
      },
      {
        question: "Obunani qanday bekor qilishim mumkin?",
        answer: "Obunani bekor qilish uchun admin bilan bog'laning yoki profil bo'limidan obunani to'xtatishingiz mumkin."
      },
      {
        question: "Pul qaytarib berilishini?",
        answer: "Foydalanilmagan vaqt uchun pul qaytarib berilmaydi. Obuna yakunida avtomatik to'xtatiladi."
      },
      {
        question: "Texnik yordam qanday olishim mumkin?",
        answer: "Texnik yordam uchun bizning admin bilan bog'laning yoki FAQ bo'limini ko'rib chiqing."
      }
    ];

    return (
      <div className="min-h-screen bg-background">
        <Header title="FAQ" showBack={true} onBack={handleBack} />
        
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Collapsible key={index}>
                <CollapsibleTrigger asChild>
                  <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground text-left">{faq.question}</h3>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 p-4 bg-muted/30">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
          
          <Card className="p-6 bg-gradient-card border-0 shadow-lg">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Savolingiz topilamadimi?</h3>
              <p className="text-muted-foreground">Bizning admin bilan bog'laning</p>
              <Button 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.open("https://t.me/Xazratqulov_Diyorbek", "_blank")}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Admin bilan bog'lanish
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  };

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
    case "payment-history":
      return renderPaymentHistory();
    case "faq":
      return renderFAQ();
    default:
      return renderDashboard();
  }
};

export default Index;
