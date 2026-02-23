
import { useState, useEffect } from 'react';
import { ramadanSchedule } from '../data/ramadanData';
import { parse, isAfter, isBefore, differenceInSeconds, addDays, format } from 'date-fns';

export interface TimeState {
  currentTime: Date;
  nextEvent: 'Sehri' | 'Iftar' | 'Eid' | 'Waiting';
  timeLeft: string; // HH:MM:SS
  todaySchedule: typeof ramadanSchedule[0] | null;
  isRamadanActive: boolean;
  hijriDate: string;
}

export function useRamadan() {
  const [state, setState] = useState<TimeState>({
    currentTime: new Date(),
    nextEvent: 'Waiting',
    timeLeft: '00:00:00',
    todaySchedule: null,
    isRamadanActive: false,
    hijriDate: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      
      // Find today's schedule
      const todayStr = format(now, 'dd MMM yyyy');
      let today = ramadanSchedule.find(d => d.date === todayStr);
      
      // If today is not found, maybe we are before Ramadan or after
      // For demo purposes, if we are not in the list, we might want to show the first day or last day
      // But let's stick to strict matching for "isRamadanActive"
      
      let nextEvent: 'Sehri' | 'Iftar' | 'Eid' | 'Waiting' = 'Waiting';
      let targetTime: Date | null = null;
      let timeLeftStr = '00:00:00';
      
      if (today) {
        const sehriTime = parse(`${today.date} ${today.sehri}`, 'dd MMM yyyy hh:mm a', new Date());
        const iftarTime = parse(`${today.date} ${today.iftar}`, 'dd MMM yyyy hh:mm a', new Date());
        
        if (isBefore(now, sehriTime)) {
          nextEvent = 'Sehri';
          targetTime = sehriTime;
        } else if (isBefore(now, iftarTime)) {
          nextEvent = 'Iftar';
          targetTime = iftarTime;
        } else {
          // After Iftar, next event is tomorrow's Sehri
          // Find tomorrow
          const tomorrow = addDays(now, 1);
          const tomorrowStr = format(tomorrow, 'dd MMM yyyy');
          const tomorrowSchedule = ramadanSchedule.find(d => d.date === tomorrowStr);
          
          if (tomorrowSchedule) {
            nextEvent = 'Sehri';
            targetTime = parse(`${tomorrowSchedule.date} ${tomorrowSchedule.sehri}`, 'dd MMM yyyy hh:mm a', new Date());
          } else {
            nextEvent = 'Eid'; // End of schedule
          }
        }
      } else {
        // Not in schedule. Check if before first day or after last day.
        const firstDay = parse(`${ramadanSchedule[0].date}`, 'dd MMM yyyy', new Date());
        if (isBefore(now, firstDay)) {
           // Before Ramadan
           nextEvent = 'Sehri'; // Counting down to first Sehri
           targetTime = parse(`${ramadanSchedule[0].date} ${ramadanSchedule[0].sehri}`, 'dd MMM yyyy hh:mm a', new Date());
           // Set today as first day for display purposes if close? No, keep null.
           // Actually, let's set todaySchedule to the first day so users can see what's coming
           today = ramadanSchedule[0]; 
        } else {
           nextEvent = 'Eid';
        }
      }

      if (targetTime) {
        const diff = differenceInSeconds(targetTime, now);
        if (diff > 0) {
          const hours = Math.floor(diff / 3600);
          const minutes = Math.floor((diff % 3600) / 60);
          const seconds = diff % 60;
          timeLeftStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          timeLeftStr = '00:00:00';
        }
      }

      // Hijri Date Calculation (Approximate)
      // 18 Feb 2026 is 1 Ramadan 1447
      // We can calculate offset from that
      let hijriDateStr = '';
      const startRamadan = parse('18 Feb 2026', 'dd MMM yyyy', new Date());
      if (!isBefore(now, startRamadan)) {
          const daysDiff = Math.floor(differenceInSeconds(now, startRamadan) / (3600 * 24));
          const ramadanDay = daysDiff + 1;
          if (ramadanDay <= 30) {
              hijriDateStr = `${ramadanDay} Ramadan 1447`;
          } else {
              hijriDateStr = `Shawwal 1447`; // After Ramadan
          }
      } else {
          hijriDateStr = "Shaban 1447";
      }

      setState({
        currentTime: now,
        nextEvent,
        timeLeft: timeLeftStr,
        todaySchedule: today || null,
        isRamadanActive: !!today,
        hijriDate: hijriDateStr
      });
      
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return state;
}
