'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Producto {
  id_producto: number;
  cod_producto: string;
  nombre: string;
  descripcion?: string;
  precio?: number;
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
  subcategoria: {
    nombre: string;
    categoria: {
      nombre: string;
    };
  };
  productos?: Producto[];
}

export default function ComercioPage() {
  const params = useParams();
  const [comercio, setComercio] = useState<Comercio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.slug) {
      fetchComercio(params.slug as string);
    }
  }, [params.slug]);

  const fetchComercio = async (slug: string) => {
    try {
      setLoading(true);
      
      // Simular datos del comercio hasta que tengamos el endpoint específico
      const mockComercio: Comercio = {
        id_comercio: 1,
        cod_comercio: "COM001",
        nombre: "Restaurante El Sabor",
        slug_comercio: "restaurante-el-sabor",
        descripcion: "El mejor sabor de la ciudad. Ofrecemos comida rápida de alta calidad con ingredientes frescos y sabores auténticos que te harán volver por más.",
        direccion: "Calle Principal 123, Santo Domingo",
        telefono: "809-555-0123",
        web: "https://elsabor.com",
        subcategoria: {
          nombre: "Comida Rápida",
          categoria: {
            nombre: "Restaurantes"
          }
        },
        productos: [
          {
            id_producto: 1,
            cod_producto: "PROD00001",
            nombre: "Hamburguesa Clásica",
            descripcion: "Hamburguesa con carne, lechuga, tomate y queso",
            precio: 350.00
          },
          {
            id_producto: 2,
            cod_producto: "PROD00002",
            nombre: "Papas Fritas",
            descripcion: "Papas fritas doradas y crujientes",
            precio: 150.00
          }
        ]
      };

      setComercio(mockComercio);
      setError(null);
    } catch (err) {
      setError('Error al cargar los datos del comercio');
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

  if (error || !comercio) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Comercio no encontrado</h2>
          <p className="text-gray-600 mb-4">{error || 'El comercio que buscas no existe'}</p>
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
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
            </li>
            <li className="text-blue-400">/</li>
            <li>
              <Link 
                href={`/categoria/${comercio.subcategoria.categoria.nombre.toLowerCase()}`} 
                className="text-blue-600 hover:text-blue-800"
              >
                {comercio.subcategoria.categoria.nombre}
              </Link>
            </li>
            <li className="text-blue-400">/</li>
            <li className="text-blue-800 font-medium">{comercio.nombre}</li>
          </ol>
        </nav>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Información principal del comercio */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <h1 className="text-3xl font-bold text-blue-900">{comercio.nombre}</h1>
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                    Abierto
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                    {comercio.subcategoria.categoria.nombre}
                  </span>
                  <span className="text-blue-400">•</span>
                  <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded">
                    {comercio.subcategoria.nombre}
                  </span>
                </div>

                {comercio.descripcion && (
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {comercio.descripcion}
                  </p>
                )}
              </div>
            </div>

            {/* Información de contacto */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {comercio.direccion && (
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <svg className="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-800 mb-1">Dirección</h3>
                    <p className="text-blue-700">{comercio.direccion}</p>
                  </div>
                </div>
              )}

              {comercio.telefono && (
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <svg className="w-5 h-5 text-green-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">Teléfono</h3>
                    <a href={`tel:${comercio.telefono}`} className="text-green-700 hover:text-green-800">
                      {comercio.telefono}
                    </a>
                  </div>
                </div>
              )}

              {comercio.web && (
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <svg className="w-5 h-5 text-purple-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-purple-800 mb-1">Sitio web</h3>
                    <a 
                      href={comercio.web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-700 hover:text-purple-800"
                    >
                      Visitar sitio
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Productos/Servicios */}
        {comercio.productos && comercio.productos.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">
              {comercio.subcategoria.categoria.nombre === 'Restaurantes' ? 'Menú' : 'Productos y Servicios'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comercio.productos.map((producto) => (
                <div key={producto.id_producto} className="border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    {producto.nombre}
                  </h3>
                  
                  {producto.descripcion && (
                    <p className="text-gray-600 mb-3">{producto.descripcion}</p>
                  )}
                  
                  {producto.precio && (
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">
                        ${producto.precio.toFixed(2)}
                      </span>
                      <span className="text-gray-500 text-sm"> DOP</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            💬 Enviar mensaje
          </button>
          <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium">
            ⭐ Dejar reseña
          </button>
          <button className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors font-medium">
            ❤️ Agregar a favoritos
          </button>
        </div>
      </main>
    </div>
  );
}
