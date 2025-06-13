'use client'

import { basicFetch } from '@/app/server/movies';
import React, { useState, useEffect } from 'react';

interface Genre {
  id: number;
  name: string;
}

interface Feature {
  id: number;
  original_name: string;
  vote_average: number;
  first_air_date: string;
  number_of_seasons: number;
  overview: string;
  backdrop_path: string;
  genres: Genre[];
}

interface FeaturedMovieProps {
  feature: Feature;
}

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number;
  movieTitle: string;
}

const TrailerModal: React.FC<TrailerModalProps> = ({ isOpen, onClose, movieId, movieTitle }) => {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && movieId) {
      fetchTrailer();
    }
  }, [isOpen, movieId]);

  const fetchTrailer = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await basicFetch(`/${movieId}/videos?api_key=1fc2a9de1e65544b244facd066e1bfd1&language=pt-BR`);
      if (!response.ok) {
        throw new Error('Erro ao buscar trailer');
      }

      const data = await response.json();
      console.log("Videos", data)
      const trailer = data.results.find((video: any) =>
        video.type === 'Trailer' && video.site === 'YouTube'
      ) || data.results.find((video: any) => video.site === 'YouTube');

      if (trailer) {
        setTrailerKey('cwqNAkwhKqw');
      } else {
        setError('Trailer não disponível');
      }
    } catch (err) {
      console.error('Erro ao buscar trailer:', err);
      setError('Erro ao carregar trailer');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTrailerKey(null);
    setError(null);
    onClose();
  };

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl mx-4">
        {/* Botão de fechar */}
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-400 transition-colors z-20"
        >
          ✕
        </button>

        {/* Conteúdo do modal */}
        <div className="bg-black rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">{movieTitle}</h2>
          </div>

          <div className="aspect-video bg-gray-900">
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-white">Carregando trailer...</div>
              </div>
            )}

            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="text-red-400">{error}</div>
              </div>
            )}

            {!loading && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${'cwqNAkwhKqw'}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedMovie: React.FC<FeaturedMovieProps> = ({ feature }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstDate = new Date(feature.first_air_date);
  const genres = feature.genres.map(genre => genre.name);

  const handleWatchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      
      <main
        className="h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${feature.backdrop_path})` }}
      >
        <div className="w-full h-full bg-gradient-to-t from-[#141414] to-transparent">
          <div className="w-full h-full bg-gradient-to-r from-[#111] via-[#111] to-transparent flex flex-col justify-center pl-8 pb-[150px] pt-[70px]">
            <div className="text-5xl md:text-6xl font-bold text-white w-[58%]">
              {feature.original_name}
            </div>
            <div className="text-lg mt-4 font-bold text-white">
              <span className="inline-block mr-4 text-green-500">
                {feature.vote_average} Pontos
              </span>
              <span className="inline-block mr-4">
                {firstDate.getFullYear()}
              </span>
              <span className="inline-block mr-4">
                {feature.number_of_seasons} Temporada{feature.number_of_seasons !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="mt-4 text-base md:text-lg text-gray-400 max-w-[40%]">
              {feature.overview}
            </div>
            <div className="mt-4">
              <button
                onClick={handleWatchClick}
                className="inline-block text-black bg-white text-lg px-6 py-3 rounded-md mr-4 hover:opacity-70 transition duration-300 cursor-pointer"
              >
                ▶ Assistir Trailer
              </button>
              <a
                href={`/list/${feature.id}`}
                className="inline-block bg-gray-800 text-white text-lg px-6 py-3 rounded-md hover:opacity-70 transition duration-300"
              >
                + Minha Lista
              </a>
            </div>
            <div className="mt-4 text-lg text-gray-400">
              <strong>Gêneros: </strong> {genres.join(', ')}
            </div>
          </div>
        </div>
      </main>

      {/* Modal do Trailer */}
      <TrailerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        movieId={feature.id}
        movieTitle={feature.original_name}
      />
    </>
  );
};

export default FeaturedMovie;