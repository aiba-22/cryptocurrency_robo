import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationJa from "./locales/ja/translation.json";
import translationEn from "./locales/en/translation.json";

i18n.use(initReactI18next).init({
  lng: "ja",
  fallbackLng: "ja",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ja: { translation: translationJa },
    en: { translation: translationEn },
  },
});

export default i18n;
