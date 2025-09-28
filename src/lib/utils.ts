import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUrlPrefixFromRequest(req: {
  headers: { [key: string]: string | string[] | undefined; host?: string };
  socket?: unknown;
}) {
  const host = req.headers.host;
  const protocol =
    req.headers["x-forwarded-proto"] ||
    (req.socket && (req.socket as { encrypted?: boolean }).encrypted
      ? "https"
      : "http");
  return `${protocol}://${host}`;
}
