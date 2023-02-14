const { createLogger, format, transports } = require("winston");

const log = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `[${timestamp}] ${level} : ${message}`;
        })
    ),
    transports: [new transports.Console()],
});

module.exports = log;