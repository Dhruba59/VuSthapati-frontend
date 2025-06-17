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
    name: "Moin bin Yunus",
    role: "Architect/Partner",
    image: "/images/moin.jpg",
    description:
      "Ar. Moin bin Yunus has graduated from Bangladesh University of Engineering and Technology (Buet) and Dessau Institute of Architecture MArchd in 2013. Over the years he has work in Ukraine (Bangladesh), behet bondzio architectures (Germany) and HPP Architects (Shanghai). In 2017, he became partner in RootStiches,Studio of Architecture and since then he has been actively working in Bangladesh.",
  },
  {
    name: "Sarowatul Iqbal Tasha",
    role: "Architect/Partner",
    image: "/images/tasha.jpg",
    description:
      "Ar. Sarowatul Iqbal Tasha finished her Batch Degree from Bangladesh University of Engineering and Technology in 2010. After graduation she cofounded RootStiches, Studio of Architecture in 2012. Since then she has been exploring her knowledge and produced works of significant importance on various scales and programs. She also possess keen interest in Painting and Sculptures.",
  },
  {
    name: "Rajib Ahmad",
    role: "Architect/Partner",
    image: "/images/rajib.jpg",
    description:
      "Ar. Rajib Ahmad has finished his graduation from Bangladesh University of Engineering and Technology in 2010. After graduation he cofounded RootStiches, Studio of Architecture in 2012. He gives a lot of importance to the process of creating an architecture which would have an influence in the society.",
  },
];

const directors = [
  {
    name: "Abu Rasel",
    role: "Director Construction & Business Development",
    image: "/images/rasel.jpg",
  },
  {
    name: "Shanjabi Khan Chowdhury",
    role: "Director Construction & Business Development",
    image: "/images/shanjabi.jpg",
  },
];

const team = [
  {
    name: "S M Rumon Mahfur Chowdhury",
    role: "Project Architect",
    image: "/images/rumon.jpg",
  },
  {
    name: "Mahmudul Hasan Rajiv",
    role: "Project Architect",
    image: "/images/rajiv.jpg",
  },
  {
    name: "Amirul Rahman",
    role: "Project Architect",
    image: "/images/amirul.jpg",
  },
  {
    name: "Zakir Ahmed Opu",
    role: "Project Architect",
    image: "/images/opu.jpg",
  },
  {
    name: "Zakir Ahmed Opu",
    role: "Project Architect",
    image: "/images/opu.jpg",
  },
  {
    name: "Zakir Ahmed Opu",
    role: "Project Architect",
    image: "/images/opu.jpg",
  },
  {
    name: "Zakir Ahmed Opu",
    role: "Project Architect",
    image: "/images/opu.jpg",
  },
  {
    name: "Zakir Ahmed Opu",
    role: "Project Architect",
    image: "/images/opu.jpg",
  },
  {
    name: "Zakir Ahmed Opu",
    role: "Project Architect",
    image: "/images/opu.jpg",
  },
];

export default function PeoplePage() {
  return (
    <div className="px-4 sm:px-0 flex justify-start mx-auto container">
      <div>
        <h1 className="text-header font-extrabold my-3 text-black/60">People</h1>

        <Section title="Partners" people={partners} />
        {/* <Section title="Directors" people={directors} /> */}
        <Section title="Team" people={team} />
      </div>

    </div>
  );
}

// interface Partner {
//   name: string;
//   role: string;
//   image: string;
//   description: string;
// }

// interface TopTierPersonProps {
//   person: Partner[];
// }

// const TopTierPerson = ({ person }: TopTierPersonProps) => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//       {partners.map((partner: Partner) => (
//         <Card key={partner.name} className="overflow-hidden">
//           <img
//             src={partner.image}
//             alt={partner.name}
//             className="w-full h-48 object-cover"
//           />
//           <CardContent>
//             <CardTitle>{partner.name}</CardTitle>
//             <p className="text-sm text-gray-500 mb-2">{partner.role}</p>
//             {partner.description && (
//               <CardDescription>{partner.description}</CardDescription>
//             )}
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

function Section({ title, people }: { title: string; people: any[] }) {

  return (
    <div className="mb-12">
      <h2 className="text-lg font-light mb-4">{title}</h2>
      <div className={` ${(title === 'Partners' || title === 'Directors') ? 'flex flex-wrap gap-8 xl:gap-20' : 'flex flex-wrap justify-start gap-8'}`}>
        {people.map((person) => (
          <Card key={person.name} className={` ${title === 'Partners' ? 'w-full md:w-56 xl:w-80' : 'md:max-w-48 xl:w-60'} gap-4 overflow-hidden border-none`}>
            <Image
              src='/assets/random-user-photo.jpg'
              height={200}
              width={200}
              alt={person.name}
              className={` h-40 object-cover ${title === 'Partners' ? 'w-full md:w-56 xl:w-80' : 'md:w-48 xl:w-60'}`}
            />
            <CardContent className="p-0 pt-2">
              <CardTitle className="text-base leading-none font-normal text-center">{person.name}</CardTitle>
              <p className="text-xs text-gray-500 mt-1 mb-2 text-center">{person.role}</p>
              {(person.description && title === 'Partners') && (
                <CardDescription className="text-xs text-justify">{person.description}</CardDescription>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
