# Backend

## Requisistos

- Tener `npm`, `node`, `docker` y `docker-compose` instalados.

## Uso

- Ejecuter `npm install`, luego `npx prisma generate` para generar los tipos de la base de datos.

- Ejecutar `npm run db-dev` para iniciar el contenedor de docker con la base de datos.

- En otra terminal ejecutar `npx prisma db push` para crear la base de datos y las colleciones en el container de mongo.

- Ejecutar `npx prisma db seed` para inicializar data en la base de datos.

    - El seed creará tres usuarios, uno de cada tipo: admin, creador y lector
    - Las credenciales son las siguientes:
        - admin@example.com adminPass
        - reader@example.com readerPass
        - creator@example.com creatorPass

- Al finalizar su uso, detener la terminal ejecutando el backend y ejecutar `npm run db-dev-down` para detener y eliminar los containers de docker.

## Estructura

El entry point del proyecto es `scr/app.ts`, donde se ejecuta el server. El server está definido en `/src/server.ts`, las rutas se encuentran en `/src/router`.

Los servicios como db, auth y fileUpload se encuentran en `/src/`.

El schema de la base de datos se encuentra en `/prisma/schema.prisma` junto al script para hacer el seed.
