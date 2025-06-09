# Veintiuno.lat - Plataforma de Comunidades Tech Latinoamericanas

Una plataforma web moderna para conectar y descubrir comunidades tecnológicas en toda Latinoamérica, inspirada en twentyone.world.

## 🚀 Características

- **Mapa Interactivo**: Explora comunidades tech en toda Latinoamérica con marcadores interactivos
- **Sistema de Blog**: Contenido basado en archivos MDX para fácil gestión
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags y estructura semántica
- **Modales Informativos**: Detalles completos de cada comunidad
- **Navegación Intuitiva**: UX/UI centrada en el usuario

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Mapas**: Leaflet + React Leaflet
- **Content**: MDX para blog posts
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/           # Header, Footer
│   ├── map/             # Componentes del mapa interactivo
│   └── mdx/             # Componentes para MDX
├── pages/               # Páginas principales
├── data/                # Datos de comunidades
├── types/               # Definiciones TypeScript
└── content/
    └── blog/            # Posts del blog en MDX
```

## 🗺️ Estructura de Datos

### Comunidades (communities.ts)

```typescript
interface Community {
  id: string;
  title: string;
  description: string;
  link: string;
  latitude: number;
  longitude: number;
  country: string;
  city?: string;
  tags?: string[];
  category?: string;
}
```

### Blog Posts (archivos .mdx)

```yaml
---
title: "Título del Post"
date: "2024-01-15"
author: "Nombre del Autor"
excerpt: "Resumen del artículo"
tags: ["tag1", "tag2"]
readTime: "5 min"
---
```

## 🚀 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview
```

## 📝 Agregar Contenido

### Nueva Comunidad

1. Edita `src/data/communities.ts`
2. Agrega un nuevo objeto Community con todos los campos requeridos
3. Asegúrate de incluir coordenadas precisas (latitud/longitud)

### Nuevo Post de Blog

1. Crea un archivo `.mdx` en `src/content/blog/`
2. Incluye frontmatter con metadatos
3. Escribe el contenido en formato MDX/Markdown

## 🎨 Sistema de Diseño

### Colores

- **Primary Coral**: #FF6B6B (coral-500)
- **Secondary Teal**: #4ECDC4 (teal-500)  
- **Accent Gold**: #FFD93D (gold-500)
- **Neutrals**: Grays del 50 al 900

### Tipografía

- **Font Family**: Inter
- **Weights**: 400 (normal), 600 (semibold), 700 (bold)
- **Line Heights**: 150% body, 120% headings

### Espaciado

Sistema basado en 8px con clases de Tailwind CSS.

## 🌍 Optimización SEO

- Meta tags descriptivos
- Open Graph tags
- URLs semánticas
- Estructura HTML semántica
- Sitemap automático

## 📱 Responsividad

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🌟 Comunidades Incluidas

Actualmente incluimos comunidades de:

- 🇲🇽 México (React México)
- 🇦🇷 Argentina (Python Argentina)  
- 🇨🇱 Chile (DevOps Chile)
- 🇨🇴 Colombia (Flutter Colombia)
- 🇧🇷 Brasil (JS Brasil)
- 🇵🇪 Perú (Data Science Perú)
- 🇨🇷 Costa Rica (Blockchain Costa Rica)
- 🇺🇾 Uruguay (UX/UI Uruguay)

¿Conoces más comunidades? ¡Ayúdanos a expandir el directorio!

---

**Veintiuno.lat** - Conectando el futuro tecnológico de Latinoamérica 🚀