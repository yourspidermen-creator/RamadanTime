
import { useState, useEffect, useRef } from 'react';
import { useRamadan } from './hooks/useRamadan';
import { ramadanSchedule, duas } from './data/ramadanData';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const { currentTime, nextEvent, timeLeft, todaySchedule, hijriDate } = useRamadan();
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [activeDua, setActiveDua] = useState<'sehri' | 'iftar'>('iftar');
  const prevEventRef = useRef(nextEvent);

  // Format date: "Monday, 23 Feb 2026"
  const formattedDate = currentTime.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Trigger confetti when Iftar time arrives
  useEffect(() => {
    document.title = "RamadanTime";
    
    // If we were waiting for Iftar, and now we are waiting for Sehri (meaning Iftar just happened)
    if (prevEventRef.current === 'Iftar' && nextEvent === 'Sehri') {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f59e0b', '#ffffff'] // Emerald, Amber, White
      });
    }
    prevEventRef.current = nextEvent;
  }, [nextEvent]);

  // Determine which dua to show by default based on next event
  // If next is Sehri, show Sehri dua. If next is Iftar, show Iftar dua.
  // We can just let the user toggle, but setting a smart default is nice.
  // (Logic can be added later, for now manual toggle is fine)

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-stone-800 font-sans selection:bg-emerald-200">
      {/* Header */}
      <header className="bg-emerald-900 text-white py-6 px-4 shadow-lg rounded-b-3xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           {/* Abstract pattern could go here */}
           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
             <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
               <circle cx="20" cy="20" r="2" fill="currentColor" />
             </pattern>
             <rect width="100%" height="100%" fill="url(#pattern)" />
           </svg>
        </div>
        
        <div className="max-w-md mx-auto relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-2"
          >
            <Moon className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-bold tracking-wide font-serif">RamadanTime</h1>
          </motion.div>
          
          <p className="text-emerald-100 text-sm flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3" /> Cumilla, Bangladesh
          </p>
          
          <div className="mt-4 p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 inline-block">
            <p className="text-xs text-emerald-200 uppercase tracking-wider mb-1">Current Time</p>
            <p className="text-xl font-mono font-medium">
              {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </p>
            <p className="text-xs text-emerald-200 mt-1">{formattedDate}</p>
            <p className="text-xs text-amber-400 font-medium mt-1">{hijriDate}</p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 -mt-6 relative z-20 pb-20">
        
        {/* Countdown Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-6 mb-6 text-center border border-stone-100"
        >
          <p className="text-stone-500 text-sm uppercase tracking-widest font-medium mb-2">
            Next Event: <span className="text-emerald-700 font-bold">{nextEvent}</span>
          </p>
          
          <div className="text-6xl font-bold text-stone-800 font-mono tracking-tighter my-4">
            {timeLeft}
          </div>
          
          <p className="text-stone-400 text-xs">
            {nextEvent === 'Sehri' ? 'Time remaining until Sehri ends' : 
             nextEvent === 'Iftar' ? 'Time remaining until Iftar starts' : 
             'Eid Mubarak!'}
          </p>
        </motion.div>

        {/* Today's Schedule */}
        {todaySchedule && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-2xl shadow-sm border ${nextEvent === 'Sehri' ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-stone-100'}`}
            >
              <div className="flex items-center gap-2 mb-2 text-emerald-800">
                <Sun className="w-4 h-4" />
                <span className="font-bold text-sm">Sehri Ends</span>
              </div>
              <p className="text-2xl font-bold text-stone-800">{todaySchedule.sehri}</p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className={`p-5 rounded-2xl shadow-sm border ${nextEvent === 'Iftar' ? 'bg-amber-50 border-amber-200' : 'bg-white border-stone-100'}`}
            >
              <div className="flex items-center gap-2 mb-2 text-amber-700">
                <Moon className="w-4 h-4" />
                <span className="font-bold text-sm">Iftar Time</span>
              </div>
              <p className="text-2xl font-bold text-stone-800">{todaySchedule.iftar}</p>
            </motion.div>
          </div>
        )}

        {/* Dua Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-stone-100 overflow-hidden mb-6">
          <div className="flex border-b border-stone-100">
            <button 
              onClick={() => setActiveDua('sehri')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${activeDua === 'sehri' ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Sehri Dua
            </button>
            <button 
              onClick={() => setActiveDua('iftar')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${activeDua === 'iftar' ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600' : 'text-stone-500 hover:bg-stone-50'}`}
            >
              Iftar Dua
            </button>
          </div>
          
          <div className="p-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDua}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-2xl font-serif leading-loose text-emerald-900 mb-4" dir="rtl">
                  {duas[activeDua].arabic}
                </p>
                <p className="text-sm text-stone-600 italic mb-2">
                  "{duas[activeDua].transliteration}"
                </p>
                <p className="text-sm text-stone-800 font-medium mt-4 border-t border-stone-100 pt-3">
                  {duas[activeDua].bangla}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Calendar Toggle */}
        <div className="mb-6">
          <button 
            onClick={() => setShowFullCalendar(!showFullCalendar)}
            className="w-full bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex items-center justify-between text-stone-700 font-medium hover:bg-stone-50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600" />
              Full Ramadan Schedule
            </span>
            {showFullCalendar ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          <AnimatePresence>
            {showFullCalendar && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white mt-2 rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-stone-50 text-stone-500 font-medium">
                        <tr>
                          <th className="px-4 py-3 text-center">Ramadan</th>
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3">Sehri</th>
                          <th className="px-4 py-3">Iftar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {ramadanSchedule.map((day) => {
                          const isToday = todaySchedule?.day === day.day;
                          return (
                            <tr 
                              key={day.day} 
                              className={isToday ? 'bg-emerald-50' : 'hover:bg-stone-50'}
                            >
                              <td className="px-4 py-3 text-center font-medium text-stone-400">
                                {day.day}
                              </td>
                              <td className="px-4 py-3 text-stone-600">
                                {day.date.split(' ').slice(0, 2).join(' ')}
                              </td>
                              <td className="px-4 py-3 font-medium text-emerald-700">
                                {day.sehri}
                              </td>
                              <td className="px-4 py-3 font-medium text-amber-600">
                                {day.iftar}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="text-center text-stone-400 text-xs py-4">
          <p>Schedule based on Islamic Foundation Bangladesh (Cumilla District)</p>
          <p className="mt-1">Please verify with your local mosque for precision.</p>
        </footer>

      </main>
    </div>
  );
}
