"use client";

import { 
  Youtube, 
  FileText, 
  Sparkles, 
  Zap,
  Languages,
  Lock 
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "YouTube Summaries",
    description: "Get concise summaries of YouTube videos by simply pasting the link.",
    icon: <Youtube className="h-10 w-10 text-primary" />,
  },
  {
    title: "Article Summaries",
    description: "Summarize any online article or blog post with a simple click.",
    icon: <FileText className="h-10 w-10 text-primary" />,
  },
  {
    title: "Burmese AI",
    description: "Powered by Gemini 2.5 Flash AI model, optimized for Burmese language.",
    icon: <Sparkles className="h-10 w-10 text-primary" />,
  },
  {
    title: "Fast Processing",
    description: "Get your summaries in seconds, not minutes.",
    icon: <Zap className="h-10 w-10 text-primary" />,
  },
  {
    title: "Burmese Language",
    description: "Summaries are generated in Burmese, with natural language flow.",
    icon: <Languages className="h-10 w-10 text-primary" />,
  },
  {
    title: "Unlimited Access",
    description: "Upgrade to Pro for unlimited summaries and premium features.",
    icon: <Lock className="h-10 w-10 text-primary" />,
  },
];

export default function FeaturesSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Features
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Designed to help you understand content quickly and efficiently
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-card border rounded-xl p-6 transition-all hover:shadow-md"
              variants={item}
            >
              <div className="mb-4 p-2 rounded-full bg-primary/10 inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}