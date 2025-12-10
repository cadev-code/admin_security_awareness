export interface Content {
  id: number;
  title: string;
  file: File | null;
  availability: string;
  examUrl: string;
  cover?: File | null;
  idModule: number;
}

export interface ContentsResponse {
  error: string | null;
  data: Content[];
}
