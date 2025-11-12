# Usar Node.js 18 LTS como imagen base
FROM node:18-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies para el build)
RUN npm ci

# Copiar código fuerte
COPY . .

# Compilar TypeScript (ahora tsc está disponible)
RUN npm run build

# Reinstalar solo dependencias de producción y limpiar cache
RUN npm ci --only=production && npm cache clean --force

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S appuser -u 1001

# Cambiar ownership de archivos
RUN chown -R appuser:nodejs /app
USER appuser

# Exponer puerto por defecto (Railway usa PORT env variable)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "serve"]
