/**
 * Utilitários para manipulação de cookies
 */

/**
 * Define um cookie no navegador
 */
export function setCookie(name: string, value: string, days: number = 7): void {
  if (typeof window === 'undefined') return; // Não executar no servidor

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

/**
 * Obtém o valor de um cookie pelo nome
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null; // Não executar no servidor

  const nameEquals = `${name}=`;
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEquals) === 0) {
      return cookie.substring(nameEquals.length, cookie.length);
    }
  }
  return null;
}

/**
 * Remove um cookie pelo nome
 */
export function removeCookie(name: string): void {
  if (typeof window === 'undefined') return; // Não executar no servidor
  
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
} 