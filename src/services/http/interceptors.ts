import type { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { logger } from "@shared/utils/logger";

function logRequest(config: InternalAxiosRequestConfig) {
  logger.info("[HTTP] Request", {
    method: config.method?.toUpperCase(),
    url: config.url,
  });
  return config;
}

function logRequestError(error: AxiosError) {
  logger.error("[HTTP] Request error", {
    message: error.message,
    url: error.config?.url,
  });
  return Promise.reject(error);
}

function logResponseError(error: AxiosError) {
  logger.error("[HTTP] Response error", {
    message: error.message,
    status: error.response?.status,
    url: error.config?.url,
  });
  return Promise.reject(error);
}

export function setupHttpInterceptors(http: AxiosInstance) {
  http.interceptors.request.use(logRequest, logRequestError);
  http.interceptors.response.use((response) => response, logResponseError);
}
