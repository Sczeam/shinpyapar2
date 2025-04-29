import Link from "next/link";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ရှင်းပြပါ</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              Summarize YouTube videos and articles in Burmese using AI. 
              Get concise summaries to save time and understand content better.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/summarize" className="text-muted-foreground hover:text-foreground transition-colors">
                  Summarize
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-muted-foreground">
                info@shinpyapr.com
              </li>
              <li className="text-muted-foreground">
                Yangon, Myanmar
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} Shinpyapr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;