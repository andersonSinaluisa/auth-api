# Etapa 1: Compilar la app
FROM node:20-alpine as builder

WORKDIR /app

# Instala OpenSSL y compatibilidad con glibc para Prisma
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Etapa 2: Imagen liviana para producción
FROM node:18-alpine

WORKDIR /app

# Instala solo lo necesario para producción
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
