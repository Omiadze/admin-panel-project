import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en.json';
import ge from './translations/ge.json';

const languageFromUrl = window.location.pathname.split('/')[1] || 'en';
console.log(languageFromUrl);

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ge: {
      translation: ge,
    },
  },
  lng: languageFromUrl,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
