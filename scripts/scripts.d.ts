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

export function optimizeBlogImages(src: string, returnMarkup: true): Promise<string>;
export function optimizeBlogImages(
  src: string,
  returnMarkup: false
): Promise<ExportedImagesMetaData>;
