# Pasos para la ejecución del proyecto

1. Clonar el repositorio.
2. Ejecutar el comando `npm i` en la terminal para instalar las dependencias.
3. Crear una base de datos llamada `instagram` en DBeaver conectada con PostgreSQL.
4. Abrir el archivo `instagram.sql` dentro de la herramienta de SQL de DBeaver y ejecutarlo por completo.
5. Crear un archivo `.env` en la raíz del proyecto.
6. Copiar y pegar la siguiente configuración dentro del archivo `.env`:

LOCAL_HOST = "localhost"
DATABASE = "instagram"
USER = "postgres"
PASSWORD = "root"
PORT = 5432
LOG_FILE_PATH = "./"
LOG_FILE_NAME = "archivo.log"
LOG_TO_FILE_ENABLED = "true"
LOG_TO_CONSOLE_ENABLED = "true"
JWT_SECRET = "ifLovingMeMeansLettingGoAndWishingMeTheBestThenIGuessIWishIWishIWishYouLovedMeLess"

7. Ejecutar el comando `npm run start` en la terminal para iniciar el servidor.
