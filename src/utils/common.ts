export const getCurrLang = () => {
    const localLang: string = navigator.language.split('-')[0]; // 浏览器语言
    const storageLang: string | null = sessionStorage.getItem("language"); // 本地存储语言
    return storageLang || localLang || 'en';
  }
  