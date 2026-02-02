# Biblioteca Virtual - Frontend

Aplicación web frontend para la gestión y lectura de un acervo bibliográfico digital. Permite a administradores gestionar libros, categorías, usuarios y períodos académicos, mientras que los estudiantes pueden explorar, filtrar, puntuar, reseñar y leer libros.

## Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Roles de Usuario](#roles-de-usuario)
- [Instalación Local (Sin Docker)](#instalación-local-sin-docker)
- [Instalación con Docker](#instalación-con-docker)
- [Variables de Entorno](#variables-de-entorno)
- [Comandos Disponibles](#comandos-disponibles)
- [API y Backend](#api-y-backend)

---

## Características

### Para Estudiantes

- **Explorar catálogo** de libros con búsqueda por título/autor
- **Filtrar por categorías** para encontrar libros de interés
- **Ver detalles** de cada libro (portada, descripción, autor)
- **Puntuar libros** con sistema de estrellas (1-5)
- **Escribir reseñas** y responder a otras reseñas
- **Leer libros** directamente en la aplicación (PDF)
- **Perfil de usuario** con información personal

### Para Administradores

- **Dashboard** con estadísticas del sistema
- **Gestionar libros**: crear, editar, eliminar
- **Gestionar categorías**: organizar el acervo
- **Gestionar usuarios**: registrar estudiantes y administradores
- **Gestionar períodos académicos**: controlar ciclos escolares
- **Panel privado** con navegación dedicada

---

## Tecnologías

| Categoría         | Tecnología                            |
| ----------------- | ------------------------------------- |
| Framework         | React 19.2                            |
| Lenguaje          | TypeScript 5.9                        |
| Build Tool        | Vite 7                                |
| Estilos           | Tailwind CSS 4                        |
| Componentes UI    | Radix UI (Dialog, Alert-Dialog, Slot) |
| Estado Global     | Zustand                               |
| Data Fetching     | TanStack Query (React Query)          |
| Formularios       | React Hook Form + Zod                 |
| Routing           | React Router DOM 7                    |
| Visualización PDF | React PDF                             |
| Icons             | Lucide React                          |
| HTTP Client       | Axios                                 |
| Notificaciones    | Sonner (toasts)                       |
| Linting           | ESLint 9                              |
| Contenedores      | Docker + Nginx                        |

---

## Estructura del Proyecto

```
biblioteca-client/
├── src/
│   ├── components/
│   │   ├── ui/              # Componentes reutilizables (Button, Card, Input, etc.)
│   │   └── common/          # Componentes compartidos (LoadingState, ErrorState, etc.)
│   ├── features/            # Módulos por funcionalidad
│   │   ├── auth/            # Autenticación (login, logout)
│   │   ├── books/           # Gestión y lectura de libros
│   │   ├── category/        # Gestión de categorías
│   │   ├── dashboard/       # Panel de administración
│   │   ├── periods/         # Períodos académicos
│   │   ├── ratings/         # Sistema de puntuación
│   │   ├── reviews/         # Sistema de reseñas
│   │   └── user/            # Gestión de usuarios y perfiles
│   ├── layouts/
│   │   ├── AdminLayout.tsx  # Layout para administradores
│   │   ├── StudentLayout.tsx # Layout para estudiantes
│   │   └── AuthLayout.tsx   # Layout para autenticación
│   ├── hooks/               # Hooks personalizados
│   ├── lib/                 # Utilidades
│   ├── stores/              # Estado global (Zustand)
│   ├── config/              # Configuración (Axios, React Query)
│   ├── routes/              # Definición de rutas
│   ├── guards/              # Protectores de ruta (AuthGuard)
│   ├── common/              # Tipos y constantes compartidas
│   ├── App.tsx              # Componente principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globales + Tailwind
├── public/                  # Archivos estáticos
├── compose.yml              # Configuración Docker Compose
├── Dockerfile               # Configuración Docker
├── nginx.conf               # Configuración Nginx
├── package.json             # Dependencias y scripts
├── tsconfig.json            # Configuración TypeScript
├── eslint.config.js         # Configuración ESLint
└── AGENTS.md                # Guías para agentes IA
```

---

## Roles de Usuario

### ADMIN

Acceso completo al sistema:

- Dashboard con estadísticas
- Gestión de libros (CRUD completo)
- Gestión de categorías
- Gestión de usuarios
- Gestión de períodos académicos
- Interfaz con sidebar colapsable

### STUDENT

Acceso limitado:

- Explorar catálogo de libros
- Buscar y filtrar por categoría
- Ver detalles de libros
- Puntuar y reseñar libros
- Leer libros en PDF
- Ver su perfil

---

## Instalación Local (Sin Docker)

### Requisitos Previos

| Requisito | Versión Mínima | Descripción                      |
| --------- | -------------- | -------------------------------- |
| Node.js   | 18+            | Entorno de ejecución             |
| pnpm      | 9.0+           | Gestor de paquetes (recomendado) |
| npm       | 10+            | Alternativa a pnpm               |

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica)

   ```bash
   git clone <url-del-repositorio>
   cd biblioteca-client
   ```

2. **Instalar dependencias**

   ```bash
   # Usando pnpm (recomendado)
   pnpm install

   # O usando npm
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   # Copiar el archivo de ejemplo
   cp .env.example .env

   # Editar con tu editor preferido
   nano .env
   ```

4. **Iniciar el servidor de desarrollo**

   ```bash
   pnpm run dev
   ```

5. **Acceder a la aplicación**
   - URL: http://localhost:5173

---

## Instalación con Docker

### Requisitos Previos

| Requisito      | Versión Mínima | Descripción                  |
| -------------- | -------------- | ---------------------------- |
| Docker Engine  | 20.10+         | Motor de contenedores        |
| Docker Compose | 2.0+           | Orquestación de contenedores |

### Pasos de Instalación

1. **Clonar el repositorio** (si aplica)

   ```bash
   git clone <url-del-repositorio>
   cd biblioteca-client
   ```

2. **Configurar variables de entorno**

   ```bash
   # Crear archivo .env
   cp .env.example .env

   # Editar la variable de API
   nano .env
   # VITE_API_BASE_URL=http://tu-ip:3000/api
   ```

3. **Construir y ejecutar contenedores**

   ```bash
   # Construir imágenes y ejecutar
   docker compose up --build

   # O en segundo plano
   docker compose up --build -d
   ```

4. **Acceder a la aplicación**
   - URL: http://localhost:4000

### Comandos Docker Útiles

```bash
# Ver contenedores en ejecución
docker compose ps

# Ver logs
docker compose logs -f biblioteca-frontend

# Detener contenedores
docker compose down

# Detener y eliminar volúmenes
docker compose down -v

# Reconstruir imágenes
docker compose build --no-cache
```

---

## Variables de Entorno

| Variable            | Descripción         | Valor por Defecto | Requerido |
| ------------------- | ------------------- | ----------------- | --------- |
| `VITE_API_BASE_URL` | URL del backend API | -                 | Sí        |

### Ejemplo de .env

```env
# Desarrollo local (backend en localhost:3000)
VITE_API_BASE_URL=http://localhost:3000/api

# Desarrollo con Docker (backend en red Docker)
VITE_API_BASE_URL=http://backend:3000/api

# Producción (reemplazar con tu dominio)
VITE_API_BASE_URL=https://api.tu-dominio.com/api
```

---

## Comandos Disponibles

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo
pnpm run dev

# Ver disponible en http://localhost:5173
```

### Build y Producción

```bash
# Compilar TypeScript + Build Vite
pnpm run build

# Previsualizar build de producción
pnpm run preview

# Ver disponible en http://localhost:4173
```

### Linting

```bash
# Ejecutar ESLint en todo el proyecto
pnpm run lint

# Verificar y corregir errores automáticamente
pnpm run lint --fix
```

### Docker

```bash
# Construir imagen
docker build -t biblioteca-frontend .

# Ejecutar contenedor
docker run -p 4000:80 -e VITE_API_BASE_URL=... biblioteca-frontend

# Con Docker Compose
docker compose up --build
docker compose down
```

---

## API y Backend

Esta aplicación consume un backend RESTful. La API debe proporcionar los siguientes endpoints:

### Autenticación

- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Libros

- `GET /api/books` - Listar libros (con paginación y filtros)
- `GET /api/books/:id` - Obtener libro por ID
- `POST /api/books` - Crear libro (ADMIN)
- `PUT /api/books/:id` - Actualizar libro (ADMIN)
- `DELETE /api/books/:id` - Eliminar libro (ADMIN)
- `GET /api/books/:id/reading` - Obtener URL para leer PDF

### Categorías

- `GET /api/categories` - Listar categorías
- `POST /api/categories` - Crear categoría (ADMIN)
- `PUT /api/categories/:id` - Actualizar categoría (ADMIN)
- `DELETE /api/categories/:id` - Eliminar categoría (ADMIN)

### Usuarios

- `GET /api/users` - Listar usuarios (ADMIN)
- `POST /api/users/register` - Registrar usuario (ADMIN)
- `POST /api/users/students` - Registrar estudiante (ADMIN)
- `GET /api/users/students` - Listar estudiantes (ADMIN)

### Períodos

- `GET /api/periods` - Listar períodos académicos
- `POST /api/periods` - Crear período (ADMIN)
- `PUT /api/periods/:id/current` - Establecer período actual (ADMIN)

### Puntuaciones

- `POST /api/ratings` - Crear/actualizar puntuación
- `GET /api/ratings/book/:bookId` - Obtener puntuación de libro

### Reseñas

- `GET /api/reviews/book/:bookId` - Obtener reseñas de libro
- `POST /api/reviews` - Crear reseña
- `DELETE /api/reviews/:id` - Eliminar reseña
