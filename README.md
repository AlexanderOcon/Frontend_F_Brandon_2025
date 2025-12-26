# Frontend F Brandon 2025

Una aplicación de gestión de inventario y ventas construida con React, Vite y Supabase.

## Características

- Gestión de clientes, empleados, productos, categorías, compras y ventas
- Interfaz responsiva con Bootstrap
- Generación de reportes en PDF
- Autenticación básica (puedes integrar Supabase Auth)
- Base de datos relacional con Supabase

## Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ve a Settings > API para obtener tu URL del proyecto y la clave anónima
3. Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_SUPABASE_URL=tu_supabase_project_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 3. Configurar la base de datos

Crea las siguientes tablas en Supabase (o importa el esquema SQL):

- `clientes`
- `empleados`
- `productos`
- `categorias`
- `compras`
- `ventas`
- `detalles_ventas`
- `usuarios`

Asegúrate de configurar las claves foráneas apropiadas.

### 4. Ejecutar la aplicación

```bash
npm run dev
```

## Construcción para producción

```bash
npm run build
```

## Tecnologías utilizadas

- React 19
- Vite
- Bootstrap 5
- Supabase
- jsPDF para reportes
- React Router DOM
