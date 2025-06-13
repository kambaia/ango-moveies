"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IMovieListResult, TMovie } from "@/app/types/IMovies";

interface CardListProps {
  title: string;
  items: IMovieListResult;
}

const CardList: React.FC<CardListProps> = ({ title, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.classList.add("cursor-grabbing");
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const walk = (e.pageX - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
    scrollRef.current?.classList.remove("cursor-grabbing");
  };

  return (
    <div className="relative w-full mb-10 group">
      <h2 className="text-2xl font-bold ml-8 mb-4 text-white">{title}</h2>
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-0 bottom-0 z-10 w-16 hidden group-hover:flex items-center justify-center bg-gradient-to-r from-black/80 to-transparent transition-all duration-300"
      >
        <ChevronLeft size={30} className="text-white" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-0 bottom-0 z-10 w-16 hidden group-hover:flex items-center justify-center bg-gradient-to-l from-black/80 to-transparent transition-all duration-300"
      >
        <ChevronRight size={30} className="text-white" />
      </button>
      <div className="overflow-hidden px-8">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
        >
          {items.results.map((movie: TMovie, index: number) => (
            <div
              key={index}
              className="relative min-w-[180px] transform-gpu transition-all duration-300 ease-in-out hover:scale-125 hover:z-30"
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || movie.original_name}
                className="rounded-md w-full h-auto object-cover select-none pointer-events-none shadow-md hover:shadow-2xl transition-all duration-300"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default CardList;
