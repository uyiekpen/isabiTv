"use client";

import React from "react";
import type { ReactElement } from "react";
import { useActionState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  HelpCircle,
  Users,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import { submitContactForm, type ContactFormResult } from "./action";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch with our team",
    contact: "hello@isabitv.com",
    action: "mailto:hello@isabitv.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our support team",
    contact: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    contact: "123 Community Street, Atlanta, GA 30309",
    action: "#",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "Monday - Friday",
    contact: "9:00 AM - 6:00 PM EST",
    action: "#",
  },
];

const faqItems = [
  {
    icon: Users,
    question: "How do I become a creator on iSabiTV?",
    answer:
      "Simply sign up for an account and complete our creator verification process. We review applications to ensure alignment with our community values and content standards.",
  },
  {
    icon: Shield,
    question: "What are your content guidelines?",
    answer:
      "We maintain strict standards against vulgar or overly sexualized content. Our platform focuses on educational, inspirational, and culturally enriching content that empowers Black communities.",
  },
  {
    icon: MessageCircle,
    question: "How can I report inappropriate content?",
    answer:
      "Use the report button on any video or contact us directly. We take community safety seriously and review all reports promptly.",
  },
  {
    icon: HelpCircle,
    question: "Do you offer technical support for creators?",
    answer:
      "Yes! We provide comprehensive support for video uploads, account management, and platform features. Contact us for personalized assistance.",
  },
];

export default function ContactPage(): ReactElement {
  const [state, formAction, isPending] = useActionState<
    ContactFormResult | null,
    FormData
  >(submitContactForm, null);
  const { toast } = useToast();

  // Show toast when form submission completes
  React.useEffect(() => {
    if (state?.success) {
      toast({
        title: "Message sent successfully!",
        description: state.message,
        duration: 5000,
      });
    } else if (state?.error) {
      toast({
        title: "Error sending message",
        description: state.error,
        variant: "destructive",
        duration: 5000,
      });
    }
  }, [state, toast]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center bg-black text-white">
          <div className="absolute inset-0">
            <Image
              src="/auth.jpg"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container relative z-10 px-4 text-center">
            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Contact Us
            </h1>
            <p className="text-base sm:text-lg opacity-90">
              We're here to help you succeed on iSabiTV.
              <br className="hidden sm:block" />
              Reach out with questions, feedback, or partnership inquiries.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="p-2 md:p-12">
          <div className="container flex justify-center">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-8 w-full">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center w-full h-full flex flex-col justify-between rounded-xl transition-all duration-300 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                      <info.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                    <CardDescription>{info.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {info.action.startsWith("#") ? (
                      <p className="text-sm font-medium">{info.contact}</p>
                    ) : (
                      <a
                        href={info.action}
                        className="text-sm font-medium text-green-600 hover:underline"
                      >
                        {info.contact}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form and FAQ */}
        <section className="bg-muted/50 p-2 md:p-12 flex justify-center">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Form */}
              <div>
                <Card className="rounded-xl">
                  <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you as soon
                      as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Success/Error Message Display */}
                    {state?.success && (
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <p className="text-green-800 text-sm">
                          {state.message}
                        </p>
                      </div>
                    )}

                    {state?.error && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <p className="text-red-800 text-sm">{state.error}</p>
                      </div>
                    )}

                    <form action={formAction} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            required
                            disabled={isPending}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your@email.com"
                            required
                            disabled={isPending}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <select
                          id="inquiryType"
                          name="inquiryType"
                          disabled={isPending}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="creator">Creator Support</option>
                          <option value="technical">Technical Issue</option>
                          <option value="partnership">Partnership</option>
                          <option value="content">Content Report</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Brief description of your inquiry"
                          required
                          disabled={isPending}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Please provide details about your inquiry..."
                          rows={5}
                          required
                          disabled={isPending}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-green-600 text-white hover:bg-green-700"
                        disabled={isPending}
                      >
                        {isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          "Send Message"
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ */}
              <div>
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-muted-foreground">
                    Find quick answers to common questions about iSabiTV.
                  </p>
                </div>

                <div className="space-y-4">
                  {faqItems.map((item, index) => (
                    <Card key={index} className="rounded-xl">
                      <CardHeader>
                        <div className="flex items-start space-x-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                            <item.icon className="h-4 w-4 text-green-600" />
                          </div>
                          <CardTitle className="text-base leading-snug break-words">
                            {item.question}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed break-words">
                          {item.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-6 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="mb-2 font-semibold">
                      Still have questions?
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Can't find what you're looking for? Our community team is
                      here to help.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full bg-green-600 text-white hover:bg-green-700"
                      asChild
                    >
                      <a href="mailto:hello@isabitv.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Support
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
