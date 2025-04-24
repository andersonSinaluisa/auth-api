# Etapa 1: Compilar la app
FROM node:20-alpine as builder

WORKDIR /app

# Instala OpenSSL y compatibilidad con glibc para Prisma
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
RUN npm install

# Copia el resto del código, incluyendo schema.prisma
COPY . .

# 👇 Genera el cliente Prisma antes de compilar
RUN npx prisma generate
RUN npm run build

# Etapa 2: Imagen liviana para producción
FROM node:20-alpine

WORKDIR /app

# Instala solo lo necesario para producción
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/prisma ./prisma  

EXPOSE 3000
COPY run.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/run.sh

ENTRYPOINT ["run.sh"]