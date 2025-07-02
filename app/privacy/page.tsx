"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Mail,
  Eye,
  Lock,
  Users,
  FileText,
  ExternalLink,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PrivacyPolicy() {
  const sections = [
    "Information We May Collect",
    "How We Use and Share Information",
    "How We Protect Information",
    "Your Rights Regarding Personal Information",
    "Links to Other Websites",
    "Changes to Our Privacy Policy",
    "Contact Us",
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
      <div className="container mx-auto p-6 md:p-12 mt-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents - Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Table of Contents
                </CardTitle>
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
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold">iSabiTV</h1>
                  <Badge variant="outline">Privacy Policy</Badge>
                </div>
                <p className="text-muted-foreground">
                  Last updated: January 30th, 2024
                </p>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                {/* Introduction */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h2 className="text-lg font-semibold text-blue-800 mb-3">
                    Our Commitment to Privacy
                  </h2>
                  <p className="text-blue-700 mb-4">
                    iSabiTV Media (the "Company") is committed to maintaining
                    robust privacy protections for its users. Our Privacy Policy
                    is designed to help you understand how we collect, use and
                    safeguard the information you provide to us and to assist
                    you in making informed decisions when using our Service.
                  </p>
                  <p className="text-blue-700 text-sm">
                    By accessing our Site or Service, you accept our Privacy
                    Policy and Terms of Use and consent to our collection,
                    storage, use and disclosure of your Personal Information as
                    described in this Privacy Policy.
                  </p>
                </div>

                {/* Definitions */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
                  <h3 className="font-semibold mb-3">Key Definitions</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <strong>"Site"</strong> refers to www.isabitv.com or our
                      mobile application
                    </li>
                    <li>
                      <strong>"Service"</strong> refers to our services accessed
                      via the Site
                    </li>
                    <li>
                      <strong>"Personal Information"</strong> includes
                      information that can personally identify you
                    </li>
                    <li>
                      <strong>"Non-Personal Information"</strong> includes
                      anonymous usage data and demographics
                    </li>
                  </ul>
                </div>

                <section id="information-we-may-collect" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    I. Information We May Collect
                  </h2>

                  <p className="mb-4">
                    We collect both "Non-Personal Information" and "Personal
                    Information" to provide and improve our services.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-green-700 mb-2">
                        Non-Personal Information
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Anonymous usage data</li>
                        <li>• General demographic information</li>
                        <li>• Referring/exit pages and URLs</li>
                        <li>• Platform types and preferences</li>
                        <li>• Number of clicks and site statistics</li>
                      </ul>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 mb-2">
                        Personal Information
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Name and email address</li>
                        <li>• Phone number and address</li>
                        <li>• Username and password</li>
                        <li>• Payment information</li>
                        <li>• Registration details</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="font-semibold mt-6 mb-3">
                    1. Information Collected via Technology
                  </h3>
                  <p className="mb-4">
                    We track information provided by your browser or software
                    application when you use our Service, including the website
                    you came from, browser type, device information, and access
                    times. We use cookies to collect this information and
                    improve service quality.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Cookie Usage
                    </h4>
                    <p className="text-amber-700 text-sm">
                      We use both persistent and session cookies. Persistent
                      cookies remain on your computer until deleted, while
                      session cookies expire when you close your browser. We
                      store persistent cookies to track site usage statistics.
                    </p>
                  </div>

                  <h3 className="font-semibold mt-6 mb-3">
                    2. Information You Provide by Registering
                  </h3>
                  <p className="mb-4">
                    To become a subscriber, you need to create a personal
                    profile by registering with your email address, username,
                    and password. By registering, you authorize us to collect,
                    store and use your email address in accordance with this
                    Privacy Policy.
                  </p>

                  <h3 className="font-semibold mt-6 mb-3">
                    3. Children's Privacy
                  </h3>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">
                      Age Restrictions
                    </h4>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• The Site is not directed to anyone under age 13</li>
                      <li>
                        • We don't knowingly collect information from anyone
                        under 18
                      </li>
                      <li>• Anyone under 13 cannot sign up for the Service</li>
                      <li>
                        • We delete information from minors as soon as we learn
                        of it
                      </li>
                    </ul>
                    <p className="text-red-700 text-sm mt-2">
                      If you believe we have collected information from a minor,
                      contact us at info@isabitv.com
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="how-we-use-and-share-information" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    II. How We Use and Share Information
                  </h2>

                  <h3 className="font-semibold mb-3">Personal Information</h3>
                  <p className="mb-4">
                    We do not sell, trade, rent or otherwise share your Personal
                    Information with third parties for marketing purposes
                    without your consent. We do share Personal Information with
                    vendors performing services for us, such as email servers
                    and payment processors.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      How We Use Your Personal Information
                    </h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Communicate with you and respond to questions</li>
                      <li>• Solicit feedback and provide technical support</li>
                      <li>• Inform you about promotional offers</li>
                      <li>• Process payments and deliver services</li>
                    </ul>
                  </div>

                  <p className="mb-4">
                    We may share Personal Information with outside parties if we
                    have good-faith belief that access is reasonably necessary
                    to meet legal processes, enforce Terms of Service, address
                    fraud or security concerns, or protect against harm to
                    rights, property, or safety of users or the public.
                  </p>

                  <h3 className="font-semibold mt-6 mb-3">
                    Non-Personal Information
                  </h3>
                  <p className="mb-4">
                    We use Non-Personal Information to improve the Service and
                    customize user experience. We aggregate this information to
                    track trends and analyze use patterns. This Privacy Policy
                    does not limit our use or disclosure of Non-Personal
                    Information, and we reserve the right to use and disclose
                    such information to partners, advertisers and other third
                    parties.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">
                      Business Transactions
                    </h4>
                    <p className="text-sm">
                      In the event of a merger, acquisition, or sale of assets,
                      your Personal Information may be among the transferred
                      assets. You acknowledge and consent that such transfers
                      may occur and any acquirer may continue to process your
                      information as set forth in this Privacy Policy.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="how-we-protect-information" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    III. How We Protect Information
                  </h2>

                  <p className="mb-4">
                    We implement security measures designed to protect your
                    information from unauthorized access. Your account is
                    protected by your password, and we urge you to keep your
                    personal information safe by not disclosing your password
                    and logging out after each use.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-semibold text-sm">Encryption</h4>
                      <p className="text-xs text-muted-foreground">
                        Data encrypted in transit and at rest
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-sm">Firewalls</h4>
                      <p className="text-xs text-muted-foreground">
                        Network security protection
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold text-sm">SSL Technology</h4>
                      <p className="text-xs text-muted-foreground">
                        Secure socket layer protection
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Important Security Notice
                    </h4>
                    <p className="text-amber-700 text-sm">
                      While we implement technological security measures, these
                      do not guarantee that your information will not be
                      accessed, disclosed, altered, or destroyed by breach of
                      firewalls and secure server software. By using our
                      Service, you acknowledge and agree to assume these risks.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section
                  id="your-rights-regarding-personal-information"
                  className="mb-8"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    IV. Your Rights Regarding Personal Information
                  </h2>

                  <p className="mb-4">
                    You have the right at any time to prevent us from contacting
                    you for marketing purposes. When we send promotional
                    communications, you can opt out by following the unsubscribe
                    instructions provided in each promotional email.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Your Rights Include:
                    </h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Opt out of promotional communications</li>
                      <li>• Update your account information</li>
                      <li>• Request information about data we collect</li>
                      <li>• Contact us with privacy concerns</li>
                    </ul>
                    <p className="text-green-700 text-sm mt-2">
                      <strong>Note:</strong> We may continue to send
                      administrative emails (like policy updates) regardless of
                      promotional preferences.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="links-to-other-websites" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    V. Links to Other Websites
                  </h2>

                  <p className="mb-4">
                    As part of the Service, we may provide links to or
                    compatibility with other websites or applications. However,
                    we are not responsible for the privacy practices employed by
                    those websites or the information or content they contain.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Important Notice
                    </h4>
                    <p className="text-blue-700 text-sm">
                      This Privacy Policy applies solely to information
                      collected through our Site and Service. When you access
                      third-party websites through our links, their privacy
                      policies will apply. We encourage you to read the privacy
                      statements of other websites before using them.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="changes-to-our-privacy-policy" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    VI. Changes to Our Privacy Policy
                  </h2>

                  <p className="mb-4">
                    The Company reserves the right to change this policy and our
                    Terms of Service at any time. Non-material changes or
                    clarifications will take effect immediately.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Stay Updated
                    </h4>
                    <p className="text-amber-700 text-sm">
                      You should periodically check the Site and this privacy
                      page for updates. We recommend reviewing our privacy
                      policy regularly to stay informed about how we protect
                      your information.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="contact-us" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    VII. Contact Us
                  </h2>

                  <p className="mb-4">
                    If you have any questions regarding this Privacy Policy or
                    the practices of this Site, please contact us by sending an
                    email to our privacy team.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-3 text-blue-600" />
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Privacy Contact
                    </h4>
                    <p className="text-blue-700">
                      <strong>Email:</strong> info@isabitv.com
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      We typically respond to privacy inquiries within 48 hours
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t">
                  <p>© 2024 iSabiTV Media. All rights reserved.</p>
                  <p className="mt-2">
                    This Privacy Policy was last updated on January 30th, 2024
                  </p>
                  <p className="mt-2">
                    For questions about this Privacy Policy, please contact:
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
