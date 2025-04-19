export interface ApiRequest {
  query: {
    [key: string]: string | string[];
  };
  body?: any;
  method?: string;
}

export interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
  end: (body?: string) => void;
  setHeader: (name: string, value: string | string[]) => void;
}
