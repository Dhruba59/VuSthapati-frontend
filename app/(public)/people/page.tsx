import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const partners = [
  {
    name: "Ronojit Shaha",
    role: "Architect & Partner",
    image: "/assets/teams/ronojit.jpg",
    description:
      "Ar. Moin bin Yunus has graduated from Bangladesh University of Engineering and Technology (Buet) and Dessau Institute of Architecture MArchd in 2013. Over the years he has work in Ukraine (Bangladesh), behet bondzio architectures (Germany) and HPP Architects (Shanghai). In 2017, he became partner in RootStiches,Studio of Architecture and since then he has been actively working in Bangladesh.",
  },
  {
    name: "Chandan Dewan",
    role: "Architect & Partner",
    image: "/assets/teams/chandan.png",
    description:
      "Ar. Sarowatul Iqbal Tasha finished her Batch Degree from Bangladesh University of Engineering and Technology in 2010. After graduation she cofounded RootStiches, Studio of Architecture in 2012. Since then she has been exploring her knowledge and produced works of significant importance on various scales and programs. She also possess keen interest in Painting and Sculptures.",
  },
  {
    name: "Tanjuma Islam Nabila",
    role: "Geographer & Partner",
    image: "/assets/teams/tanjuma.png",
    description:
      "Ar. Rajib Ahmad has finished his graduation from Bangladesh University of Engineering and Technology in 2010. After graduation he cofounded RootStiches, Studio of Architecture in 2012. He gives a lot of importance to the process of creating an architecture which would have an influence in the society.",
  },
];

const team = [
  {
    name: "Nuuhash Akando",
    role: "Consulting Architect",
    image: "/assets/teams/nuuhash.png",
  },
  {
    name: "Md.Abdus Sattar",
    role: "Project Architect",
    image: "/assets/teams/sattar.png",
  },
  {
    name: "Md. Sadi Murshed Bhuiyan",
    role: "Project Architect",
    image: "/assets/teams/sadi.png",
  },
];

const formerMembers = [
  {
    name: "Preotosh Ronjon Talukder",
    role: "Architect ",
    image: "/assets/teams/preotosh.png",
  } 
]

export default function PeoplePage() {
  return (
    <div className="px-4 sm:px-0 flex justify-start mx-auto container">
      <div>
        <Section title="Partners" people={partners} />
        {/* <Section title="Directors" people={directors} /> */}
        <Section title="Team" people={team} />
        <Section title="Former Members" people={formerMembers} />
      </div>

    </div>
  );
}

function Section({ title, people }: { title: string; people: any[] }) {

  return (
    <div className="mb-12 font-raleway">
      <h2 className="text-lg text-center md:text-start text-black/80 font-semibold mb-4 font-mono uppercase">{title}</h2>
      <div className={`flex flex-wrap justify-center md:justify-start gap-5 md:gap-20`}>
        {people.map((person) => (
          <Card key={person.name} className={`w-full max-w-max md:max-w-48 xl:w-60 gap-4 overflow-hidden border-none`}>
            <Image
              src={person.image}
              height={200}
              width={200}
              alt={person.name}
              className={`w-full h-40 object-cover md:w-48 xl:w-60`}
            />
            <CardContent className="p-0 pt-4">
              <CardTitle className="text-base leading-none font-medium tracking-wide text-center">{person.name}</CardTitle>
              <p className="text-xs text-gray-500 mt-2 mb-2 text-center">{person.role}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
