# Etapa 1: Build Angular SSR
FROM node:18-alpine as builder

WORKDIR /app
COPY ./ ./
RUN npm install
RUN npm run build:ssr

# Etapa 2: Serve con Node SSR
FROM node:18-alpine

WORKDIR /app

# Copia la cartella server per il bundle SSR
COPY --from=builder /app/dist/server /app/dist/server

# Copia la cartella browser per i file statici
COPY --from=builder /app/dist/browser /app/dist/browser

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

CMD ["node", "dist/server/server.mjs"]
