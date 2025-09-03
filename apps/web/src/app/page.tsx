import Image from "next/image";

// Función para obtener categorías del backend
async function getCategorias() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/categorias`, {
			cache: 'no-store' // Para obtener datos frescos
		});
		
		if (!response.ok) {
			throw new Error('Error al obtener categorías');
		}
		
		return await response.json();
	} catch (error) {
		console.error('Error fetching categorías:', error);
		// Fallback en caso de error
		return [
			{ cod_categoria: "01", nombre: "Restaurantes", slug_categoria: "restaurantes" },
			{ cod_categoria: "02", nombre: "Servicios", slug_categoria: "servicios" },
		];
	}
}

export default async function Home() {
	const categorias = await getCategorias();

	return (
		<div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
			{/* Header */}
			<header className="bg-white shadow-sm border-b border-blue-200">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col items-center text-center">
						<div className="flex items-center gap-3 mb-3">
							<Image
								src="/logo.svg"
								alt="TuArica logo"
								width={60}
								height={60}
								className="text-blue-600"
							/>
							<h1 className="text-4xl font-bold text-blue-900">
								TuArica
							</h1>
						</div>
						<p className="text-lg text-blue-700 max-w-2xl">
							Directorio geolocalizado de comercios y servicios en Arica
						</p>
						<p className="text-sm text-blue-500 mt-2">
							Descubre los mejores comercios locales cerca de ti
						</p>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Buscador */}
				<div className="bg-white rounded-xl shadow-lg p-8 mb-12">
					<h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
						¿Qué estás buscando?
					</h2>
					<div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
						<input
							type="text"
							placeholder="Buscar comercios, productos o servicios..."
							className="flex-1 px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
							Buscar
						</button>
					</div>
				</div>

				{/* Categorías */}
				<section>
					<h2 className="text-2xl font-semibold text-blue-800 mb-8 text-center">
						Explora por categorías
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
						{categorias.map((categoria: any) => (
							<a
								key={categoria.cod_categoria}
								href={`/categoria/${categoria.slug_categoria}`}
								className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-center border border-blue-100 hover:border-blue-300"
							>
								<div className="text-4xl mb-4">
									{categoria.nombre === 'Restaurantes' ? '🍽️' : 
									 categoria.nombre === 'Servicios' ? '🔧' : 
									 categoria.nombre === 'Hoteles' ? '🏨' : '🏪'}
								</div>
								<h3 className="text-xl font-semibold text-blue-800 group-hover:text-blue-600 mb-2">
									{categoria.nombre}
								</h3>
								<p className="text-sm text-blue-500">
									Código: {categoria.cod_categoria}
								</p>
								<div className="mt-4 inline-flex items-center text-sm text-blue-600 group-hover:text-blue-700">
									Ver comercios
									<svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
									</svg>
								</div>
							</a>
						))}
					</div>
				</section>

				{/* Comercios Destacados */}
				<section className="bg-white rounded-xl shadow-lg p-8">
					<h2 className="text-2xl font-semibold text-blue-800 mb-6 text-center">
						Comercios destacados
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Ejemplo de comercio destacado */}
						<div className="border border-blue-200 rounded-lg p-6 hover:shadow-md transition-shadow">
							<div className="flex items-start justify-between mb-3">
								<h3 className="text-lg font-semibold text-blue-800">
									Restaurante El Sabor
								</h3>
								<span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
									Abierto
								</span>
							</div>
							<p className="text-blue-600 text-sm mb-2">Comida Rápida</p>
							<p className="text-gray-600 text-sm mb-4">
								El mejor sabor de la ciudad
							</p>
							<div className="flex items-center text-sm text-gray-500 mb-3">
								<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								Calle Principal 123, Santo Domingo
							</div>
							<a
								href="/comercio/restaurante-el-sabor"
								className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
							>
								Ver detalles
								<svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
								</svg>
							</a>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-blue-900 text-blue-100 py-12 mt-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<div>
							<h3 className="text-lg font-semibold mb-4">TuArica</h3>
							<p className="text-blue-200 text-sm">
								Conectando comercios locales con la comunidad de Arica
							</p>
						</div>
						<div>
							<h4 className="text-sm font-semibold text-blue-200 mb-3">ENLACES</h4>
							<ul className="space-y-2 text-sm">
								<li><a href="/categorias" className="hover:text-white transition-colors">Todas las categorías</a></li>
								<li><a href="/comercios" className="hover:text-white transition-colors">Directorio de comercios</a></li>
								<li><a href="/contacto" className="hover:text-white transition-colors">Contacto</a></li>
							</ul>
						</div>
						<div>
							<h4 className="text-sm font-semibold text-blue-200 mb-3">PARA COMERCIANTES</h4>
							<ul className="space-y-2 text-sm">
								<li><a href="/registro" className="hover:text-white transition-colors">Registrar mi comercio</a></li>
								<li><a href="/planes" className="hover:text-white transition-colors">Planes y precios</a></li>
							</ul>
						</div>
					</div>
					<div className="border-t border-blue-800 mt-8 pt-8 text-center text-sm text-blue-300">
						&copy; {new Date().getFullYear()} TuArica. Todos los derechos reservados.
					</div>
				</div>
			</footer>
		</div>
	);
}
