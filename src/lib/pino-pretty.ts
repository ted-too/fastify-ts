import chalk from "chalk";
import pinoPretty from "pino-pretty";

const LogLevel = {
  10: `- ${chalk.underline.magenta("trace")}`,
  20: `▸ ${chalk.underline.cyan("debug")}`,
  30: `ℹ ${chalk.underline("info")}`,
  40: `⚠ ${chalk.underline.yellow("warning")}`,
  50: `✖ ${chalk.underline.red("error")}`,
  60: `☢ ${chalk.underline.red("fatal")}`,
};

const method = (type: string) => {
  const reqtype = type.toLowerCase();
  if (reqtype === "get") return chalk.magenta(type);
  if (reqtype === "post") return chalk.green(type);
  if (reqtype === "put") return chalk.yellow(chalk.red(type));
  if (reqtype === "delete") return chalk.red(type);
  return type;
};

const status = (statusCode = 505) => {
  const code = statusCode.toString();
  if (code.startsWith("1")) return chalk.magenta(code);
  if (code.startsWith("2")) return chalk.green(code);
  if (code.startsWith("3")) return chalk.cyan(code);
  if (code.startsWith("4")) return chalk.yellow(code);
  if (code.startsWith("5")) return chalk.red(code);
  return code;
};

const PinoPretty = (opts: any) =>
  pinoPretty({
    ...opts,
    translateTime: "HH:MM:ss Z",
    ignore: "pid,hostname,req,res,level,time,reqId,responseTime",
    colorize: false,
    messageFormat: (log: any, messageKey) => {
      if (log.req)
        return `${log.level ? (LogLevel as any)[log.level] : ""}  ${log.req.remoteAddress} ${method(
          log.req.method
        )} ${log.req.url} ${chalk.dim(log.reqId)}`;
      if (log.res)
        return `${log.level ? (LogLevel as any)[log.level] : ""}  ${chalk.dim(
          "completed"
        )} ${status(log.res.statusCode)} ${chalk.dim(log.reqId)} - ${
          log.responseTime ? chalk.yellow(`${Math.round(log.responseTime * 100) / 100} ms`) : "-"
        }`;
      return `${log.level ? (LogLevel as any)[log.level] : ""}  ${log[messageKey].includes('Server listening at') && '🚀 '}${chalk.dim(log[messageKey])}`;
    },
  });

export default PinoPretty;
