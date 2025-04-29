"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function PricingSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const kpayDetails = {
    phone: "0938478837",
    name: "Zaw Htike Aung",
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(kpayDetails.phone);
    setCopied(true);

    toast({
      title: "Copied to clipboard",
      description: "KPay number has been copied to clipboard",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-card border rounded-xl p-8"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-muted-foreground">
                Perfect for occasional use
              </p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">Free</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>3 summaries per day</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>YouTube video summaries</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Article summaries</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Burmese language output</span>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full">
              <a href="/summarize">Get Started</a>
            </Button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-primary text-primary-foreground rounded-xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-primary-foreground text-primary px-3 py-1 text-xs font-semibold rounded-bl-lg">
              POPULAR
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-primary-foreground/80">For power users</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$5</span>
              <span className="text-primary-foreground/80">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 mt-0.5" />
                <span>Unlimited summaries</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 mt-0.5" />
                <span>YouTube video summaries</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 mt-0.5" />
                <span>Article summaries</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 mt-0.5" />
                <span>Burmese language output</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 mr-2 mt-0.5" />
                <span>Priority processing</span>
              </li>
            </ul>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => setIsDialogOpen(true)}
            >
              Get Pro Plan
            </Button>
          </motion.div>
        </div>
      </div>

      {/* KPay Payment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to Pro Plan</DialogTitle>
            <DialogDescription>
              Follow these steps to upgrade to the Pro Plan using KPay
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">KPay Payment Instructions:</h4>
              <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                <li>Open your KPay app</li>
                <li>Send $5 to the following account</li>
                <li>Include your email in the payment description</li>
                <li>Send payment screenshot to our page messenger</li>
              </ol>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-md">
                <div>
                  <p className="text-sm font-medium">KPay Number</p>
                  <p className="text-lg">{kpayDetails.phone}</p>
                </div>
                <Button variant="outline" size="icon" onClick={copyToClipboard}>
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <div className="p-3 border rounded-md">
                <p className="text-sm font-medium">Account Name</p>
                <p className="text-lg">{kpayDetails.name}</p>
              </div>
            </div>
            <div>
              <Button asChild className="w-full">
                <a
                  href="https://m.me/shinpyapr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  Send Payment Proof
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
