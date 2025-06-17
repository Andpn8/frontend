# Fase 1: Build Angular SSR
FROM node:18-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Copia tutto il resto e costruisci
COPY . .
RUN npm run build:ssr

# Fase 2: Serve con Node SSR
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

CMD ["node", "dist/server/server.mjs"]