"use client";
import { useEffect, useRef } from "react";

import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import imgObject from "./Images";

export default function CarouselComponent() {
  const autoplayInstance = useRef(Autoplay({ delay: 2000 }));

  return (
    <div className="flex justify-center items-center">
      <Carousel
        plugins={[autoplayInstance.current]}
        className="w-full max-w-7xl flex justify-center items-center"
      >
        <CarouselContent>
          {imgObject.map((img) => (
            <CarouselItem key={img.id}>
              <Image
                src={img.src}
                alt={img.alt}
                className="rounded-lg shadow-lg w-full lg:max-w-8xl lg:max-h-80"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
