"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Database,
  Lock,
  User,
  FileText,
  Mail,
  Eye,
  Download,
  Trash2,
  Edit,
  Ban,
} from "lucide-react";
import { Footer } from "@/components/footer";

export default function GDPRPolicy() {
  const sections = [
    "Introduction",
    "Data Controller",
    "Types of Personal Data Collected",
    "Purposes of Processing Personal Data",
    "Legal Basis for Processing",
    "Data Sharing and Disclosure",
    "Data Security Measures",
    "Data Retention",
    "User Rights",
    "Changes to the Policy",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const userRights = [
    {
      icon: Eye,
      title: "Right to Access",
      description:
        "Request access to your personal data and information about how it's processed",
      color: "text-blue-600",
    },
    {
      icon: Edit,
      title: "Right to Rectification",
      description:
        "Request correction of inaccurate or incomplete personal data",
      color: "text-green-600",
    },
    {
      icon: Trash2,
      title: "Right to Erasure",
      description:
        "Request deletion of your personal data under certain circumstances",
      color: "text-red-600",
    },
    {
      icon: Ban,
      title: "Right to Restrict Processing",
      description: "Request limitation of processing of your personal data",
      color: "text-orange-600",
    },
    {
      icon: Download,
      title: "Right to Data Portability",
      description: "Request transfer of your data to another service provider",
      color: "text-purple-600",
    },
    {
      icon: User,
      title: "Right to Object",
      description:
        "Object to processing of your personal data for certain purposes",
      color: "text-gray-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 ">
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

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Quick Actions</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact DPO
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start bg-transparent"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Request Data
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
                  <Shield className="h-8 w-8 text-blue-600" />
                  <h1 className="text-3xl font-bold">iSabiTV</h1>
                  <Badge variant="outline">GDPR Policy</Badge>
                </div>
                <p className="text-muted-foreground">
                  General Data Protection Regulation Compliance
                </p>
              </CardHeader>
              <CardContent className="prose prose-sm max-w-none">
                <section id="introduction" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    1. Introduction
                  </h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-blue-800 mb-3">
                      Our GDPR Commitment
                    </h3>
                    <p className="text-blue-700">
                      iSabiTV Media is committed to protecting the privacy and
                      security of our users. This GDPR Policy outlines how we
                      collect, use, disclose, and manage the personal data of
                      our users in compliance with the General Data Protection
                      Regulation (GDPR).
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-sm">
                        Privacy Protection
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Your data is protected by design
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-semibold text-sm">
                        Secure Processing
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Advanced security measures
                      </p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <User className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold text-sm">User Rights</h4>
                      <p className="text-xs text-muted-foreground">
                        Full control over your data
                      </p>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="data-controller" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    2. Data Controller
                  </h2>

                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <h3 className="font-semibold mb-3">Contact Information</h3>
                    <p className="mb-4">
                      You can reach the data controller for the personal data
                      processed on our video streaming platform via email:
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-white rounded border">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <span className="font-mono">info@isabitv.com</span>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="types-of-personal-data-collected" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    3. Types of Personal Data Collected
                  </h2>

                  <p className="mb-6">
                    We collect the following types of personal data from our
                    users:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 mb-3 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Account Information
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Usernames</li>
                        <li>• Email addresses</li>
                        <li>• Passwords (encrypted)</li>
                        <li>• Other account details</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-green-700 mb-3 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Payment Information
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Credit card details</li>
                        <li>• Payment method information</li>
                        <li>• Subscription data</li>
                        <li>• Billing addresses</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-purple-700 mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Usage Data
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Content viewed</li>
                        <li>• User preferences</li>
                        <li>• Platform interactions</li>
                        <li>• Viewing history</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h4 className="font-semibold text-orange-700 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Device Information
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• IP addresses</li>
                        <li>• Browser type</li>
                        <li>• Operating system</li>
                        <li>• Device identifiers</li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 border rounded-lg p-4">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Communication Data
                    </h4>
                    <p className="text-sm">
                      Information provided by users during customer support
                      interactions and communications.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section
                  id="purposes-of-processing-personal-data"
                  className="mb-8"
                >
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    4. Purposes of Processing Personal Data
                  </h2>

                  <p className="mb-4">
                    We process personal data for the following purposes:
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Service Provision
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Providing and maintaining our video streaming services
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Personalization
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Personalizing user experience and content
                          recommendations
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Payment Processing
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Processing payments and managing subscriptions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Service Improvement
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Analyzing and improving our services
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-semibold text-sm">
                          Customer Support
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Responding to customer inquiries and providing support
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="legal-basis-for-processing" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    5. Legal Basis for Processing
                  </h2>

                  <p className="mb-4">
                    We process personal data based on the following legal bases:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-sm mb-2">
                        Contract Performance
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Processing necessary for contract performance
                      </p>
                    </div>

                    <div className="border rounded-lg p-4 text-center">
                      <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-semibold text-sm mb-2">
                        User Consent
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Explicit consent for specific processing activities
                      </p>
                    </div>

                    <div className="border rounded-lg p-4 text-center">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold text-sm mb-2">
                        Legal Compliance
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Compliance with legal obligations
                      </p>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="data-sharing-and-disclosure" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    6. Data Sharing and Disclosure
                  </h2>

                  <p className="mb-4">
                    We may share personal data with third parties for the
                    following purposes:
                  </p>

                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">Payment Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Secure payment processors for subscription management
                      </p>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">
                        Content Delivery and Hosting
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        CDN providers for optimal streaming performance
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">
                        Customer Support Services
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Support platforms for user assistance
                      </p>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Third-Party Compliance
                    </h4>
                    <p className="text-amber-700 text-sm">
                      We ensure that all third-party processors comply with GDPR
                      and implement appropriate safeguards to protect your
                      personal data.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="data-security-measures" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    7. Data Security Measures
                  </h2>

                  <p className="mb-4">
                    We implement technical and organizational measures to ensure
                    the security of personal data:
                  </p>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Lock className="h-8 w-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-semibold text-sm">Encryption</h4>
                      <p className="text-xs text-muted-foreground">
                        End-to-end data encryption
                      </p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <Shield className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold text-sm">Access Controls</h4>
                      <p className="text-xs text-muted-foreground">
                        Restricted data access
                      </p>
                    </div>

                    <div className="text-center p-4 border rounded-lg">
                      <Eye className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                      <h4 className="font-semibold text-sm">Security Audits</h4>
                      <p className="text-xs text-muted-foreground">
                        Regular security assessments
                      </p>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="data-retention" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    8. Data Retention
                  </h2>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">
                      Retention Policy
                    </h4>
                    <p className="text-blue-700 text-sm">
                      We retain personal data for the duration necessary to
                      fulfill the purposes outlined in this policy or as
                      required by applicable laws. Data is securely deleted when
                      no longer needed.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="user-rights" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    9. User Rights
                  </h2>

                  <p className="mb-6">
                    Users have the following rights under GDPR:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {userRights.map((right, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <right.icon
                            className={`h-6 w-6 ${right.color} flex-shrink-0 mt-1`}
                          />
                          <div>
                            <h4 className="font-semibold text-sm mb-1">
                              {right.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {right.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Exercise Your Rights
                    </h4>
                    <p className="text-green-700 text-sm mb-3">
                      Users can exercise these rights by contacting iSabiTV
                      Media at:
                    </p>
                    <div className="flex items-center gap-2 p-3 bg-white rounded border">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="font-mono text-sm">
                        info@isabitv.com
                      </span>
                    </div>
                  </div>
                </section>

                <Separator className="my-6" />

                <section id="changes-to-the-policy" className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    10. Changes to the Policy
                  </h2>

                  <p className="mb-4">
                    We may update this GDPR Policy periodically. Users will be
                    notified of any material changes, and the updated policy
                    will be available on our platform.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">
                      Policy Updates
                    </h4>
                    <p className="text-amber-700 text-sm">
                      By using our video streaming platform, users agree to the
                      terms outlined in this GDPR Policy. We recommend reviewing
                      this policy regularly for updates.
                    </p>
                  </div>
                </section>

                <Separator className="my-6" />

                <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t">
                  <p>© 2024 iSabiTV Media. All rights reserved.</p>
                  <p className="mt-2">
                    GDPR Compliance Officer: info@isabitv.com
                  </p>
                  <p className="mt-2">
                    For data protection inquiries, please contact us within 30
                    days
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
