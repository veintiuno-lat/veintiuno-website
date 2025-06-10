# veintiuno.lat

Una plataforma web moderna para conectar y descubrir comunidades Bitcoiners en toda Latinoamérica.

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
│   ├── analytics/       # Sistema de analytics
│   ├── layout/          # Header, Footer
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

Este proyecto utiliza [pnpm](https://pnpm.io/) para instalar dependencias y ejecutar scripts.

```bash
# Instalar dependencias
pnpm i

# Ejecutar servidor de desarrollo
pnpm dev

# Build para producción
pnpm build

# Previsualizar build
pnpm start
```

## 📝 Agregar Contenido

### Nueva Comunidad

1. Edita `src/data/communities.ts`
2. Agrega un nuevo objeto Community con todos los campos requeridos
3. Asegúrate de incluir coordenadas precisas (latitud/longitud)

## 🤝 Contribuir

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**veintiuno.lat** - Conectando el futuro Bitcoiner de Latinoamérica 🚀