# TiempoQuest

App de gestión de tiempo con enfoque didáctico (estilo recompensas tipo Duolingo).  
Este repo parte de la base entregada por el profesor y se personalizó **solo la interfaz** (colores, títulos y estilos).

## ¿Qué se cambió en esta entrega?
- 🎨 Nueva paleta de colores (emerald/cyan + acentos para recompensas).
- 🏷️ Títulos y textos iniciales alineados al concepto **TiempoQuest**.
- 🧩 Estructura mínima de _theme_ para reutilizar estilos (`src/theme/index.js`).

## Scripts
```bash
npm install
npm run start      # abrir menú Expo
npm run android    # lanzar en emulador/dispositivo Android
npm run ios        # lanzar en iOS (solo macOS)
npm run web        # vista web de Expo
```

## Estructura relevante
```
App.js
src/
  constants/colors.js   # paleta de colores (editable)
  theme/index.js        # estilos reutilizables (opcional)
assets/                 # íconos/imágenes
```

> Nota: La lógica de recompensas/progreso se implementará en iteraciones futuras con el profesor.
