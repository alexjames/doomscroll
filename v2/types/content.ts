export interface Slide {
  id: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ContentData {
  id: string;
  title?: string;
  slides: Slide[];
  createdAt?: Date;
}
