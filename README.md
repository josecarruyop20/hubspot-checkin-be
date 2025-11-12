# Express TypeScript Server con HTTPS

Servidor Express con TypeScript configurado para webhooks de HubSpot con soporte HTTPS.

## 🚀 Inicio Rápido

### Opción 1: Usar ngrok (Recomendado)

1. Inicia tu servidor:
```bash
npm run dev
```

2. En otra terminal, expone tu servidor con HTTPS:
```bash
npm run tunnel
```

3. Ngrok te dará una URL HTTPS como: `https://abc123.ngrok.io`

4. Usa esta URL en HubSpot: `https://abc123.ngrok.io/register`

### Opción 2: HTTPS Local (Certificados auto-firmados)

El servidor ya está configurado para HTTPS local:

1. Inicia el servidor:
```bash
npm run dev
```

2. Accede a:
   - HTTP: `http://localhost:3000/register`
   - HTTPS: `https://localhost:3001/register` (certificado auto-firmado)

**Nota:** Los certificados auto-firmados no funcionarán con HubSpot webhooks. Usa ngrok para pruebas reales.

## 📋 Endpoints Disponibles

- `POST /register` - Endpoint para webhooks de HubSpot

## 🛠 Scripts Disponibles

- `npm start` - Ejecutar servidor
- `npm run dev` - Desarrollo con nodemon
- `npm run tunnel` - Exponer con ngrok
- `npm run build` - Compilar TypeScript

## 🔧 Configuración de HubSpot

1. Ve a tu cuenta de HubSpot
2. Navega a Settings > Integrations > Webhooks
3. Crea un nuevo webhook
4. Usa la URL de ngrok: `https://tu-url-ngrok.ngrok.io/register`

## 📝 Ejemplo de Payload

El endpoint `/register` recibe y muestra en consola cualquier payload que envíe HubSpot.
