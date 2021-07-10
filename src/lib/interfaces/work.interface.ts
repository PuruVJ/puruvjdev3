export type IWork = {
  title: string;
  url: string;
  stack: string;
  description: string;
  repo: {
    url: string;
    type: 'github';
  };
  image: {
    large: {
      webp: string;
      org: string;
    };
    small: {
      webp: string;
      org: string;
    };
    aspectHTW: number;
    color: number[];
    format: 'jpg' | 'png';
  };
};
