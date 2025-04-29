"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { Menu, X, Sparkles, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useUser();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ရှင်းပြပါ</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link 
              href="/summarize" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Summarize
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "fixed inset-0 top-[57px] bg-background z-40 md:hidden transition-transform duration-300 transform",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col p-6 space-y-6">
          <Link 
            href="/" 
            className="text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/summarize" 
            className="text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Summarize
          </Link>
          <div className="py-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <Button>Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;