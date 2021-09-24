const getCookie = (name: string): string | undefined => {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'),
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}; // getCookie

const setCookie = (name: string, value: string, path: string = '/', max_age: number = 86400) => {
  document.cookie = `${name}=${value}; path=${path}; max-age=${max_age}`;
}; // setCookie

const removeCookie = (name: string) => {
  document.cookie = `${name}=1; path=/; max-age=0`;
}; // removeCookie

export const cookieUtils = {
  getCookie,
  setCookie,
  removeCookie,
};
