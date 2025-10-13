import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, Star, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { OnboardingData } from "@/pages/OnboardingPage";

interface PaymentStepProps {
  data: OnboardingData;
  updateData: (data: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const plans = [
  {
    id: "family",
    name: "Family Plan",
    price: "49",
    originalPrice: "79",
    period: "month",
    description: "Perfect for growing families",
    features: [
      "Access to ALL 50+ modules",
      "Progress tracking for 5 children",
      "Advanced AI personalization", 
      "Parent-child activities",
      "Priority support",
      "Detailed analytics"
    ],
    badge: "Most Popular",
    discount: "38% OFF First Month"
  },
  {
    id: "starter",
    name: "Starter Plan", 
    price: "29",
    period: "month",
    description: "Great for getting started",
    features: [
      "Access to 10 modules",
      "Progress tracking for 2 children",
      "Basic AI personalization",
      "Email support",
      "Parent dashboard"
    ]
  }
];

const PaymentStep = ({ data, updateData, onNext }: PaymentStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState("family");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  const handleSubmit = () => {
    updateData({ plan: selectedPlan });
    onNext();
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-accent to-accent-glow rounded-2xl flex items-center justify-center">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-card-foreground mb-2">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground">
          Start your 14-day free trial today. Cancel anytime, no questions asked.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Plan Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Plans */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">
              Select Your Plan
            </h3>
            
            <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
              {plans.map((plan) => (
                <div key={plan.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={plan.id} id={plan.id} />
                  <Label htmlFor={plan.id} className="flex-1 cursor-pointer">
                    <div className={`
                      p-6 rounded-2xl border-2 transition-all duration-300
                      ${selectedPlan === plan.id 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-border hover:border-primary/50'
                      }
                    `}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-card-foreground">
                              {plan.name}
                            </h4>
                            {plan.badge && (
                              <Badge className="bg-gradient-to-r from-primary to-primary-glow">
                                {plan.badge}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {plan.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-primary">
                              ${plan.price}
                            </span>
                            <span className="text-muted-foreground">/{plan.period}</span>
                          </div>
                          {plan.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${plan.originalPrice}
                            </div>
                          )}
                          {plan.discount && (
                            <Badge variant="outline" className="text-xs mt-1 border-accent text-accent">
                              {plan.discount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-2">
                        {plan.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-accent flex-shrink-0" />
                            <span className="text-card-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Method */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-card-foreground">
              Payment Method
            </h3>
            
            <div className="bg-card rounded-2xl p-6 shadow-lg space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="w-4 h-4" />
                    Credit / Debit Card
                  </Label>
                </div>
              </RadioGroup>
              
              {paymentMethod === "card" && (
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="cardName">Cardholder Name</Label>
                    <Input
                      id="cardName"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-3xl p-6 shadow-lg sticky top-8">
            <h3 className="text-xl font-semibold text-card-foreground mb-6">
              Order Summary
            </h3>
            
            {selectedPlanData && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-card-foreground">{selectedPlanData.name}</span>
                  <span className="font-semibold">${selectedPlanData.price}/{selectedPlanData.period}</span>
                </div>
                
                {selectedPlanData.discount && (
                  <div className="flex justify-between text-accent">
                    <span>First Month Discount</span>
                    <span>-$30</span>
                  </div>
                )}
                
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Today</span>
                    <span className="text-primary">$0.00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    14-day free trial, then ${selectedPlanData.price}/{selectedPlanData.period}
                  </p>
                </div>
              </div>
            )}
            
            {/* Trust Indicators */}
            <div className="mt-6 pt-6 border-t border-border space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-accent" />
                <span>256-bit SSL encryption</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-warning" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="w-4 h-4 text-accent" />
                <span>Cancel anytime</span>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit}
              variant="hero" 
              size="lg" 
              className="w-full mt-6 group"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform ml-2" />
            </Button>
            
            <p className="text-xs text-muted-foreground text-center mt-3">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStep;