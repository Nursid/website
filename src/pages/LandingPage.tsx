import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import FeaturedModules from "@/components/FeaturedModules";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        
        <section id="features">
          <WhyChooseUs />
        </section>
        
        <section id="how-it-works">
          <HowItWorks />
        </section>
        
        <section id="modules">
          <FeaturedModules />
        </section>
        
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="pricing">
          <Pricing />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;