# Usar Node.js 18 LTS como imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production

# Copiar código fuente
COPY . .

# Compilar TypeScript
RUN npm run build

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Cambiar ownership de archivos
RUN chown -R nextjs:nodejs /app
USER nextjs

# Exponer puerto (Railway usa PORT env variable)
EXPOSE $PORT

# Comando para iniciar la aplicación
CMD ["npm", "run", "serve"]
