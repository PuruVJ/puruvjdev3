export interface IBlog {
  id: string;
  title: string;
  date: string;
  description: string;
  cover_image?: string;
  body?: string;
  reading_time?: number;
  series?: string;
  seriesIndex?: number;
}
