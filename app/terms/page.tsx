"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TermsOfUse() {
  const sections = [
    "Agreement to Terms",
    "Intellectual Property Rights",
    "User Representations",
    "User Registration",
    "Content Policy and Enforcement",
    "Purchases and Payment",
    "Return/Refunds Policy",
    "Prohibited Activities",
    "User Generated Contributions",
    "Mobile Application License",
    "Social Media",
    "Third-Party Websites and Content",
    "Site Management",
    "Privacy Policy",
    "DMCA Notice and Policy",
    "Term and Termination",
    "Governing Law",
    "Dispute Resolution",
    "Disclaimer",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className="container mx-auto p-6 md:p-12  mt-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Table of Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <nav className="space-y-2">
                    {sections.map((section, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          scrollToSection(
                            section.toLowerCase().replace(/[^a-z0-9]/g, "-")
                          )
                        }
                        className="block w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors p-2 rounded hover:bg-muted"
                      >
                        {section}
                      </button>
                    ))}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <h1 className="text-3xl font-bold">iSabiTV</h1>
                  <Badge variant="outline">Terms of Use</Badge>
                </div>
                <p className="text-muted-foreground">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <section id="agreement-to-terms" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Agreement to Terms
                  </h2>
                  <p className="mb-4">
                    This document, the Terms of Use, is a binding legal
                    agreement between you ("User") and iSabiTV Media ("Company",
                    "we", "us", "our"). It governs your access to and use of our
                    digital properties, including the iSabiTV Mobile App and
                    Website, along with any associated media forms, channels, or
                    applications (collectively referred to as the "Platform").
                  </p>
                  <p className="mb-4">
                    By accessing the Platform, you acknowledge that you have
                    read, understood, and agree to be bound by these Terms. If
                    you do not agree with all these Terms of Use, then you are
                    expressly prohibited from using the Site and you must
                    discontinue use immediately.
                  </p>
                  <p>
                    We reserve the right to amend these Terms at any time, and
                    your continued use of our services constitutes acceptance of
                    such amendments.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="intellectual-property-rights" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Intellectual Property Rights
                  </h2>
                  <p className="mb-4">
                    The Platform, encompassing all its content, software, and
                    trademarks (collectively, "Content"), is the exclusive
                    property of iSabiTV Media or its licensors. The Content is
                    protected by intellectual property laws.
                  </p>
                  <p>
                    You are granted a limited, non-commercial license to access
                    the Content, subject to these Terms. Any commercial use of
                    the Content without prior written consent from us is
                    strictly prohibited.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="user-representations" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    User Representations
                  </h2>
                  <p className="mb-4">
                    By using the Platform, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Your registration information is truthful and accurate
                    </li>
                    <li>You will maintain the accuracy of such information</li>
                    <li>
                      You have the legal capacity to enter into these Terms
                    </li>
                    <li>You are at least 13 years of age</li>
                    <li>
                      You will use the Platform in compliance with all
                      applicable laws and regulations
                    </li>
                  </ul>
                </section>

                <Separator className="my-6" />

                <section id="user-registration" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    User Registration
                  </h2>
                  <p>
                    You agree to maintain the confidentiality of your account
                    password and accept responsibility for all activities that
                    occur under your account. We reserve the right to remove or
                    alter usernames we deem inappropriate.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="content-policy-and-enforcement" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Content Policy and Enforcement
                  </h2>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <h3 className="font-semibold text-red-800 mb-2">
                      Zero-Tolerance Policy
                    </h3>
                    <p className="text-red-700">
                      We enforce a strict zero-tolerance policy against
                      sexualized content, including but not limited to nudity,
                      sexually suggestive language, and attire that detracts
                      from the content's message.
                    </p>
                  </div>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Content flagged by users is subject to administrative
                      review for compliance with our policy
                    </li>
                    <li>
                      Decisions regarding content violations, particularly those
                      involving explicit sexual content, are final and not
                      subject to appeal
                    </li>
                  </ul>

                  <h3 className="font-semibold mt-6 mb-3">
                    Consequences of Policy Violations
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Violations may result in immediate content removal,
                      account suspension, or deletion
                    </li>
                    <li>
                      Repeat offenses will lead to a permanent ban from the
                      Platform
                    </li>
                    <li>
                      We reserve the right to suspend monetization rights for
                      content associated with policy violations
                    </li>
                  </ul>
                </section>

                <Separator className="my-6" />

                <section id="purchases-and-payment" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Purchases and Payment
                  </h2>
                  <p className="mb-4">
                    We accept the following forms of payment: credit card,
                    PayPal, Apple Pay, Purchase Order and Stride. You agree to
                    provide current, complete, and accurate purchase and account
                    information for all purchases made via the Site.
                  </p>
                  <p className="mb-4">
                    You agree to pay all charges at the prices then in effect
                    for your purchases and any applicable shipping fees, and you
                    authorize us to charge your chosen payment provider for any
                    such amounts upon placing your order.
                  </p>
                  <p>
                    We reserve the right to refuse any order placed through the
                    Site. We may, in our sole discretion, limit or cancel
                    quantities purchased per person, per household, or per
                    order.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="return-refunds-policy" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Return/Refunds Policy
                  </h2>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-semibold text-amber-800">
                      All sales are final, and no refund will be issued.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="prohibited-activities" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Prohibited Activities
                  </h2>
                  <p className="mb-4">
                    Users of the Platform are strictly prohibited from:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Posting, sharing, or distributing any content that
                      includes nudity, sexualization, or sexually suggestive
                      material
                    </li>
                    <li>
                      Engaging in activities that promote or glorify sexually
                      explicit material
                    </li>
                    <li>
                      Conducting themselves in a manner that violates our
                      zero-tolerance policy towards sexualized content
                    </li>
                    <li>
                      Using the Platform for any illegal, deceptive, or
                      unauthorized purposes
                    </li>
                    <li>
                      Infringing on the intellectual property rights or privacy
                      of others
                    </li>
                  </ul>
                </section>

                <Separator className="my-6" />

                <section id="user-generated-contributions" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    User Generated Contributions
                  </h2>
                  <p className="mb-4">
                    The Site may invite you to chat, contribute to, or
                    participate in blogs, message boards, online forums, and
                    other functionality. When you create or make available any
                    Contributions, you represent and warrant that:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      The creation and distribution of your Contributions do not
                      infringe proprietary rights of any third party
                    </li>
                    <li>
                      You are the creator and owner or have necessary licenses
                      and permissions
                    </li>
                    <li>
                      You have written consent for any identifiable individuals
                      in your Contributions
                    </li>
                    <li>
                      Your Contributions are not false, inaccurate, or
                      misleading
                    </li>
                    <li>
                      Your Contributions are not spam, advertising, or
                      promotional materials
                    </li>
                    <li>
                      Your Contributions are not obscene, violent, harassing, or
                      otherwise objectionable
                    </li>
                    <li>
                      Your Contributions do not violate any applicable law or
                      regulation
                    </li>
                  </ul>
                </section>

                <Separator className="my-6" />

                <section id="mobile-application-license" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Mobile Application License
                  </h2>
                  <p className="mb-4">
                    If you access the Site via a mobile application, we grant
                    you a revocable, non-exclusive, non-transferable, limited
                    right to install and use the mobile application on wireless
                    electronic devices owned or controlled by you.
                  </p>
                  <p className="mb-4">You shall not:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>
                      Decompile, reverse engineer, or disassemble the
                      application
                    </li>
                    <li>
                      Make modifications or derivative works from the
                      application
                    </li>
                    <li>
                      Use the application for revenue generating endeavors
                    </li>
                    <li>Remove or alter proprietary notices</li>
                    <li>
                      Use the application to send automated queries or spam
                    </li>
                  </ul>
                </section>

                <Separator className="my-6" />

                <section id="social-media" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                  <p className="mb-4">
                    You may link your account with third-party service
                    providers. By granting us access to any Third-Party
                    Accounts, you understand that we may access, make available,
                    and store any content from your Third-Party Account.
                  </p>
                  <p>
                    Your relationship with third-party service providers is
                    governed solely by your agreement(s) with such providers.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="third-party-websites-and-content" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Third-Party Websites and Content
                  </h2>
                  <p className="mb-4">
                    The Site may contain links to other websites and third-party
                    content. Such content is not investigated, monitored, or
                    checked for accuracy by us, and we are not responsible for
                    any Third Party Websites or Content.
                  </p>
                  <p>
                    You should review the applicable terms and policies of any
                    website to which you navigate from the Site.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="site-management" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Site Management
                  </h2>
                  <p className="mb-4">
                    We reserve the right, but not the obligation, to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      Monitor the Site for violations of these Terms of Use
                    </li>
                    <li>Take appropriate legal action against violators</li>
                    <li>
                      Refuse, restrict access to, or disable any of your
                      Contributions
                    </li>
                    <li>
                      Remove files that are excessive in size or burdensome to
                      our systems
                    </li>
                    <li>Manage the Site to protect our rights and property</li>
                  </ul>
                </section>

                <Separator className="my-6" />

                <section id="privacy-policy" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Privacy Policy</h2>
                  <p className="mb-4">
                    We care about data privacy and security. Please review our
                    Privacy Policy at www.iSabiTV.com/privacypolicy. By using
                    the Site, you agree to be bound by our Privacy Policy.
                  </p>
                  <p>
                    Please be advised the Site is hosted in the United States.
                    We do not knowingly accept information from children under
                    13 years of age.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="dmca-notice-and-policy" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    DMCA Notice and Policy
                  </h2>
                  <p className="mb-4">
                    We respect intellectual property rights. If you believe
                    material on our Site infringes your copyright, please notify
                    our Designated Copyright Agent.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Designated Copyright Agent:
                    </h3>
                    <p className="text-blue-700">
                      iSabiTV Media
                      <br />
                      info@isabitv.com
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="term-and-termination" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Term and Termination
                  </h2>
                  <p className="mb-4">
                    These Terms shall remain in effect while you use the Site.
                    We reserve the right to deny access to and use of the Site
                    to any person for any reason, including breach of these
                    Terms.
                  </p>
                  <p>
                    We may terminate your use or participation in the Site at
                    any time, without warning, in our sole discretion.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="governing-law" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
                  <p>
                    These Terms of Use are governed by and construed in
                    accordance with the laws of the State of Arizona applicable
                    to agreements made and performed within the State of
                    Georgia.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="dispute-resolution" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">
                    Dispute Resolution
                  </h2>
                  <h3 className="font-semibold mb-3">Informal Negotiations</h3>
                  <p className="mb-4">
                    The Parties agree to first attempt to negotiate any Dispute
                    informally for at least 180 days before initiating
                    arbitration.
                  </p>

                  <h3 className="font-semibold mb-3">Binding Arbitration</h3>
                  <p className="mb-4">
                    If informal negotiations fail, disputes will be resolved by
                    binding arbitration under the Commercial Arbitration Rules
                    of the American Arbitration Association (AAA).
                  </p>
                  <p>
                    The arbitration will take place in New York, NY, except
                    where otherwise required by applicable AAA rules or law.
                  </p>
                </section>

                <Separator className="my-6" />

                <section id="disclaimer" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                    <p className="text-sm">
                      THE SITE IS PROVIDED ON AN "AS-IS" AND "AS-AVAILABLE"
                      BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM
                      ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE
                      SITE AND YOUR USE THEREOF, INCLUDING THE IMPLIED
                      WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                      PURPOSE, AND NON-INFRINGEMENT.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t">
                  <p>© 2024 iSabiTV Media. All rights reserved.</p>
                  <p className="mt-2">
                    For questions about these Terms of Use, please contact:
                    info@isabitv.com
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
