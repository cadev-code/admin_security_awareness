export interface Module {
  id: number;
  title: string;
  type: string;
  url: string;
  bgColor: string;
  bgImage: string;
  logo: string;
}

export interface ModulesResponse {
  error: string | null;
  data: Module[];
}
