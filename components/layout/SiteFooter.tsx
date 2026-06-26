import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 py-16 bg-card-bg overflow-hidden">
      <RevealOnScroll delay={0} className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="md:col-span-2">
          <div className="font-bold text-2xl font-mono mb-4 text-ink">
            Velocity AI
          </div>
          <p className="text-ink/70 max-w-sm mb-6">
            The AI-driven data automation platform that turns unstructured complexity into structured insight.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-ink mb-4">Product</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="#features" className="text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Features</a></li>
            <li><a href="#pricing" className="text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Pricing</a></li>
            <li><a href="#proof" className="text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Customers</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-ink mb-4">Company</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">About</a></li>
            <li><a href="#" className="text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Careers</a></li>
            <li><a href="#" className="text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Contact</a></li>
          </ul>
        </div>
      </RevealOnScroll>
      
      <RevealOnScroll delay={60} className="max-w-7xl mx-auto px-4 border-t border-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-ink/70">
          &copy; {new Date().getFullYear()} Velocity AI. All rights reserved.
        </p>
        <nav aria-label="Footer">
          <ul className="flex items-center gap-6">
            <li>
              <a href="#" className="text-sm text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="text-sm text-ink/70 hover:text-accent-secondary transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink">Terms of Service</a>
            </li>
          </ul>
        </nav>
      </RevealOnScroll>
    </footer>
  );
}
