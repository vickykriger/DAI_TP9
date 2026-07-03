import 'dotenv/config';
import fs from 'fs';

class LogHelper {
    constructor() {
        this.filePath             = process.env.LOG_FILE_PATH;
        this.fileName             = process.env.LOG_FILE_NAME;
        this.logToFileEnabled     = process.env.LOG_TO_FILE_ENABLED?.toLowerCase() === 'true';
        this.logToConsoleEnabled  = process.env.LOG_TO_CONSOLE_ENABLED?.toLowerCase() === 'true';
    }
    
    // El comentario JSDoc debe cerrarse correctamente con /** ... */
    /**
     * @param {*} errorObject 
     */
    logError = (errorObject) => {
        const timestamp = new Date().toLocaleString();

        let detail = '';
        if (errorObject instanceof Error) {
            detail = `${errorObject.message}\nStack: ${errorObject.stack}`;
        } else if (typeof errorObject === 'object') {
            detail = JSON.stringify(errorObject);
        } else {
            detail = errorObject;
        }

        const logMessage = `[${timestamp}] - ERROR INTERNO:\n${detail}\n${'-'.repeat(50)}\n`;

        if (this.logToConsoleEnabled) {
            console.error(logMessage);
        }

        if (this.logToFileEnabled) {
            try {
                const fullPath = `${this.filePath}${this.fileName}`;
                fs.appendFileSync(fullPath, logMessage, 'utf-8');
            } catch (fileError) {
                console.error(`[LogHelper Error] No se pudo escribir el log: ${fileError.message}`);
            }
        }
    }
}

export default new LogHelper();