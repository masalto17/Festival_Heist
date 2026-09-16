import { customAlphabet } from "nanoid";
// Alfabeto sin caracteres ambiguos, 8 chars => >10^12 combinaciones
export const makeSlug = customAlphabet("23456789abcdefghjkmnpqrstuvwxyz", 8);
