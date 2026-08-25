import { MeetingWeek } from "../types";

export const ITALIAN_MONTHS = [
  "gennaio",
  "febbraio",
  "marzo",
  "aprile",
  "maggio",
  "giugno",
  "luglio",
  "agosto",
  "settembre",
  "ottobre",
  "novembre",
  "dicembre",
];

export interface WeekRangeInfo {
  weekId: string;
  weekLabel: string;
  dateRange: string;
  startDate: Date;
  endDate: Date;
  isoWeekNum: number;
  year: number;
}

/**
 * Calculates current calendar week info (Monday to Sunday)
 */
export function getCurrentWeekRange(date = new Date()): WeekRangeInfo {
  const d = new Date(date);
  const day = d.getDay(); // 0 is Sun, 1 is Mon...
  const diffToMonday = day === 0 ? -6 : 1 - day;

  const monday = new Date(d);
  monday.setDate(d.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  const mDay = monday.getDate();
  const sDay = sunday.getDate();
  const mMonthName = ITALIAN_MONTHS[monday.getMonth()];
  const sMonthName = ITALIAN_MONTHS[sunday.getMonth()];
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const mYear = monday.getFullYear();
  const sYear = sunday.getFullYear();

  let label = "";
  if (mMonthName === sMonthName && mYear === sYear) {
    label = `${mDay}-${sDay} ${capitalize(mMonthName)} ${mYear}`;
  } else if (mYear === sYear) {
    label = `${mDay} ${capitalize(mMonthName)} - ${sDay} ${capitalize(sMonthName)} ${mYear}`;
  } else {
    label = `${mDay} ${capitalize(mMonthName)} ${mYear} - ${sDay} ${capitalize(sMonthName)} ${sYear}`;
  }

  // ISO week calculation
  const target = new Date(monday.valueOf());
  const dayNr = (monday.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  const isoWeekNum = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  const weekId = `${mYear}-W${String(isoWeekNum).padStart(2, "0")}`;

  return {
    weekId,
    weekLabel: label,
    dateRange: label,
    startDate: monday,
    endDate: sunday,
    isoWeekNum,
    year: mYear,
  };
}

/**
 * Checks if a MeetingWeek matches the current date
 */
export function isWeekCurrent(week: MeetingWeek, today = new Date()): boolean {
  if (week.isCurrent) return true;

  const currentInfo = getCurrentWeekRange(today);
  if (week.id === currentInfo.weekId) return true;

  // Check text match in dateRange / weekLabel
  const text = `${week.weekLabel} ${week.dateRange}`.toLowerCase();
  const currentMonth = ITALIAN_MONTHS[today.getMonth()];
  const currentYear = today.getFullYear().toString();
  const currentDay = today.getDate();

  // If both year and month match
  if (text.includes(currentYear) && text.includes(currentMonth)) {
    // Check if day is within the range string like "3-9" or "24-30"
    const match = text.match(/(\d{1,2})\s*[-–]\s*(\d{1,2})/);
    if (match) {
      const startDay = parseInt(match[1], 10);
      const endDay = parseInt(match[2], 10);
      if (currentDay >= startDay && currentDay <= endDay) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Finds the ID of the current week from a list of weeks
 */
export function findCurrentWeekId(weeks: MeetingWeek[], today = new Date()): string {
  if (!weeks || weeks.length === 0) return "";

  // 1. Check for explicit isCurrent flag
  const explicit = weeks.find((w) => w.isCurrent);
  if (explicit) return explicit.id;

  // 2. Check if any week matches current calendar range
  const matched = weeks.find((w) => isWeekCurrent(w, today));
  if (matched) return matched.id;

  // 3. Check ISO week ID match
  const currentInfo = getCurrentWeekRange(today);
  const isoMatched = weeks.find((w) => w.id === currentInfo.weekId);
  if (isoMatched) return isoMatched.id;

  // 4. Find the closest week chronologically
  const currentMonth = ITALIAN_MONTHS[today.getMonth()];
  const currentYear = today.getFullYear().toString();
  const sameMonthYear = weeks.find((w) => {
    const text = `${w.weekLabel} ${w.dateRange}`.toLowerCase();
    return text.includes(currentMonth) && text.includes(currentYear);
  });
  if (sameMonthYear) return sameMonthYear.id;

  // 5. Default fallback to first week
  return weeks[0].id;
}
