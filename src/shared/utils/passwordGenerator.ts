import * as bcrypt from 'bcrypt';
import { env } from 'process';
import { promisify } from 'util';

// Función para calcular la suma de divisores de un número
export const sumaDivisores = (numero: number): number => {
  let suma = 0;
  for (let i = 1; i <= numero / 2; i++) {
    if (numero % i === 0) {
      suma += i;
    }
  }
  return suma;
};

// Función para verificar si un número es primo
export const esPrimo = (numero: number): boolean => {
  if (numero <= 1) return false;
  for (let i = 2; i <= Math.sqrt(numero); i++) {
    if (numero % i === 0) return false;
  }
  return true;
};

// Generador de contraseñas
export const generatePassword = (length: number): string => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()_+[]{}|;:,.<>?';
  let password = '';

  // Determinar la longitud ajustada
  const adjustedLength = esPrimo(length) ? length : sumaDivisores(length);

  for (let i = 0; i < adjustedLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
};

export const encryptPassword = async (password: string) => {
  const salt = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;

  const hash = await bcrypt.hash(password, salt);
  return hash;
};
