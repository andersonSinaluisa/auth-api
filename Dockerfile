# Etapa 1: Build con Prisma y Nest
FROM node:20-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Asegúrate de generar el cliente Prisma con el binario adecuado
RUN npx prisma generate

RUN npm run build

# Etapa 2: Producción
FROM node:20-slim

WORKDIR /app

# ✅ Aquí instalamos libssl1.1 para Prisma
RUN apt-get update \
    && apt-get install -y openssl libssl1.1 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install --only=production

# Copia todo lo necesario del builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["node", "dist/main"]
