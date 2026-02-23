
export interface RamadanDay {
  day: number;
  date: string;
  sehri: string; // Format: "HH:mm AM"
  iftar: string; // Format: "HH:mm PM"
}

// Estimated schedule for Ramadan 2026 in Cumilla, Bangladesh
// Based on Islamic Foundation Bangladesh standard calculation (approximate)
// Ramadan likely starts around Feb 18, 2026 depending on moon sighting.

export const ramadanSchedule: RamadanDay[] = [
  { day: 1, date: "18 Feb 2026", sehri: "05:08 AM", iftar: "05:58 PM" },
  { day: 2, date: "19 Feb 2026", sehri: "05:07 AM", iftar: "05:59 PM" },
  { day: 3, date: "20 Feb 2026", sehri: "05:06 AM", iftar: "05:59 PM" },
  { day: 4, date: "21 Feb 2026", sehri: "05:05 AM", iftar: "06:00 PM" },
  { day: 5, date: "22 Feb 2026", sehri: "05:04 AM", iftar: "06:00 PM" },
  { day: 6, date: "23 Feb 2026", sehri: "05:03 AM", iftar: "06:01 PM" },
  { day: 7, date: "24 Feb 2026", sehri: "05:02 AM", iftar: "06:01 PM" },
  { day: 8, date: "25 Feb 2026", sehri: "05:01 AM", iftar: "06:02 PM" },
  { day: 9, date: "26 Feb 2026", sehri: "05:00 AM", iftar: "06:02 PM" },
  { day: 10, date: "27 Feb 2026", sehri: "04:59 AM", iftar: "06:03 PM" },
  { day: 11, date: "28 Feb 2026", sehri: "04:58 AM", iftar: "06:03 PM" },
  { day: 12, date: "01 Mar 2026", sehri: "04:57 AM", iftar: "06:03 PM" },
  { day: 13, date: "02 Mar 2026", sehri: "04:56 AM", iftar: "06:04 PM" },
  { day: 14, date: "03 Mar 2026", sehri: "04:55 AM", iftar: "06:04 PM" },
  { day: 15, date: "04 Mar 2026", sehri: "04:54 AM", iftar: "06:05 PM" },
  { day: 16, date: "05 Mar 2026", sehri: "04:53 AM", iftar: "06:05 PM" },
  { day: 17, date: "06 Mar 2026", sehri: "04:52 AM", iftar: "06:05 PM" },
  { day: 18, date: "07 Mar 2026", sehri: "04:51 AM", iftar: "06:06 PM" },
  { day: 19, date: "08 Mar 2026", sehri: "04:50 AM", iftar: "06:06 PM" },
  { day: 20, date: "09 Mar 2026", sehri: "04:49 AM", iftar: "06:07 PM" },
  { day: 21, date: "10 Mar 2026", sehri: "04:48 AM", iftar: "06:07 PM" },
  { day: 22, date: "11 Mar 2026", sehri: "04:47 AM", iftar: "06:07 PM" },
  { day: 23, date: "12 Mar 2026", sehri: "04:46 AM", iftar: "06:08 PM" },
  { day: 24, date: "13 Mar 2026", sehri: "04:45 AM", iftar: "06:08 PM" },
  { day: 25, date: "14 Mar 2026", sehri: "04:44 AM", iftar: "06:09 PM" },
  { day: 26, date: "15 Mar 2026", sehri: "04:43 AM", iftar: "06:09 PM" },
  { day: 27, date: "16 Mar 2026", sehri: "04:42 AM", iftar: "06:09 PM" },
  { day: 28, date: "17 Mar 2026", sehri: "04:41 AM", iftar: "06:10 PM" },
  { day: 29, date: "18 Mar 2026", sehri: "04:40 AM", iftar: "06:10 PM" },
  { day: 30, date: "19 Mar 2026", sehri: "04:39 AM", iftar: "06:11 PM" },
];

export const duas = {
  sehri: {
    arabic: "نَوَيْتُ اَنْ اَصُوْمَ غَدًا مِّنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَرْضًا لَكَ يَا اللهُ فَتَقَبَّل مني إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيم",
    bangla: "হে আল্লাহ! আমি আগামীকাল পবিত্র রমজানের তোমার পক্ষ থেকে নির্ধারিত ফরজ রোজা রাখার ইচ্ছা পোষণ (নিয়্যত) করলাম। অতএব তুমি আমার পক্ষ থেকে (আমার রোজা তথা পানাহার থেকে বিরত থাকাকে) কবুল কর, নিশ্চয়ই তুমি সর্বশ্রোতা ও সর্বজ্ঞানী।",
    transliteration: "Nawaitu an asuma ghadam min shahri Ramadan al-mubarak fardan laka ya Allahu fataqabbal minni innaka antas samiul alim."
  },
  iftar: {
    arabic: "اللَّهُمَّ لَكَ صُمْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ وَعَلَيْكَ تَوَكَّلْتُ",
    bangla: "হে আল্লাহ! আমি তোমারই সন্তুষ্টির জন্য রোজা রেখেছি এবং তোমারই দেয়া রিজিকের মাধ্যমে ইফতার করছি।",
    transliteration: "Allahumma laka sumtu wa ala rizqika aftartu wa alaika tawakkaltu."
  }
};
