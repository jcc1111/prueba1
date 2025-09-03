'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Categoria {
  id_categoria: number;
  cod_categoria: string;
  nombre: string;
  slug_categoria: string;
}

interface Subcategoria {
  id_subcategoria: number;
  cod_subcategoria: string;
  nombre: string;
  slug_subcategoria: string;
}

interface Comercio {
  id_comercio: number;
  cod_comercio: string;
  nombre: string;
  slug_comercio: string;
  descripcion?: string;
  direccion?: string;
  telefono?: string;
  web?: string;
  subcategoria: Subcategoria;
}

export default function CategoriaPage() {
  const params = useParams();
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [comercios, setComercios] = useState<Comercio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchCategoriaYComercios(params.slug as string);
    }
  }, [params.slug]);

  const fetchCategoriaYComercios = async (slugParam: string) => {
    try {
      setLoading(true);
      
      // Simular datos hasta que tengamos endpoints específicos
      const mockCategoria: Categoria = {
        id_categoria: 1,
        cod_categoria: "01",
        nombre: "Restaurantes",
        slug_categoria: slugParam
      };

      const mockComercios: Comercio[] = [
        {
          id_comercio: 1,
          cod_comercio: "COM001",
          nombre: "Restaurante El Sabor",
          slug_comercio: "restaurante-el-sabor",
          descripcion: "El mejor sabor de la ciudad",
          direccion: "Calle Principal 123, Santo Domingo",
          telefono: "809-555-0123",
          web: "https://elsabor.com",
          subcategoria: {
            id_subcategoria: 1,
            cod_subcategoria: "001",
            nombre: "Comida Rápida",
            slug_subcategoria: "comida-rapida"
          }
        }
      ];

      setCategoria(mockCategoria);
      setComercios(mockComercios);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link href="/" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="TuArica logo"
                width={40}
                height={40}
                className="text-blue-600"
              />
              <span className="text-2xl font-bold text-blue-900">TuArica</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
              <Link href="/categorias" className="text-blue-600 hover:text-blue-800">Categorías</Link>
              <Link href="/comercios" className="text-blue-600 hover:text-blue-800">Comercios</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
            </li>
            <li className="text-blue-400">/</li>
            <li className="text-blue-800 font-medium">{categoria?.nombre}</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Título de la categoría */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">
            {categoria?.nombre === 'Restaurantes' ? '🍽️' : 
             categoria?.nombre === 'Servicios' ? '🔧' : 
             categoria?.nombre === 'Hoteles' ? '🏨' : '🏪'}
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">{categoria?.nombre}</h1>
          <p className="text-lg text-blue-700">
            Explora los mejores {categoria?.nombre.toLowerCase()} en Arica
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              type="text"
              placeholder="Buscar comercios..."
              className="flex-1 px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select className="px-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Todas las subcategorías</option>
              <option value="comida-rapida">Comida Rápida</option>
              <option value="comida-gourmet">Comida Gourmet</option>
            </select>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Buscar
            </button>
          </div>
        </div>

        {/* Lista de comercios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comercios.map((comercio) => (
            <div key={comercio.id_comercio} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-semibold text-blue-800">
                  {comercio.nombre}
                </h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Abierto
                </span>
              </div>
              
              <div className="mb-3">
                <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                  {comercio.subcategoria.nombre}
                </span>
              </div>

              {comercio.descripcion && (
                <p className="text-gray-600 mb-4">{comercio.descripcion}</p>
              )}

              <div className="space-y-2 text-sm text-gray-500 mb-4">
                {comercio.direccion && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {comercio.direccion}
                  </div>
                )}
                
                {comercio.telefono && (
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {comercio.telefono}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Link
                  href={`/comercio/${comercio.slug_comercio}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Ver detalles
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                {comercio.web && (
                  <a
                    href={comercio.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-blue-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {comercios.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No se encontraron comercios</h3>
            <p className="text-gray-600">
              No hay comercios registrados en esta categoría por el momento.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
