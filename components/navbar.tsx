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
  const { user, logout } = useAuth();
  console.log("Current user in navbar:", user); // Add this line for debugging

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

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href;

        const linkClasses = [
          "text-sm font-medium transition-colors duration-300",
          isActive
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

  const handleLogout = async () => {
    try {
      console.log("Starting logout process...");
      await logout();
      console.log("Logout completed successfully");

      // Redirect to home page after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
      // Force redirect to home page anyway
      window.location.href = "/";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full p-6 md:px-12 flex justify-center items-center transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : isLightBg
          ? "bg-transparent"
          : "bg-white"
      }`}
    >
      <div className="container flex items-center">
        {/* Desktop Nav & Logo */}
        <div className="mr-4 hidden md:flex">
          <Link
            href="/"
            className={`mr-6 flex items-center space-x-2 ${
              scrolled || !isLightBg ? "text-black" : "text-white"
            }`}
          >
            <Image src="/isabitv.svg" height={50} width={100} alt="logo" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <NavLinks />
          </nav>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className={`mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden ${
                scrolled || !isLightBg ? "text-black" : "text-white"
              }`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/isabitv.svg" height={50} width={100} alt="logo" />
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <NavLinks />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Mobile logo */}
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link
              href="/"
              className={`flex items-center space-x-2 md:hidden ${
                scrolled || !isLightBg ? "text-black" : "text-white"
              }`}
            >
              <Image src="/isabitv.svg" height={50} width={100} alt="logo" />
            </Link>
          </div>

          {/* Auth buttons or user avatar */}
          <nav className="flex items-center space-x-2">
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
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
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
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
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
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                {/* Mobile Sign Up */}
                <div className="flex items-center md:hidden">
                  <Button
                    size="lg"
                    asChild
                    className="bg-[#228201] text-white rounded-[50px]"
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>

                {/* Desktop Sign In/Up */}
                <div className="hidden md:flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="lg"
                    asChild
                    className={`border-[3px] rounded-[50px] transition-colors duration-300 ${
                      false
                        ? "border-[#228201] text-black hover:bg-[#228201] hover:text-white"
                        : "border-[#228201] text-white hover:bg-[#228201] hover:text-black"
                    }`}
                  >
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-br from-primary via-secondary to-accent text-white font-semibold shadow hover:brightness-110 transition rounded-[50px]"
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </div>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
