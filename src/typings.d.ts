declare module '*.scss' {
  const content: { [className: string]: string };
  export = content;
}

declare module '*.jpg';
declare module '*.png';
declare module '*.svg';
declare module '*.webp';
declare module '*.json';

declare const APP_NAME: string;
declare const API_HOST: string;
declare const AUTH_COOKIE_NAME: string;
declare const YM_ACCOUNT: string;
declare const GA_ACCOUNT: string;
