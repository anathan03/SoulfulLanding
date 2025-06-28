import ContactFormPopup from "@/components/ContactForm";

export default function LandingPage() {
  return (
    <main>
      <section className="py-16">
        <h1 className="text-4xl font-bold text-center">From Burnout to Balance</h1>
        <p className="text-center text-lg text-gray-600 mt-4">
          A soulful self-care + study bundle for nurses.
        </p>
        <div className="mt-6 flex justify-center">
          <ContactFormPopup />
        </div>
      </section>

      {/* Other sections */}
    </main>
  );
}
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, BookOpen, Brain, Calendar, FileText, ShoppingBag, ExternalLink, Clock, Shield, CheckCircle } from "lucide-react";
import EmailPopup from "@/components/email-popup";
import { apiRequest } from "@/lib/queryClient";

export default function Landing() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 10000);

    // Show popup when scrolled past 50%
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent >= 50 && !hasScrolledPastThreshold) {
        setHasScrolledPastThreshold(true);
        setIsPopupOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolledPastThreshold]);

  const trackCTAClick = (buttonText: string, location: string) => {
    apiRequest("POST", "/api/analytics", {
      eventName: "CTA_Click",
      eventData: { button_text: buttonText, location }
    }).catch(console.error);
  };

  const handleEtsyClick = (buttonText: string, location: string) => {
    trackCTAClick(buttonText, location);
    window.open("https://studyflowco.etsy.com", "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 nurse-gradient-blue rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-800">StudyFlow Co</span>
            </div>
            <Button
              onClick={() => handleEtsyClick("Get Bundle Now", "nav")}
              className="nurse-gradient-blue text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Bundle Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                From <span className="text-nurse-blue">Burnout</span> to <span className="text-nurse-mint">Balance</span>
              </h1>
              <h2 className="text-xl sm:text-2xl text-gray-600 mb-8 leading-relaxed">
                The Ultimate Nurse Life Bundle<br />
                <span className="text-lg text-gray-500">A soulful self-care + study system for new, busy, or burned-out nurses</span>
              </h2>

              <div className="mb-8">
                <Button
                  onClick={() => handleEtsyClick("Get the Bundle for $6 on Etsy", "hero")}
                  className="nurse-gradient-blue text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4 inline-flex items-center"
                >
                  <ShoppingBag className="w-6 h-6 mr-2" />
                  Get the Bundle for $6 on Etsy
                </Button>
                <div className="text-sm text-gray-500 flex items-center justify-center lg:justify-start">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Refund guaranteed if not satisfied
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Peaceful nurse in modern healthcare setting" 
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-nurse-blue">$6</div>
                <div className="text-sm text-gray-600">Complete Bundle</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What's Inside Your Bundle</h2>
            <p className="text-xl text-gray-600">5 powerful tools to transform your nursing journey</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Component 1 */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
              <div className="w-16 h-16 nurse-gradient-blue rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">90-Day Soulful Gratitude Journal</h3>
              <p className="text-gray-600">Transform your mindset with daily gratitude practices designed specifically for healthcare heroes.</p>
            </Card>

            {/* Component 2 */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
              <div className="w-16 h-16 nurse-gradient-pink rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Burnout Recovery Journal</h3>
              <p className="text-gray-600">Guided exercises to help you recognize, process, and recover from workplace burnout.</p>
            </Card>

            {/* Component 3 */}
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
              <div className="w-16 h-16 nurse-gradient-mint rounded-2xl flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Free Mindfulness Exercises</h3>
              <p className="text-gray-600">Quick, effective mindfulness techniques you can use during breaks or between shifts.</p>
            </Card>

            {/* Component 4 */}
            <Card className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
              <div className="w-16 h-16 nurse-gradient-pink rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Study Flashcards</h3>
              <p className="text-gray-600">Quizlet sets covering Labs, Acid-Base, and Pharmacology for NCLEX success.</p>
            </Card>

            {/* Component 5 */}
            <Card className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0">
              <div className="w-16 h-16 nurse-gradient-mint rounded-2xl flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Self-Care Shift Planner</h3>
              <p className="text-gray-600">Google Sheets template to organize your shifts, budget, and self-care activities.</p>
            </Card>
          </div>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => handleEtsyClick("See it in action on Etsy", "product-showcase")}
              className="inline-flex items-center text-nurse-blue hover:text-nurse-lavender font-medium transition-colors duration-200"
            >
              See it in action on Etsy
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why This Helps Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=600" 
                alt="Organized medical study materials and peaceful workspace" 
                className="rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why This Bundle Changes Everything</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Created by someone who works alongside nurses daily, this bundle brings peace, structure, and clarity into their hectic days.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 nurse-gradient-blue rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Stress less with easy-to-follow self-care</h3>
                    <p className="text-gray-600">Simple, practical tools that fit into your busy schedule without adding more pressure.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 nurse-gradient-mint rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📋</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Prep smarter with high-yield NCLEX notes</h3>
                    <p className="text-gray-600">Focus your study time on what matters most with curated flashcards and materials.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 nurse-gradient-pink rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">📅</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay organized with shift and budget planners</h3>
                    <p className="text-gray-600">Take control of your schedule and finances with templates designed for nursing life.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgency Callout */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl p-8 text-center shadow-2xl border-0">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-white mr-3" />
              <h3 className="text-2xl font-bold text-white">Limited Time Offer</h3>
            </div>
            <p className="text-xl text-white mb-6">Only 15 bundles available — grab yours before they're gone.</p>
            <Button
              onClick={() => handleEtsyClick("Secure Your Bundle Now", "urgency")}
              className="bg-white text-red-500 px-8 py-3 rounded-2xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
            >
              Secure Your Bundle Now
              <ExternalLink className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <blockquote className="text-2xl text-gray-700 font-medium italic mb-6 leading-relaxed">
              "If it doesn't help you feel calmer or more organized, get a full refund. No questions asked."
            </blockquote>
            <p className="text-lg text-gray-600">We believe in the power of this bundle to transform your nursing journey. Try it risk-free.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 nurse-gradient-blue rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold">StudyFlow Co</span>
              </div>
              <p className="text-gray-400">Supporting nurses with soulful self-care and study resources.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <Separator className="bg-gray-800 mb-8" />

          <div className="text-center text-gray-400">
            <p>&copy; 2024 StudyFlow Co. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Email Opt-in Pop-up */}
      <EmailPopup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)} 
      />
    </div>
  );
}
