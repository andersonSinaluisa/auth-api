# Etapa 1: Compilar la app
FROM node:20 AS builder

WORKDIR /app

# Copiar los archivos necesarios para instalar dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias y generar el cliente de Prisma
RUN npm install
RUN npx prisma generate

# Copiar el resto de la app y compilar
COPY . .
RUN npm run build


# Etapa 2: Imagen liviana para producción
FROM node:20-alpine

WORKDIR /app

# Copiar sólo los archivos necesarios
COPY package*.json ./

# Instalar sólo dependencias necesarias para producción
RUN npm install --omit=dev

# Copiar Prisma generado y archivos compilados
COPY --from=builder /app/node_modules/@prisma /app/node_modules/@prisma
COPY --from=builder /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/dist ./dist

# Expón el puerto de la app
EXPOSE 3000

# Comando de arranque
CMD ["node", "dist/main"]
