import Link from "next/link";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import Image from "next/image";
import ImageSlider from "@/components/ui/image-slider";
import AddressCard from "@/components/address";
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { aboutAPI, newsAPI } from "@/lib/api";
import { News, UploadedFile } from "@/lib/models";

export default async function Home() {
    const data = await aboutAPI.getAll();
    const news: News[] = await newsAPI.getAll();
    console.log("About Us Data:", data);
    const featuredImages = data.featuredImages?.map((item: UploadedFile) => item.url ) || [];
    const aboutImages = data.aboutUsImages?.map((item: UploadedFile) => item.url ) || [];
   
  return (
    <main className="flex min-h-screen flex-col font-Aspekta font-normal text-regular">
      <section className="flex relative flex-col min-h-96 md:min-h-screen items-center justify-center px-4 py-24 md:py-32 bg-red-500 ">
        <div className="container w-full max-w-4xl space-y-6 text-center">
          <Image
            src="/assets/landscape-logo.jpg"
            layout="fill"
            alt="logo"
            className="mx-auto w-full relative"
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
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
        className="py-10 md:py-16 px-4 md:max-w-3xl md:px-16 lg:px-20 lg:max-w-6xl bg-background"
      >
        <div className="container">
          <div>
            <div className="mb-6 flex items-center gap-2">
              <span>
                About
                <h2 className="uppercase text-black/85 text-[26px] md:text-header font-mono font-extrabold tracking-wider">
                  VU-STHAPATI
                </h2>
              </span>
            </div>
            <div className="space-y-4 text-neutral-700 text-base tracking-wider font-raleway">
              <p className="">
                {data.description1}
              </p>
              <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10 md:justify-between">
                <p className="max-w-sm">
                 {data.description2}
                </p>
                <div className="md:min-w-96 w-full">
                  <AspectRatio
                    ratio={16 / 9}
                    className="rounded-lg overflow-hidden shadow-lg"
                  >
                    <ImageSlider imageUrls={aboutImages} />
                  </AspectRatio>
                </div>
              </div>
              {/* <p>
                To learn more about us{" "}
                <Link className="text-indigo-500" href="/about">
                  Click Here
                </Link>
              </p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-10 md:py-16 px-4 bg-cover  md:px-16 lg:px-20 "
      >
        <div className="flex flex-col items-end">
          <div className="w-full max-w-3xl space-y-8">
            <h2 className="uppercase text-black/85 text-[26px] md:text-header font-mono font-extrabold tracking-wider">Works</h2>

            <AspectRatio
              ratio={16 / 9}
              className="rounded-lg overflow-hidden shadow-lg"
            >
              <ImageSlider imageUrls={featuredImages} />
            </AspectRatio>
            <Button asChild>
              <Link className="flex ml-2 text-blue-500" href="/projects">
                View All Projects<ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-10 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="space-y-4">
          <h2 className="uppercase text-black/85 text-[26px] md:text-header font-mono font-extrabold tracking-wider mb-8">LATEST NEWS</h2>
          <div className="grid gap-6  md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {news.slice(0,6).map((news) => (
              <Link
                key={news._id}
                href={`/news/${news._id}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden h-full w-full"
              >
                <Image
                  src={news.images[0].url || '/assets/archi-image.jpg'}
                  alt={news.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-gray-500 text-xs mb-2 font-sans">
                    {new Date().toDateString()}
                  </p>
                  <h3 className="text-black/75 text-xl font-sans font-semibold tracking-wider">{news.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <Button asChild>
            <Link className="flex ml-2 text-blue-500" href="/news">
              More News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="flex flex-col-reverse gap-10 md:flex-row md:justify-between py-10 md:py-16 px-4 md:px-16 lg:px-20 bg-background "
      >
        <AddressCard />
        <div className="w-full flex flex-col justify-center items-center md:items-end">
          <div className="mb-10 max-w-md w-full">
            <h2 className="uppercase text-black/85 text-[26px] md:text-header font-mono font-extrabold tracking-wider">
              Get In Touch
            </h2>
            <p className="mt-1 text-muted-foreground font-raleway tracking-wider">
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
