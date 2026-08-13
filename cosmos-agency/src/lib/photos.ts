import fs from "node:fs";
import path from "node:path";

const FOTOGRAFIAS_DIR = path.join(process.cwd(), "public", "imagenes", "Fotografias");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function isUsablePhoto(filename: string) {
  if (filename.startsWith("._")) return false;
  return SUPPORTED_EXTENSIONS.has(path.extname(filename).toLowerCase());
}

function listCategories(): string[] {
  try {
    return fs.readdirSync(FOTOGRAFIAS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);
  } catch {
    return [];
  }
}

function listPhotosInCategory(category: string): string[] {
  const categoryDir = path.join(FOTOGRAFIAS_DIR, category);
  const files = fs.readdirSync(categoryDir).filter(isUsablePhoto);
  const encodedCategory = encodeURIComponent(category);
  return files.map((file) => `/imagenes/Fotografias/${encodedCategory}/${encodeURIComponent(file)}`);
}

function listAllPhotos(): string[] {
  const categories = listCategories();
  const photos: string[] = [];
  for (const category of categories) {
    photos.push(...listPhotosInCategory(category));
  }
  return photos;
}

// Alterna entre categorías (una foto de cada una por vuelta) para que la
// selección represente "un poco de todo" en vez de agotar una categoría
// antes de pasar a la siguiente. Sin repetidos: cada foto aparece una sola vez.
export function getPhotoSample(maxCount?: number): string[] {
  const categories = listCategories();
  const byCategory = categories.map((category) => {
    const photos = listPhotosInCategory(category);
    return [...photos].sort(() => Math.random() - 0.5);
  });

  const result: string[] = [];
  const limit = maxCount ?? Infinity;
  let round = 0;
  let addedAny = true;
  while (result.length < limit && addedAny) {
    addedAny = false;
    for (const list of byCategory) {
      if (round < list.length) {
        result.push(list[round]);
        addedAny = true;
        if (result.length >= limit) break;
      }
    }
    round++;
  }
  return result;
}

export function getRandomPhotos(count: number): string[] {
  const all = listAllPhotos();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const ROUND_COUNT = 4;
const PHOTOS_PER_ROUND = 6;

// Rondas fijas calculadas una sola vez (persisten mientras viva el proceso del
// servidor), para que solo existan unas pocas combinaciones "curadas" en vez
// de una mezcla distinta en cada request.
let cachedRounds: string[][] | null = null;

function buildRounds(): string[][] {
  const all = listAllPhotos();
  const shuffled = [...all].sort(() => Math.random() - 0.5);

  const rounds: string[][] = [];
  for (let i = 0; i < ROUND_COUNT; i++) {
    const start = i * PHOTOS_PER_ROUND;
    const slice = shuffled.slice(start, start + PHOTOS_PER_ROUND);
    // Si no hay suficientes fotos únicas para llenar todas las rondas,
    // se completa reciclando desde el principio del pool mezclado.
    while (slice.length < PHOTOS_PER_ROUND && shuffled.length > 0) {
      slice.push(shuffled[slice.length % shuffled.length]);
    }
    if (slice.length > 0) rounds.push(slice);
  }
  return rounds;
}

export function getRandomPhotoRound(): string[] {
  if (!cachedRounds) {
    cachedRounds = buildRounds();
  }
  if (cachedRounds.length === 0) return [];
  const index = Math.floor(Math.random() * cachedRounds.length);
  return cachedRounds[index];
}
