'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Search } from 'lucide-react';

type HeaderProps = {
    blackHeader: boolean;
}

export function Header({ blackHeader }: HeaderProps){
    const [showSearch, setShowSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleSearch = () => setShowSearch(!showSearch);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setSearchTerm('');
            setShowSearch(false);
        }
    };

    return (
        <header
            className={`
        fixed top-0 left-0 right-0 z-[999] h-[70px]
        flex justify-between items-center px-[30px]
        transition-all ease-in-out duration-500
        ${blackHeader ? 'bg-[#141414]' : 'bg-transparent'}
      `}
        >
            <div className="flex items-center gap-8">
                <div className="relative h-[25px] w-[100px]">
                    <Link href="/">
                        <Image
                            src="/logonetflix.png"
                            alt="Logo"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-[3px]"
                        />
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6 text-white text-sm font-medium">
                    <Link href="/">Página inicial</Link>
                    <Link href="/series">Séries</Link>
                    <Link href="/filmes">Filmes</Link>
                    <Link href="/jogos">Jogos</Link>
                    <Link href="/novidades">Novidades mais vistas</Link>
                    <Link href="/minha-lista">A minha lista</Link>
                    <Link href="/idioma">Procurar por idioma</Link>
                </nav>
            </div>

            <div className="flex items-center gap-4">

                <div className="relative">
                    <button onClick={toggleSearch} className="text-white cursor-pointer">
                        <Search size={20} />
                    </button>
                    {showSearch && (
                        <form
                            onSubmit={handleSearch}
                            className="absolute right-0 mt-2 bg-[#1f1f1f] bg-opacity-90 backdrop-blur-md px-4 py-2 rounded-md flex items-center gap-2 border border-gray-600 shadow-lg animate-fade-in z-50"
                            role="search"
                            aria-label="Campo de busca"
                        >
                            <input
                                type="text"
                                className="bg-transparent text-white placeholder-gray-400 text-sm outline-none w-44 focus:w-60 transition-all duration-300"
                                placeholder="Buscar filmes, séries..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="text-sm text-gray-300 hover:text-white font-semibold transition-colors"
                                aria-label="Enviar busca"
                            >
                                OK
                            </button>
                        </form>
                    )}
                </div>
                <div className="relative h-[35px] w-[35px]">
                    <Link href="/perfil">
                        <Image
                            src="/netflix-avatar.png"
                            alt="Avatar"
                            fill
                            style={{ objectFit: 'contain' }}
                            className="rounded-[3px]"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
};

