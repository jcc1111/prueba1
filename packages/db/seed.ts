import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Crear categorías de ejemplo
  const categoria1 = await prisma.categoria.create({
    data: {
      cod_categoria: '01',
      nombre: 'Restaurantes',
      slug_categoria: 'restaurantes',
    },
  })

  const categoria2 = await prisma.categoria.create({
    data: {
      cod_categoria: '02',
      nombre: 'Servicios',
      slug_categoria: 'servicios',
    },
  })

  // Crear subcategorías de ejemplo
  const subcategoria1 = await prisma.subcategoria.create({
    data: {
      cod_subcategoria: '001',
      nombre: 'Comida Rápida',
      slug_subcategoria: 'comida-rapida',
      id_categoria: categoria1.id_categoria,
    },
  })

  const subcategoria2 = await prisma.subcategoria.create({
    data: {
      cod_subcategoria: '002',
      nombre: 'Comida Gourmet',
      slug_subcategoria: 'comida-gourmet',
      id_categoria: categoria1.id_categoria,
    },
  })

  // Crear usuario de ejemplo
  const usuario1 = await prisma.usuario.create({
    data: {
      email: 'comerciante@tuarica.com',
      nombre: 'Juan Pérez',
      password: 'hashedpassword123',
      rol: 'comerciante',
    },
  })

  // Crear comercio de ejemplo
  const comercio1 = await prisma.comercio.create({
    data: {
      cod_comercio: 'COM001',
      nombre: 'Restaurante El Sabor',
      slug_comercio: 'restaurante-el-sabor',
      descripcion: 'El mejor sabor de la ciudad',
      ubicacion_geografica: '18.4861,-69.9312', // Coordenadas temporales como string
      direccion: 'Calle Principal 123, Santo Domingo',
      telefono: '809-555-0123',
      web: 'https://elsabor.com',
      id_subcategoria: subcategoria1.id_subcategoria,
      id_usuario: usuario1.id_usuario,
    },
  })

  // Crear productos de ejemplo
  await prisma.producto.create({
    data: {
      cod_producto: 'PROD00001',
      nombre: 'Hamburguesa Clásica',
      slug_producto: 'hamburguesa-clasica',
      descripcion: 'Hamburguesa con carne, lechuga, tomate y queso',
      precio: 350.00,
      id_comercio: comercio1.id_comercio,
    },
  })

  await prisma.producto.create({
    data: {
      cod_producto: 'PROD00002',
      nombre: 'Papas Fritas',
      slug_producto: 'papas-fritas',
      descripcion: 'Papas fritas doradas y crujientes',
      precio: 150.00,
      id_comercio: comercio1.id_comercio,
    },
  })

  console.log('✅ Datos de prueba creados exitosamente!')
  console.log(`📊 Categorías: 2`)
  console.log(`📂 Subcategorías: 2`)
  console.log(`👤 Usuarios: 1`)
  console.log(`🏪 Comercios: 1`)
  console.log(`🍔 Productos: 2`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error al ejecutar el seed:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
