"use client"
import { useEffect, useState } from "react";
import { Movies } from "./server/movies";
import { TMovie, TMovieListItem } from "./types/IMovies";
import FeaturedMovie from "./components/pages/home/FeaturedMovie";
import CardList from "./components/pages/home/CardList";
import { Header } from "./components/shared/header/Header";

export default function Home() {
  const [featuredData, setFeaturedData] = useState<TMovie | null>(null);
  const [blackHeder, setBlackHeder] = useState(false);
  const [loading, setLoading] = useState(false);

  const [movieList, setMovieList] = useState<TMovieListItem[]>([]);
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      try {
        const list = await Movies.getHomeList();
        setMovieList(list);

        const originals = list.find(i => i.slug === 'originals');
        if (originals && originals.items.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * originals.items.results.length);
          const chosen = originals.items.results[randomIndex];
          const chosenInfo = await Movies.getMovieInfo(chosen.id, 'tv');
          setFeaturedData(chosenInfo);
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);
  useEffect(() => {

    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeder(true)
      } else {
        setBlackHeder(false);
      }
    }

    window.addEventListener('scroll', scrollListener)
    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])
  return (
    <>

      <Header blackHeader={blackHeder} />
      {loading && (
        <div className="flex items-center justify-center h-[100vh]">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {featuredData && <FeaturedMovie feature={featuredData} />}
      <section className="z-">
        {
          movieList && movieList.map((item, index) => (
            <CardList key={index} items={item.items} title={item.title} />
          ))
        }
      </section>


      <footer className="bg-black text-gray-400 text-center py-6 mt-10 text-sm">
        <p>@AngolaMovies</p>
        <p>Criado em Angola pela empresa cinematográfica <strong className="text-white">AngolaMovie</strong>.</p>
      </footer>

    </>
  );
}
