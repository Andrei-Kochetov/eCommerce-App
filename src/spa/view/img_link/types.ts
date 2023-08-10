export type IImgLinkParams = {
  imgAttributes: {
    src: string;
    alt?: string;
  };
  linkAttributes: {
    href: string;
    target: string;
  };
  imgClasses: string[];
};
