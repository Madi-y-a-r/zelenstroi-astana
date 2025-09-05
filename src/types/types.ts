interface IStrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  formats: {
    thumbnail: { url: string };
    small?: { url: string };
  };
}
interface IProject {
  id: number;
  documentId: string;
  title: string;
  coverImage: IStrapiImage;
}
interface IService {
  id: number;
  slug: string;
  title: string;
  image: IStrapiImage | null;
  description: string;
}
interface INewsItem {
  id: number;
  title: string;
  slug: string;
  summary: string;
  publishedDate: string;
  image: IStrapiImage;
}
interface IStatisticItem {
  id: number;
  number: string;
  label: string;
}