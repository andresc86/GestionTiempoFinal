# TicTonTo – Build unificado (fix Firebase + gamificación básica)
Fecha: 2025-10-19T18:01:59

## Qué hice
- **Arreglé la API Key** de Firebase (había un typo). Ahora es:
  `AIzaSyBdTSE4dXiWWn0LN5Vwo4yXlyoVheN0Jc8`
- Actualicé `src/services/firebaseConfig.js` y `app.config.js` para usar esa key.
- **Añadí una racha diaria (streak)** sencilla:
  - Nueva utilidad: `src/utils/streak.js` (usa AsyncStorage).
  - `HomeScreen` ahora muestra `🔥 Racha: N día(s)` y actualiza automáticamente al abrir.

## Cómo ejecutar
1. Instala dependencias:
   ```bash
   npm install
   # o
   yarn
   ```
2. Inicia en Expo:
   ```bash
   npx expo start
   ```
3. Si usas login por email/clave, asegúrate de que en **Firebase Console → Authentication → Métodos de acceso** esté **Email/Password** activado.

## Notas
- Si necesitas **rotar** la API key, cámbiala tanto en `firebaseConfig.js` como en `app.config.js`.
- Considera mover las credenciales a variables de entorno (similar al proyecto del profe con `process.env.EXPO_PUBLIC_*`).

## Próximos pasos sugeridos
- **Logros y medallas** por rachas de 3/7/14 días.
- **Tareas tipo misión** (diarias y semanales) con puntos XP.
- **Timer Pomodoro** con vibración/hápticos al terminar.
- **Notificaciones locales** para recordar planes del día.
- **Tema** respetando la paleta actual, con micro-animaciones al completar objetivos.
