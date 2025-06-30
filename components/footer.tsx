import Link from "next/link";
import { Play, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  platform: [
    { name: "Home", href: "/" },
    { name: "Library", href: "/library" },
    { name: "Contests", href: "/library/contests" },
    { name: "Upload", href: "/upload" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "GDR policy", href: "/terms" },
  ],
  creators: [
    { name: "Become a Creator", href: "/become-creator" },
    { name: "Creator Guidelines", href: "/guidelines" },
    { name: "Help Center", href: "/help" },
    { name: "Community", href: "/community" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-[#228201] text-white flex justify-center mt-8">
      <div className="container p-6 mt-8">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/isabitv.svg"
                height={50}
                width={100}
                alt="logo.svg"
              />
            </Link>
            <p className="mt-4 text-sm text-muted ">
              Our streaming app is the ultimate solution for all your
              entertainment needs. Whether you`re watching at home or on-the-go,
              our app delivers the highest quality video streaming available.
              Our user-friendly interface ensures a seamless viewing experience,
              with easy navigation and intuitive controls.
            </p>
            <div className="mt-6 flex space-x-4">
              <Link href="#" className="text-muted hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">Creators</h3>
            <ul className="space-y-3">
              {footerLinks.creators.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} iSabitv. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
