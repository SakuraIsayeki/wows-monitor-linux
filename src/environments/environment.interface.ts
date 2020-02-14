export interface Environment {
  production: boolean;
  browser: boolean;
  desktop: boolean;
  apiUrl: string;
  appUrl?: string;
  gaCode?: string;
}
