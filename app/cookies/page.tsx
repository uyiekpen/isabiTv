"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cookie,
  Settings,
  Eye,
  Target,
  Mail,
  ExternalLink,
  Shield,
  Info,
} from "lucide-react";
import Image from "next/image";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function CookiesPolicy() {
  const sections = [
    "What are Cookies?",
    "How do we use cookies?",
    "What types of cookies do we use?",
    "How to manage cookies",
    "Privacy policies of other websites",
    "Changes to our privacy policy",
    "How to contact us",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cookieTypes = [
    {
      icon: Settings,
      title: "Functionality Cookies",
      description: "Remember your preferences and settings",
      examples: [
        "Language preferences",
        "Location settings",
        "Login status",
        "User interface preferences",
      ],
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: Target,
      title: "Advertising Cookies",
      description: "Collect information for targeted advertising",
      examples: [
        "Browsing patterns",
        "Content viewed",
        "Device information",
        "IP address data",
      ],
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
  ];

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
                  <Cookie className="h-5 w-5" />
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

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Quick Actions</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Manage Cookies
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </Button>
                  </div>
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
                  <Badge variant="outline">Cookies Policy</Badge>
                </div>
                <p className="text-muted-foreground">
                  Last updated: November 11, 2020
                </p>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                {/* Website Preview */}
                <div className="mb-8">
                  <div className="relative rounded-lg overflow-hidden border shadow-lg">
                    {/* <Image
                      src="/images/isabitv-homepage.png"
                      alt="iSabiTV.com Homepage - Empowering Black voices one video at a time"
                      width={800}
                      height={400}
                      className="w-full h-auto"
                    /> */}
                    <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <h3 className="font-semibold">iSabiTV Platform</h3>
                        <p className="text-sm text-muted-foreground">
                          This cookies policy applies to this website
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <section id="what-are-cookies-" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    What are Cookies?
                  </h2>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-orange-800 mb-3">
                      Understanding Cookies
                    </h3>
                    <p className="text-orange-700 mb-4">
                      Cookies are text files placed on your computer to collect
                      standard Internet log information and visitor behavior
                      information. When you visit the iSabiTV.com website, we
                      may collect information from you automatically through
                      cookies or similar technology.
                    </p>
                    <div className="flex items-center gap-2 text-orange-700">
                      <ExternalLink className="h-4 w-4" />
                      <span className="text-sm">
                        For further information, visit allaboutcookies.org
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Cookie className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                      <h4 className="font-semibold text-sm">Text Files</h4>
                      <p className="text-xs text-muted-foreground">
                        Small data files stored on your device
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-sm">
                        Behavior Tracking
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Monitor how you use our website
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Settings className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-semibold text-sm">User Experience</h4>
                      <p className="text-xs text-muted-foreground">
                        Improve your browsing experience
                      </p>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="how-do-we-use-cookies-" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    How do we use cookies?
                  </h2>

                  <p className="mb-6">
                    Our Company uses cookies in a range of ways to improve your
                    experience on our website, including:
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Keeping you signed in
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Maintain your login session so you don't have to sign
                          in repeatedly
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Understanding how you use our website
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Analyze user behavior to improve our platform and
                          content delivery
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="what-types-of-cookies-do-we-use-" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Cookie className="h-5 w-5" />
                    What types of cookies do we use?
                  </h2>

                  <p className="mb-6">
                    There are a number of different types of cookies, however,
                    our website uses:
                  </p>

                  <div className="space-y-6">
                    {cookieTypes.map((type, index) => (
                      <div
                        key={index}
                        className={`${type.bgColor} ${type.borderColor} border rounded-lg p-6`}
                      >
                        <div className="flex items-start gap-4">
                          <type.icon
                            className={`h-8 w-8 ${type.color} flex-shrink-0 mt-1`}
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">
                              {type.title}
                            </h3>
                            <p className="text-sm mb-4">{type.description}</p>

                            <div className="grid md:grid-cols-2 gap-3">
                              {type.examples.map((example, exampleIndex) => (
                                <div
                                  key={exampleIndex}
                                  className="flex items-center gap-2"
                                >
                                  <div
                                    className={`w-1.5 h-1.5 ${type.color.replace(
                                      "text-",
                                      "bg-"
                                    )} rounded-full`}
                                  ></div>
                                  <span className="text-sm">{example}</span>
                                </div>
                              ))}
                            </div>

                            {type.title === "Functionality Cookies" && (
                              <div className="mt-4 p-3 bg-white rounded border">
                                <p className="text-xs text-muted-foreground">
                                  <strong>Note:</strong> A mix of first-party
                                  and third-party cookies are used for
                                  functionality purposes.
                                </p>
                              </div>
                            )}

                            {type.title === "Advertising Cookies" && (
                              <div className="mt-4 p-3 bg-white rounded border">
                                <p className="text-xs text-muted-foreground">
                                  <strong>Note:</strong> We may share limited
                                  data with advertising partners. This means you
                                  may see ads based on your browsing patterns
                                  when visiting other websites.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="how-to-manage-cookies" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    How to manage cookies
                  </h2>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="font-semibold text-amber-800 mb-3">
                      Cookie Management
                    </h3>
                    <p className="text-amber-700 mb-4">
                      You can set your browser not to accept cookies, and the
                      website allaboutcookies.org tells you how to remove
                      cookies from your browser.
                    </p>
                    <div className="bg-white border border-amber-300 rounded p-3">
                      <p className="text-amber-800 text-sm">
                        <strong>Important:</strong> In a few cases, some of our
                        website features may not function properly if cookies
                        are disabled.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-6">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">Browser Settings</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Most browsers allow you to control cookies through their
                        settings
                      </p>
                      <ul className="text-xs space-y-1">
                        <li>• Block all cookies</li>
                        <li>• Block third-party cookies</li>
                        <li>• Delete existing cookies</li>
                        <li>• Get notified when cookies are set</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2">External Resources</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Learn more about cookie management
                      </p>
                      <div className="flex items-center gap-2 text-blue-600">
                        <ExternalLink className="h-4 w-4" />
                        <span className="text-sm">allaboutcookies.org</span>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section
                  id="privacy-policies-of-other-websites"
                  className="mb-8"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <ExternalLink className="h-5 w-5" />
                    Privacy policies of other websites
                  </h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      External Links
                    </h4>
                    <p className="text-blue-700 text-sm">
                      The iSabiTV.com does not at this time contain links to
                      other websites. Our privacy policy applies only to our
                      website, so if you click on a link to another website, you
                      should read their privacy policy.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="changes-to-our-privacy-policy" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Changes to our privacy policy
                  </h2>

                  <p className="mb-4">
                    iSabiTV.com keeps its privacy policy under regular review
                    and places any updates on this web page.
                  </p>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Policy Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      This cookies policy was last updated on{" "}
                      <strong>November 11, 2020</strong>. We recommend checking
                      this page periodically for any changes.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="how-to-contact-us" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    How to contact us
                  </h2>

                  <p className="mb-4">
                    If you have any questions about iSabiTV.com privacy policy,
                    the data we hold on you, or you would like to exercise one
                    of your data protection rights, please do not hesitate to
                    contact us.
                  </p>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <Mail className="h-8 w-8 mx-auto mb-3 text-green-600" />
                    <h4 className="font-semibold text-green-800 mb-2">
                      Contact Us
                    </h4>
                    <p className="text-green-700 mb-3">
                      For questions about cookies or data protection:
                    </p>
                    <div className="flex items-center justify-center gap-2 p-3 bg-white rounded border">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="font-mono">info@isabitv.com</span>
                    </div>
                    <p className="text-green-600 text-sm mt-2">
                      We typically respond to cookie-related inquiries within 48
                      hours
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t">
                  <p>© 2024 iSabiTV Media. All rights reserved.</p>
                  <p className="mt-2">
                    Empowering Black voices... one video at a time
                  </p>
                  <p className="mt-2">
                    For cookie-related questions, please contact:
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
