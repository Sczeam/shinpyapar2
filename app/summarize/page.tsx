"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { 
  Sparkles, 
  Copy, 
  Check, 
  Link as LinkIcon,
  FileText, 
  Youtube, 
  Loader2 
} from "lucide-react";

import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SummarizePage() {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [contentType, setContentType] = useState<"article" | "youtube">("article");
  const { isSignedIn } = useUser();
  const { toast } = useToast();
  const summaryRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    setSummary("");
    setError("");

    try {
      const { data } = await axios.post("/api/summarize", {
        url: values.url,
      });

      setSummary(data.summary);
      
      // Detect content type based on URL
      if (values.url.includes("youtube.com") || values.url.includes("youtu.be")) {
        setContentType("youtube");
      } else {
        setContentType("article");
      }
    } catch (err: any) {
      console.error(err);
      
      if (err?.response?.data?.limitReached) {
        setIsDialogOpen(true);
      } else {
        setError(err?.response?.data?.error || "Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (summaryRef.current) {
      navigator.clipboard.writeText(summaryRef.current.innerText);
      setCopied(true);
      
      toast({
        title: "Copied to clipboard",
        description: "Summary has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const kpayDetails = {
    phone: "0938478837",
    name: "Zaw Htike Aung",
  };

  const copyKPayNumber = () => {
    navigator.clipboard.writeText(kpayDetails.phone);
    
    toast({
      title: "Copied to clipboard",
      description: "KPay number has been copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              ရှင်းပြပါ <span className="text-primary">(Shinpyapr)</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Paste any YouTube or article link to get a concise Burmese summary
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <Tabs defaultValue="url" className="mb-8">
                <TabsList className="grid grid-cols-1 mb-8">
                  <TabsTrigger value="url" className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>URL</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="url">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="url"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="flex">
                                <Input
                                  placeholder="Enter YouTube or article URL..."
                                  {...field}
                                  className="rounded-r-none"
                                  disabled={loading}
                                />
                                <Button 
                                  type="submit" 
                                  className="rounded-l-none"
                                  disabled={loading}
                                >
                                  {loading ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                  ) : (
                                    <Sparkles className="h-4 w-4 mr-2" />
                                  )}
                                  Summarize
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>

              {/* Status for non-logged in users */}
              {!isSignedIn && (
                <div className="flex items-center justify-between py-2 px-3 bg-muted rounded-md mb-6">
                  <div className="flex items-center">
                    <p className="text-sm text-muted-foreground">
                      Free users are limited to 3 summaries per day
                    </p>
                  </div>
                  <Badge variant="outline">Free Plan</Badge>
                </div>
              )}

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <AnimatePresence>
                {summary && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative">
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <Badge 
                          variant="outline" 
                          className="bg-background"
                        >
                          {contentType === "youtube" ? (
                            <Youtube className="h-3 w-3 mr-1" />
                          ) : (
                            <FileText className="h-3 w-3 mr-1" />
                          )}
                          {contentType === "youtube" ? "YouTube" : "Article"}
                        </Badge>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7 bg-background"
                          onClick={copyToClipboard}
                        >
                          {copied ? (
                            <Check className="h-3 w-3" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                      <div 
                        className="p-6 bg-primary/5 rounded-lg whitespace-pre-line text-foreground"
                        ref={summaryRef}
                      >
                        {summary}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />

      {/* Payment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade to Pro Plan</DialogTitle>
            <DialogDescription>
              You've reached the free usage limit. Upgrade to Pro for unlimited summaries.
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
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={copyKPayNumber}
                >
                  <Copy className="h-4 w-4" />
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
                  <LinkIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}