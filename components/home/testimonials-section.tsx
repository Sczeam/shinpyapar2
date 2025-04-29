"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Kyaw Zin",
    role: "Student",
    content: "ရှင်းပြပါက ကျွန်တော့်အတွက် အချိန်ကိုအများကြီး ချွေတာပေးပါတယ်။ ဆရာတွေပေးတဲ့ ဗီဒီယိုတွေကို အချိန်တိုတိုနဲ့ နားလည်ဖို့ အရမ်းအသုံးဝင်ပါတယ်။",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Aye Mya",
    role: "Content Creator",
    content: "ကိုယ်အရင်ဖြတ်ပြီးဖတ်ရတဲ့ လေ့လာမှုတွေကို တစ်ဆင့်ပဲနဲ့ စုစည်းပေးလိုက်တာ အံ့ဩစရာပါပဲ။ ဘယ်လို content creator မဆို သုံးသင့်တဲ့ tool တစ်ခုဖြစ်ပါတယ်။",
    image: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Min Thu",
    role: "Business Owner",
    content: "စီးပွားရေးဆိုင်ရာ ဆောင်းပါးတွေကို အချိန်မပေးနိုင်တဲ့အခါ ရှင်းပြပါကို သုံးပြီး အကျဉ်းချုပ်ဖတ်ရတာ အရမ်းအဆင်ပြေပါတယ်။ Pro plan ဝယ်ထားတာ တန်ပါတယ်။",
    image: "https://i.pravatar.cc/100?img=8",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from people who use Shinpyapr to get more done
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <Quote className="h-10 w-10 text-primary/40 mb-4" />
                  <p className="mb-6 text-muted-foreground">
                    {testimonial.content}
                  </p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}