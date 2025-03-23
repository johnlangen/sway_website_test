// app/press/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function PressPage() {
  const pressItems = [
    {
      title: "Mile High",
      description: "Revolutionary Wellness Club Coming to Larimer Square",
      image: "/assets/mile_high.png",
      link: "https://milehighcre.com/revolutionary-wellness-club-coming-to-larimer-square/",
    },
    {
      title: "Denver Business Journal",
      description: "Denver-based spa co. opening wellness club in Larimer Square",
      image: "/assets/pr_newswire.png",
      link: "https://www.bizjournals.com/denver/news/2024/11/20/wellness-club-opening-in-denvers-larimer-square.html",
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
            <h2 className="text-xl md:text-2xl font-bold mt-6 underline text-center">
              {item.title}
            </h2>
            <p className="text-md md:text-lg font-medium mt-2 underline text-center">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
