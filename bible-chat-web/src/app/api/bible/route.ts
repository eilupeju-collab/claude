import { NextResponse } from 'next/server';
import { BIBLE_BOOKS, getBooksByTestament, getBookById, SAMPLE_CHAPTERS } from '@/lib/data/bible';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testament = searchParams.get('testament') as 'OT' | 'NT' | null;
  const bookId = searchParams.get('book');
  const chapter = searchParams.get('chapter');

  if (bookId && chapter) {
    const key = `${bookId}-${chapter}`;
    const chapterData = SAMPLE_CHAPTERS[key];
    if (chapterData) {
      return NextResponse.json({ chapter: chapterData });
    }
    // Return placeholder for chapters not in sample data
    const book = getBookById(bookId);
    if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    return NextResponse.json({
      chapter: {
        book: book.name,
        chapter: parseInt(chapter),
        translation: 'NIV',
        verses: Array.from({ length: 20 }, (_, i) => ({
          number: i + 1,
          text: `[${book.name} ${chapter}:${i + 1} — Content available with full Bible API integration]`,
        })),
      },
    });
  }

  if (bookId) {
    const book = getBookById(bookId);
    if (!book) return NextResponse.json({ error: 'Book not found' }, { status: 404 });
    return NextResponse.json({ book });
  }

  if (testament) {
    return NextResponse.json({ books: getBooksByTestament(testament) });
  }

  return NextResponse.json({ books: BIBLE_BOOKS });
}
