

import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import Image from "next/image";
import ImageSlider from "@/components/ui/image-slider";
import AddressCard from "@/components/address";
import { AspectRatio } from "@/components/ui/aspect-ratio"

const news = [
  {
    id: 1,
    title: "New Architectural Project Launched",
    description: "We are excited to announce our latest project in downtown.",
    image: "/news1.jpg",
    url: ""
  },
  {
    id: 2,
    title: "Award for Excellence in Design",
    description: "Our team has won the prestigious design award for 2025.",
    image: "/news2.jpg",
  },
  {
    id: 3,
    title: "Upcoming Sustainability Workshop",
    description: "Join us for an engaging session on sustainable architecture.",
    image: "/news3.jpg",
  },
];

const openings = [
  {
    title: "Junior Architect",
    location: "Dhaka, Bangladesh",
  },
  {
    title: "Project Manager",
    location: "Remote",
  },
];

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col font-Aspekta font-normal text-regular">
      {/* Hero Section */}
      {/* bg-gradient-to-b */}
      <section className="flex relative flex-col min-h-screen items-center justify-center px-4 py-24 md:py-32 bg-red-500 ">
        <div className="container w-full max-w-4xl space-y-6 text-center">
          {/* <div className="absolute inset-0">
            <Image
              src="/assets/landscape-logo.jpg"
              alt="Background"
              fill
              className="object-cover"
            />
          </div> */}
          <Image src='/assets/landscape-logo.jpg' layout="fill" alt="logo" className="mx-auto w-full relative" />
          {/* <h4 className="text-2xl text-red-500 font-bold tracking-tighter sm:text-3xl md:text-4xl">
            VU-STHAPATI
          </h4> */}
          {/* <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Creative architect passionate about crafting sustainable,
            human-centered environments with precision and artistry.
          </p> */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              {/* <Link href="#projects">
                View Projects <ArrowRight className="ml-2 h-4 w-4" />
              </Link> */}
            </Button>
            <Button variant="outline" asChild>
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com"
                target="_blank"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://linkedin.com"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="mailto:contact@example.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 md:py-24 px-4 md:max-w-3xl md:px-16 lg:px-20 lg:max-w-6xl bg-background"
      >
        <div className="container">
          <div>
            <div className="mb-6 flex items-center gap-2">
              {/* <User className="h-5 w-5 text-primary" /> */}
              <span>About<h2 className="text-header font-extrabold tracking-tight">VU-STHAPATI</h2></span>
            </div>
            <div className="space-y-4  text-neutral-800 font-normal text-sm">
              <p className="">
                John is an architect driven by a passion for creating spaces
                that blend innovation, functionality, and beauty. With a deep
                understanding of design principles and a sharp eye for detail,
                his work reflects a commitment to crafting environments that not
                only meet practical needs but also inspire those who experience
                them. Each project he undertakes is approached with thoughtful
                consideration, ensuring a harmonious balance between form and
                function.
              </p>
              <div className="flex flex-col-reverse md:flex-row md:gap-10 md:justify-between">
                <p className="max-w-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis esse sit atque? Obcaecati esse doloribus possimus, facilis ipsum corrupti voluptatem, amet, incidunt quo deserunt atque excepturi architecto. Facere, expedita voluptate mollitia velit debitis odit nemo sapiente perspiciatis nisi blanditiis vero, officia dolorem rem provident quia dolorum aperiam necessitatibus? Sequi impedit natus dolorum reiciendis molestiae voluptatum, doloribus sapiente? At libero fuga dolorum suscipit reprehenderit minus animi velit expedita corrupti ipsam vero quidem eum odio veniam architecto minima, aut quasi?</p>
                <div className="md:min-w-96 w-full ">
                  <ImageSlider />
                </div>
              </div>
              <p className="">
                His portfolio spans a diverse range of projects, from
                residential homes to large-scale commercial developments, each
                showcasing his ability to transform concepts into meticulously
                designed spaces. Sustainability and context are at the core of
                his design philosophy, as he strives to create structures that
                complement their surroundings while leaving a minimal
                environmental footprint.
              </p>
              <p className="">
                Whether collaborating with clients, leading teams, or refining
                design details, John approaches every project with dedication
                and creativity. His work is a testament to his belief that
                architecture has the power to shape experiences, enhance
                communities, and stand as a timeless expression of art and
                purpose.
              </p>
              <p>To learn more about us <Link className="text-indigo-500" href="/about">Click Here</Link></p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-16 md:py-24 px-4 bg-cover  md:px-16 lg:px-20 "
      >
        <div className="flex flex-col items-end">
          <div className="w-full max-w-3xl space-y-8">
            <h2 className="text-header font-Aspekta font-extrabold">
              WORKS
            </h2>

            <AspectRatio ratio={16 / 9} className="rounded-lg overflow-hidden shadow-lg">
              <ImageSlider />
            </AspectRatio>
            <Button asChild>
              <Link href="/projects">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-12 px-4 md:px-8 lg:px-16">
        <div className="mb-12 space-y-4">
          <h2 className="text-header font-extrabold mb-6">Latest News</h2>
          <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
            {news.map((news) => (
              <Link key={news.id} href={`/news/${news.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden h-[320px]">
                <Image
                  src='/assets/archi-image.jpg'
                  alt={news.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-600 text-sm mb-2">{new Date().toDateString()}</p>
                  <h3 className="text-xl font-bold">{news.title}</h3>
                </div>
              </Link>
            ))}
          </div>
            <Button asChild>
              <Link href="/news">
                More News <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

            </Button>
          </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="flex flex-col-reverse gap-10 md:flex-row md:justify-between py-16 md:py-24 px-4 md:px-16 lg:px-20 bg-background "
      >
        <AddressCard />

        <div className="w-full flex flex-col justify-center items-center md:items-end">
          <div className="mb-10 max-w-md w-full">
            <h2 className="text-3xl font-extrabold tracking-tight md:text-header ">
              Get In Touch
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have a project in mind or want to chat? Feel free to reach out!
            </p>
          </div>
          <div className="max-w-md w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
