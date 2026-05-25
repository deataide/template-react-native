import { FEATURES } from "@shared/config/features";

type LogLevel = "info" | "warn" | "error";

function canLog() {
  return FEATURES.enableLogs;
}

function print(level: LogLevel, message: string, ...meta: unknown[]) {
  if (!canLog()) return;

  if (level === "error") {
    console.error(message, ...meta);
    return;
  }

  if (level === "warn") {
    console.warn(message, ...meta);
    return;
  }

  console.log(message, ...meta);
}

export const logger = {
  info: (message: string, ...meta: unknown[]) => print("info", message, ...meta),
  warn: (message: string, ...meta: unknown[]) => print("warn", message, ...meta),
  error: (message: string, ...meta: unknown[]) => print("error", message, ...meta),
};
