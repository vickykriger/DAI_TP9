Pasos para ejecucion:
-clonar repositorio
-npm i
-hacer una base de datos llamada instagram en Dbeaver, conectada con postgress, pegar el archivo instagra.sql en la herramienta de sql y ejecutar
-crear un archivo .env y poner:
LOCAL_HOST = "localhost"
DATABASE = "instagram"
USER = "postgres"
PASSWORD = "root"
PORT = 5432
LOG_FILE_PATH = "./"
LOG_FILE_NAME = "archivo.log"
LOG_TO_FILE_ENABLED = "true"
LOG_TO_CONSOLE_ENABLED = "true"
JWT_SECRET= ifLovingMeMeansLettingGoAndWishingMeTheBestThenIGuessIWishIWishIWishYouLovedMeLess
-npm run start