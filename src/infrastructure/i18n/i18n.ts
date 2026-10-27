import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import viCommon from './locales/vi/common.json';
import viDiscover from './locales/vi/discover.json';
import viNavigation from './locales/vi/navigation.json';
import viSettings from './locales/vi/settings.json';

import enCommon from './locales/en/common.json';
import enDiscover from './locales/en/discover.json';
import enNavigation from './locales/en/navigation.json';
import enSettings from './locales/en/settings.json';

const LANGUAGE_KEY = 'what_eat_today_language';

// Detect or fallback to saved preference, or navigator language, default to vi-VN
const getInitialLanguage = (): string => {
  if (typeof window === 'undefined') return 'vi-VN';
  const saved = localStorage.getItem(LANGUAGE_KEY);
  if (saved && (saved === 'vi-VN' || saved === 'en-US')) {
    return saved;
  }
  const browserLang = navigator.language || '';
  if (browserLang.toLowerCase().startsWith('en')) {
    return 'en-US';
  }
  return 'vi-VN';
};

const resources = {
  'vi-VN': {
    common: viCommon,
    discover: viDiscover,
    navigation: viNavigation,
    settings: viSettings,
  },
  'en-US': {
    common: enCommon,
    discover: enDiscover,
    navigation: enNavigation,
    settings: enSettings,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: 'vi-VN',
    defaultNS: 'common',
    ns: ['common', 'discover', 'navigation', 'settings'],
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LANGUAGE_KEY, lng);
    document.documentElement.lang = lng.startsWith('vi') ? 'vi' : 'en';
  }
});

export default i18n;
export { LANGUAGE_KEY };
