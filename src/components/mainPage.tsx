'use client';

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { getRandomSentence } from '@/lib/sentences';

export const MainPage = () => {
  const [usertext, setUserText] = useState<string>('');

  const [getRandomSentence1, setRandomSentence] = useState(getRandomSentence());
  const [timeLeft, setTimeLeft] = useState(60);

  // liczenie poprawnych slow
  const targetWords = getRandomSentence1.split(' ');
  const typedWords = usertext.trim().split(' ');

  let correctWordsCount = 0;
  typedWords.forEach((word, index) => {
    if (word === targetWords[index]) {
      correctWordsCount++;
    }
  });

  // words per minute
  const UntillEndTimeSeconds = 60 - timeLeft;
  const UntillEndTimeMinutes = UntillEndTimeSeconds / 60;

  const wordsPerMin = UntillEndTimeMinutes > 0 ? Math.round(correctWordsCount / UntillEndTimeMinutes) : 0;

  // accuracy
  let accuracy = 0;
  const wordsArray: string[] = getRandomSentence1.split(' ');
  const userTextArray: string[] = usertext.split(' ');

  userTextArray.forEach((char, index) => {
    if (char === wordsArray[index]) {
      accuracy += 1;
    }
  });

  const accuracy1 = userTextArray.length > 0 ? Math.round((accuracy / userTextArray.length) * 100) : 100;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timeout = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => {
      clearTimeout(timeout); // brak memory leak wazne!
    };
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setRandomSentence(getRandomSentence());
      setTimeLeft(60);
      setUserText('');
    }
  }, [timeLeft]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-12 ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Live progress</TableHead>
              <TableHead>Player name</TableHead>
              <TableHead>Words Per Minute</TableHead>
              <TableHead>Number of Correct Words </TableHead>
              <TableHead className="text-right">Accuracy</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium ">{usertext}</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>{wordsPerMin}</TableCell>
              <TableCell>{correctWordsCount}</TableCell>
              <TableCell className="text-right">{accuracy1}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p> Witaj, napisz jak najszybciej, oraz jak najdokładniej podane zdanie w ciągu 30 sekund</p>
        <p>Pozostły czas: {timeLeft} </p>
        <p>{getRandomSentence1}</p>
        <Input value={usertext} onChange={(e) => setUserText(e.target.value)} placeholder="Enter text" className="max-w-2xl " />
      </div>
    </>
  );
};
