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
npm run start
npm run android 
npm run ios
npm run web 
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
