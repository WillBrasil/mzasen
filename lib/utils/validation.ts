export function formatCPF(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/)
  if (!match) return cleaned
  const [, g1, g2, g3, g4] = match
  let formatted = ""
  if (g1) formatted += g1
  if (g2) formatted += `.${g2}`
  if (g3) formatted += `.${g3}`
  if (g4) formatted += `-${g4}`
  return formatted
}

export function formatPhone(value: string): string {
  const cleaned = value.replace(/\D/g, "")
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/)
  if (!match) return cleaned
  const [, g1, g2, g3] = match
  let formatted = ""
  if (g1) formatted += `(${g1}`
  if (g2) formatted += `) ${g2}`
  if (g3) formatted += `-${g3}`
  return formatted
}

export function validateCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, "")
  if (cleaned.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleaned)) return false
  
  // Validação dos dígitos verificadores
  let sum = 0
  let remainder: number
  
  // Primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false
  
  // Segundo dígito verificador
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i)
  }
  remainder = (sum * 10) % 11
  if (remainder === 10 || remainder === 11) remainder = 0
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false
  
  return true
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "")
  return cleaned.length === 11 // Considerando formato (XX) XXXXX-XXXX
}

export function validatePassword(password: string): boolean {
  // Pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validateDate(date: string): boolean {
  const dateObj = new Date(date)
  const now = new Date()
  return dateObj instanceof Date && !isNaN(dateObj.getTime()) && dateObj < now
} 