"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const router: any = useRouter();
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
    } z-50 fixed top-0 left-0 right-0 p-4 h-16 flex justify-center transition-all font-raleway tracking-wider`}
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
            className={`text-sm font-normal transition-colors ${
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

          <div className="flex items-center gap-2 font-raleway tracking-wider">
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
