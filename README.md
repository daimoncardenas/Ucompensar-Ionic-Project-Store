# Hybrid Store (Angular + Ionic + Capacitor)

## Run dev (web)
1. Backend: `cd api && node index.js`  (http://localhost:3001)
2. Frontend: `npm start`  (http://localhost:4200)

## Build Capacitor + Android
1. `ionic build`
2. `npx cap sync android`
3. `npx cap open android` (abre Android Studio, compila, corre en emulador)

> Nota: API en web usa http://localhost:3001 (ok).
> En Android el API debe apuntar a http://10.0.2.2:3001 (se dejó documentado en el informe).
