import { MainPage } from '@/components/mainPage';

export default async function Home() {
  let initialSentence = 'LOADING...';

  let errorText = '';

  try {
    const res = await fetch('https://dummyjson.com/quotes/random', {
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      initialSentence = data.quote;
    } else {
      errorText = await res.text();
      console.error(' BLAD API' + errorText);
      initialSentence = 'The quick brown fox jumps over the lazy dog.';
    }
  } catch (error) {
    console.error('BŁĄD API NA SERWERACH:' + errorText);
    initialSentence = 'Next.js gives you the best developer experience.';
  }

  return <MainPage initialSentence={initialSentence}></MainPage>;
}
