export type ExportedImagesMetaData = {
  large: {
    org: string;
  };
  small: {
    org: string;
  };
  aspectHTW: number;
};

export type Work = {
  title: string;
  url: string;
  stack: string;
  description: string;
  repo: {
    url: string;
    type: 'github';
  };
  image: ExportedImagesMetaData;
};

export declare type BlogData = {
  id: string;
  title: string;
  description: string;
  date: Date;
  series?: string;
  seriesIndex: number;

  cover_image: string;

  body: string;
};

export type Series = {
  [key: string]: {
    id: string;
    date: Date;
    title: string;
  }[];
};

export function optimizeBlogImages(src: string, returnMarkup: true): Promise<string>;
export function optimizeBlogImages(
  src: string,
  returnMarkup: false,
): Promise<ExportedImagesMetaData>;

type UnwrapPromise<T> = T extends (props: any) => PromiseLike<infer U>
  ? U
  : T extends PromiseLike<infer K>
  ? K
  : T;
