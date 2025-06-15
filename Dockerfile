FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=/app/dist/browser

FROM nginx:alpine
# Copia i file statici
COPY --from=build /app/dist/browser /usr/share/nginx/html
# Imposta i permessi
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html
# Copia la configurazione temporanea (senza backend)
COPY nginx-basic.conf /etc/nginx/conf.d/default.conf
# Verifica la configurazione base
RUN nginx -t

# Quando il container viene avviato, sostituisci con la configurazione completa
CMD ["sh", "-c", "cp /app/nginx-full.conf /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]