'use client';

import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';
import { getRandomSentence } from '@/lib/sentences';
import { Button } from './ui/button';
import { PopUpComponent } from './PopUpComponent';
import { ShowUserStats } from './showUserStats';

type props = {
  initialSentence: string;
};

export const MainPage = ({ initialSentence }: props) => {
  const [usertext, setUserText] = useState<string>('');

  const [getRandomSentence1, setRandomSentence] = useState(initialSentence);
  const [timeLeft, setTimeLeft] = useState(60);

  const [showPopup, setShowPopup] = useState(false);

  const [showStats, setShowStats] = useState(false);

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

  const saveLogic = () => {
    const newplayerData = {
      playerName: 'Guest',
      liveProgress: usertext,
      wordsPerMinute: wordsPerMin,
      correctWords: correctWordsCount,
      accuracy: accuracy,
    };

    const savedData = localStorage.getItem('player_stats');

    const resultHistory = savedData ? JSON.parse(savedData) : [];

    resultHistory.push(newplayerData);

    localStorage.setItem('player_stats', JSON.stringify(resultHistory));
  };

  let errorText;

  const fetchNewSentence = async () => {
    try {
      const res = await fetch('https://dummyjson.com/quotes/random');

      if (res.ok) {
        const data = await res.json();
        setRandomSentence(data.quote);
      } else {
        errorText = await res.text();
        console.error(errorText);
        setRandomSentence(getRandomSentence());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const testNextSentence = () => {
    fetchNewSentence();
    setTimeLeft(60);
    setUserText('');
  };

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
      fetchNewSentence();
      setTimeLeft(60);
      setUserText('');
    }
  }, [timeLeft]);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-12 ">
        {showPopup && (
          <PopUpComponent
            onConfirm={() => {
              saveLogic();
              setShowPopup(false);
              testNextSentence();
            }}
            onCancel={() => {
              setShowPopup(false);
              testNextSentence();
            }}
          ></PopUpComponent>
        )}

        {showStats && <ShowUserStats onCancel={() => setShowStats(false)}></ShowUserStats>}
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
        <Input
          value={usertext}
          onChange={(e) => setUserText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setShowPopup(true);
            }
          }}
          placeholder="Enter text"
          className="max-w-2xl "
        />

        <div className="flex gap-4">
          <Button onClick={() => setShowStats(true)} className="bg-amber-500">
            Show all your stats
          </Button>
          <Button onClick={() => saveLogic()}>Save your Progress</Button>
          <Button onClick={() => setShowPopup(true)}>Next Sentence</Button>
        </div>
      </div>
    </>
  );
};
