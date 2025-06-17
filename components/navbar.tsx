"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Menu, Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";


import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const router: any = useRouter();
  const isHome = pathname === "/";

  const [isTransparentBg, setIsTransparentBg] = useState(false);


  const handleClick = async (id: string) => {
    if (pathname !== "/") {
      await router.push(`/#${id}`);
    }
    // Scroll directly if already on home
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (pathname !== "/") {
        setIsTransparentBg(false);
        return;
      } else if (window.scrollY > window.innerHeight) {
        setIsTransparentBg(false);
      } else {
        setIsTransparentBg(true);
      }
    };

    handleScroll(); // Call it once to set the initial state

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);


  return (
    <header
    className={`${isTransparentBg ? "bg-none" : "bg-white shadow-md"
    } z-50 fixed top-0  font-Aspekta font-thin left-0 right-0 p-4 h-16 flex justify-center transition-all`}
    >

        <div className=" w-full flex items-center justify-between">

          <Link href="/" className="text-subheader font-extrabold text-custom2">
            VU-STHAPATI
          </Link>

          <nav className="hidden text-regular font-normal md:flex items-center gap-6">
          {["Home", "About", "Projects", "People", "News", "Contact"].map((item, index) => (
            <Button
            key={index}
            onClick={() =>
              item === "Home"
              ? handleClick("")
              : item === "Contact"
              ? handleClick("contact")
              : item === "About"
              ? handleClick("about")
              : router.push(`/${item.toLowerCase()}`)
            }
            variant="link"
            className={`text-sm font-medium transition-colors ${
              (item === "Home" && pathname === "/") ||
              (item !== "Home" && pathname.includes(item.toLowerCase()))
              ? "text-custom2 font-bold"
              : ""
            }`}
            >
            {item}
            </Button>
          ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Theme */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 pt-10">
                  <Button
                    onClick={() => handleClick("")}
                    variant='link'
                    className="text-sm font-medium transition-colors"
                  >
                    Home
                  </Button>

                  <Button className="text-sm font-medium transition-colors" variant='link' onClick={() => handleClick("about")}>
                    About
                  </Button>

                  <Button className="text-sm font-medium transition-colors" variant='link' onClick={() => router.push("/projects")}>
                    Projects
                  </Button>
                  {/* </motion.button> */}
                  <Button className="text-sm font-medium transition-colors" variant='link' onClick={() => router.push("/people")}>
                    People
                  </Button>
                  <Button className="text-sm font-medium transition-colors" variant='link' onClick={() => router.push("/news")}>
                    News
                  </Button>
                  <Button className="text-sm font-medium transition-colors" variant='link' onClick={() => handleClick("contact")}>
                    Contact
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

    </header>
  );
}
