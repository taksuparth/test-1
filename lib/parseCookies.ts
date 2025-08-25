export const parseCookies = (cookieHeader: string) =>
  Object.fromEntries(cookieHeader.split('; ').map((v) => v.split('=')));
