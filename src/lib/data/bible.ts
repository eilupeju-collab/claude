import { BibleBook, BibleChapter } from '@/types';

export const BIBLE_BOOKS: BibleBook[] = [
  { id: 'gen', name: 'Genesis', abbreviation: 'Gen', chapters: 50, testament: 'OT', order: 1 },
  { id: 'exo', name: 'Exodus', abbreviation: 'Exo', chapters: 40, testament: 'OT', order: 2 },
  { id: 'lev', name: 'Leviticus', abbreviation: 'Lev', chapters: 27, testament: 'OT', order: 3 },
  { id: 'num', name: 'Numbers', abbreviation: 'Num', chapters: 36, testament: 'OT', order: 4 },
  { id: 'deu', name: 'Deuteronomy', abbreviation: 'Deu', chapters: 34, testament: 'OT', order: 5 },
  { id: 'jos', name: 'Joshua', abbreviation: 'Jos', chapters: 24, testament: 'OT', order: 6 },
  { id: 'jdg', name: 'Judges', abbreviation: 'Jdg', chapters: 21, testament: 'OT', order: 7 },
  { id: 'rut', name: 'Ruth', abbreviation: 'Rut', chapters: 4, testament: 'OT', order: 8 },
  { id: '1sa', name: '1 Samuel', abbreviation: '1Sa', chapters: 31, testament: 'OT', order: 9 },
  { id: '2sa', name: '2 Samuel', abbreviation: '2Sa', chapters: 24, testament: 'OT', order: 10 },

  { id: '1ki', name: '1 Kings', abbreviation: '1Ki', chapters: 22, testament: 'OT', order: 11 },
  { id: '2ki', name: '2 Kings', abbreviation: '2Ki', chapters: 25, testament: 'OT', order: 12 },
  { id: '1ch', name: '1 Chronicles', abbreviation: '1Ch', chapters: 29, testament: 'OT', order: 13 },
  { id: '2ch', name: '2 Chronicles', abbreviation: '2Ch', chapters: 36, testament: 'OT', order: 14 },
  { id: 'ezr', name: 'Ezra', abbreviation: 'Ezr', chapters: 10, testament: 'OT', order: 15 },
  { id: 'neh', name: 'Nehemiah', abbreviation: 'Neh', chapters: 13, testament: 'OT', order: 16 },
  { id: 'est', name: 'Esther', abbreviation: 'Est', chapters: 10, testament: 'OT', order: 17 },
  { id: 'job', name: 'Job', abbreviation: 'Job', chapters: 42, testament: 'OT', order: 18 },
  { id: 'psa', name: 'Psalms', abbreviation: 'Psa', chapters: 150, testament: 'OT', order: 19 },
  { id: 'pro', name: 'Proverbs', abbreviation: 'Pro', chapters: 31, testament: 'OT', order: 20 },
  { id: 'ecc', name: 'Ecclesiastes', abbreviation: 'Ecc', chapters: 12, testament: 'OT', order: 21 },
  { id: 'sol', name: 'Song of Solomon', abbreviation: 'Sol', chapters: 8, testament: 'OT', order: 22 },
  { id: 'isa', name: 'Isaiah', abbreviation: 'Isa', chapters: 66, testament: 'OT', order: 23 },
  { id: 'jer', name: 'Jeremiah', abbreviation: 'Jer', chapters: 52, testament: 'OT', order: 24 },
  { id: 'lam', name: 'Lamentations', abbreviation: 'Lam', chapters: 5, testament: 'OT', order: 25 },
  { id: 'eze', name: 'Ezekiel', abbreviation: 'Eze', chapters: 48, testament: 'OT', order: 26 },
  { id: 'dan', name: 'Daniel', abbreviation: 'Dan', chapters: 12, testament: 'OT', order: 27 },
  { id: 'hos', name: 'Hosea', abbreviation: 'Hos', chapters: 14, testament: 'OT', order: 28 },
  { id: 'joe', name: 'Joel', abbreviation: 'Joe', chapters: 3, testament: 'OT', order: 29 },
  { id: 'amo', name: 'Amos', abbreviation: 'Amo', chapters: 9, testament: 'OT', order: 30 },
  { id: 'oba', name: 'Obadiah', abbreviation: 'Oba', chapters: 1, testament: 'OT', order: 31 },
  { id: 'jon', name: 'Jonah', abbreviation: 'Jon', chapters: 4, testament: 'OT', order: 32 },
  { id: 'mic', name: 'Micah', abbreviation: 'Mic', chapters: 7, testament: 'OT', order: 33 },
  { id: 'nah', name: 'Nahum', abbreviation: 'Nah', chapters: 3, testament: 'OT', order: 34 },
  { id: 'hab', name: 'Habakkuk', abbreviation: 'Hab', chapters: 3, testament: 'OT', order: 35 },
  { id: 'zep', name: 'Zephaniah', abbreviation: 'Zep', chapters: 3, testament: 'OT', order: 36 },
  { id: 'hag', name: 'Haggai', abbreviation: 'Hag', chapters: 2, testament: 'OT', order: 37 },
  { id: 'zec', name: 'Zechariah', abbreviation: 'Zec', chapters: 14, testament: 'OT', order: 38 },
  { id: 'mal', name: 'Malachi', abbreviation: 'Mal', chapters: 4, testament: 'OT', order: 39 },

  { id: 'mat', name: 'Matthew', abbreviation: 'Mat', chapters: 28, testament: 'NT', order: 40 },
  { id: 'mar', name: 'Mark', abbreviation: 'Mar', chapters: 16, testament: 'NT', order: 41 },
  { id: 'luk', name: 'Luke', abbreviation: 'Luk', chapters: 24, testament: 'NT', order: 42 },
  { id: 'joh', name: 'John', abbreviation: 'Joh', chapters: 21, testament: 'NT', order: 43 },
  { id: 'act', name: 'Acts', abbreviation: 'Act', chapters: 28, testament: 'NT', order: 44 },
  { id: 'rom', name: 'Romans', abbreviation: 'Rom', chapters: 16, testament: 'NT', order: 45 },
  { id: '1co', name: '1 Corinthians', abbreviation: '1Co', chapters: 16, testament: 'NT', order: 46 },
  { id: '2co', name: '2 Corinthians', abbreviation: '2Co', chapters: 13, testament: 'NT', order: 47 },
  { id: 'gal', name: 'Galatians', abbreviation: 'Gal', chapters: 6, testament: 'NT', order: 48 },
  { id: 'eph', name: 'Ephesians', abbreviation: 'Eph', chapters: 6, testament: 'NT', order: 49 },
  { id: 'phi', name: 'Philippians', abbreviation: 'Phi', chapters: 4, testament: 'NT', order: 50 },
  { id: 'col', name: 'Colossians', abbreviation: 'Col', chapters: 4, testament: 'NT', order: 51 },
  { id: '1th', name: '1 Thessalonians', abbreviation: '1Th', chapters: 5, testament: 'NT', order: 52 },
  { id: '2th', name: '2 Thessalonians', abbreviation: '2Th', chapters: 3, testament: 'NT', order: 53 },
  { id: '1ti', name: '1 Timothy', abbreviation: '1Ti', chapters: 6, testament: 'NT', order: 54 },
  { id: '2ti', name: '2 Timothy', abbreviation: '2Ti', chapters: 4, testament: 'NT', order: 55 },
  { id: 'tit', name: 'Titus', abbreviation: 'Tit', chapters: 3, testament: 'NT', order: 56 },
  { id: 'phm', name: 'Philemon', abbreviation: 'Phm', chapters: 1, testament: 'NT', order: 57 },
  { id: 'heb', name: 'Hebrews', abbreviation: 'Heb', chapters: 13, testament: 'NT', order: 58 },
  { id: 'jam', name: 'James', abbreviation: 'Jam', chapters: 5, testament: 'NT', order: 59 },
  { id: '1pe', name: '1 Peter', abbreviation: '1Pe', chapters: 5, testament: 'NT', order: 60 },
  { id: '2pe', name: '2 Peter', abbreviation: '2Pe', chapters: 3, testament: 'NT', order: 61 },
  { id: '1jo', name: '1 John', abbreviation: '1Jo', chapters: 5, testament: 'NT', order: 62 },
  { id: '2jo', name: '2 John', abbreviation: '2Jo', chapters: 1, testament: 'NT', order: 63 },
  { id: '3jo', name: '3 John', abbreviation: '3Jo', chapters: 1, testament: 'NT', order: 64 },
  { id: 'jud', name: 'Jude', abbreviation: 'Jud', chapters: 1, testament: 'NT', order: 65 },
  { id: 'rev', name: 'Revelation', abbreviation: 'Rev', chapters: 22, testament: 'NT', order: 66 },
];

export function getBooksByTestament(testament: 'OT' | 'NT'): BibleBook[] {
  return BIBLE_BOOKS.filter((b) => b.testament === testament);
}

export function getBookById(id: string): BibleBook | undefined {
  return BIBLE_BOOKS.find((b) => b.id === id);
}

// Sample chapter content (Genesis 1:1-10 for demo)
export const SAMPLE_CHAPTERS: Record<string, BibleChapter> = {
  'gen-1': {
    book: 'Genesis', chapter: 1, translation: 'NIV',
    verses: [
      { number: 1, text: 'In the beginning God created the heavens and the earth.' },
      { number: 2, text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.' },
      { number: 3, text: 'And God said, "Let there be light," and there was light.' },
      { number: 4, text: 'God saw that the light was good, and he separated the light from the darkness.' },
      { number: 5, text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.' },
      { number: 6, text: 'And God said, "Let there be a vault between the waters to separate water from water."' },
      { number: 7, text: 'So God made the vault and separated the water under the vault from the water above it. And it was so.' },
      { number: 8, text: 'God called the vault "sky." And there was evening, and there was morning—the second day.' },
      { number: 9, text: 'And God said, "Let the water under the sky be gathered to one place, and let dry ground appear." And it was so.' },
      { number: 10, text: 'God called the dry ground "land," and the gathered waters he called "seas." And God saw that it was good.' },
    ],
  },
};
