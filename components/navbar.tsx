"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Upload, User, Settings, LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { useAuth } from "./auth-provider-safe";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Library", href: "/library" },
  { name: "Contest", href: "/library/contests" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const isAbout = pathname === "/about";
  const isLightBg = isHome || isContact || isAbout;

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        const linkClasses = [
          "text-sm font-medium transition-colors duration-300",
          mobile
            ? isActive
              ? "text-[#2DA105]"
              : "text-gray-900 hover:text-[#2DA105]"
            : isActive
            ? "text-[#2DA105]"
            : isLightBg && !scrolled
            ? "text-white/80 hover:text-white"
            : "text-muted-foreground hover:text-[#2DA105]",
        ].join(" ");
        return (
          <Link key={item.name} href={item.href} className={linkClasses}>
            {item.name}
          </Link>
        );
      })}
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full p-4 md:px-12 flex justify-center items-center transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : isLightBg
          ? "bg-transparent"
          : "bg-white"
      }`}
    >
      <div className="container flex items-center justify-between gap-4 md:justify-start">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className={`p-0 hover:bg-transparent ${
                  scrolled || !isLightBg ? "text-black" : "text-white"
                }`}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 pt-6">
              {/* Logo for mobile inside drawer */}
              <Link
                href="/"
                className="flex items-center space-x-2 mb-8 pl-6 md:hidden"
              >
                <Image src="/isabitv.svg" height={50} width={100} alt="logo" />
              </Link>
              <div className="pl-6 flex flex-col space-y-4">
                <NavLinks mobile />
                {!user && (
                  <Button
                    size="sm"
                    asChild
                    className="inline-flex items-center justify-center rounded-lg bg-[#228201] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a6501] shadow-lg hover:shadow-xl"
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo (desktop only) */}
        <div className="hidden md:flex md:items-center md:space-x-2">
          <Link href="/">
            <Image src="/isabitv.svg" height={50} width={100} alt="logo" />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 ml-6">
          <NavLinks />
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 ml-auto">
          {user ? (
            <>
              {(user.role === "creator" || user.role === "admin") && (
                <Button asChild size="sm">
                  <Link href="/upload">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                      />
                      <AvatarFallback />
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 z-50"
                  align="start"
                  sideOffset={8}
                  forceMount
                >
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">
                      <User className="mr-2 h-4 w-4" /> Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden md:flex">
              <Button
                size="sm"
                asChild
                className="inline-flex items-center justify-center rounded-lg bg-[#228201] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#1a6501] shadow-lg hover:shadow-xl"
              >
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
