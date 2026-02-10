"use client";

import Image from "next/image";
import Link from "next/link";

export default function PressContent() {
  const pressItems = [
    {
      title: "The Zoe Report",
      description:
        "Sway was named a top U.S. day spa in TZR’s 2026 Readers’ Choice Awards, recognized for redefining what it means to unwind with next-generation wellness experiences.",
      image: "/assets/tzr.png",
      link: "https://www.thezoereport.com/living/readers-choice-awards-best-us-day-spa",
    },
    {
      title: "Salon Today – Modern Spa & Wellness",
      description:
        "A two-page editorial in the Fall 2025 issue spotlighting Sway’s Gen Z-focused wellness model, franchise roots, and blend of innovative technology with spa design.",
      image: "/assets/salontoday.png",
      link: "https://www.bluetoad.com/publication/?i=854210&p=8&view=issueViewer",
    },
    {
      title: "The Denver Post",
      description:
        "A feature on Sway’s flagship opening in Larimer Square, highlighting our AI-powered robotic massage, facials, and next-gen treatments built for younger generations.",
      image: "/assets/post.png",
      link: "https://www.denverpost.com/2025/03/08/wellness-club-sway-larimer-square-ai-robot-massage/",
    },
    {
      title: "Athletech",
      description:
        "Athletech explores how Sway blends AI, community, and modern wellness design to create a Gen Z–focused club redefining self-care.",
      image: "/assets/athletech2.jpg",
      link: "https://athletechnews.com/built-by-gen-z-for-gen-z-sway-redefines-the-wellness-club/",
    },
    {
      title: "Mile High CRE",
      description:
        "An inside look at Sway’s design, construction, and concept development — spotlighting how our membership model and technology redefine the spa experience.",
      image: "/assets/cre.jpg",
      link: "https://milehighcre.com/revolutionary-wellness-club-coming-to-larimer-square/",
    },
    {
      title: "Denver Business Journal",
      description:
        "A business-focused overview of Sway’s expansion into Larimer Square as Spavia’s newest concept, offering an innovative wellness experience for Gen Z and urban consumers.",
      image: "/assets/dbj.jpg",
      link: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
    },
    {
      title: "5280 Magazine",
      description:
        "5280’s first-hand review of Colorado’s only robot-powered massage—available exclusively at Sway—exploring how Aescape transforms the traditional massage experience.",
      image: "/assets/5280.jpg",
      link: "https://www.5280.com/i-tried-colorados-first-robot-massage/",
    },
    {
      title: "Yoga+Life",
      description:
        "Yoga+Life examines how Sway’s high-tech, youth-driven approach—including robotic massage—reimagines self-care for the modern wellness guest.",
      image: "/assets/yoga.jpg",
      link: "https://yogalifelive.com/this-new-denver-wellness-club-is-using-robots-to-rethink-self-care/",
    },
  ];

  return (
    <div className="bg-[#F7F4E9] min-h-screen flex flex-col items-center justify-start text-black font-vance">
      {/* Top Banner */}
      <div className="w-full bg-[#113D33] text-white py-24 flex justify-center items-center">
        <h1 className="text-4xl md:text-6xl font-bold">In The Press</h1>
      </div>

      {/* Press Cards */}
      <div className="w-full max-w-7xl px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
        {pressItems.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={350}
              height={350}
              className="rounded-xl object-cover transition duration-300 group-hover:scale-105"
            />
            <h2 className="text-xl md:text-2xl font-bold mt-6 text-center">
              {item.title}
            </h2>
            <p className="text-md md:text-lg font-medium mt-2 text-center opacity-80">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
