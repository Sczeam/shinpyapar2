"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              ရှင်းပြပါ <span className="text-primary">(Shinpyapr)</span>
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Summarize YouTube videos and articles in Burmese with just one click. 
              Save time and understand content better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href="/summarize">
                  Start Summarizing
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-3xl rounded-xl shadow-2xl shadow-primary/10 overflow-hidden bg-card border">
              <div className="absolute top-0 left-0 right-0 h-14 bg-muted flex items-center px-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                </div>
                <div className="mx-auto bg-background px-4 py-1 rounded-full text-xs">
                  shinpyapr.com/summarize
                </div>
              </div>
              <div className="pt-14 p-6">
                <div className="p-4 border rounded-lg mb-3">
                  <div className="h-10 bg-muted/50 rounded mb-4"></div>
                  <div className="h-6 bg-muted/30 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-muted/30 rounded w-2/3"></div>
                </div>
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="h-6 bg-primary/20 rounded w-5/6 mb-2"></div>
                  <div className="h-6 bg-primary/20 rounded w-4/5 mb-2"></div>
                  <div className="h-6 bg-primary/20 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}