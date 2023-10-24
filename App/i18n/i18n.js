import I18n from "react-native-i18n";
import ReactNative from "react-native";

import en from "./locales/en";
import tr from "./locales/tr";
import de from "./locales/de";
import zh from "./locales/zh";
import ar from "./locales/ar";
import es from "./locales/es";
import it from "./locales/it";
import ru from "./locales/ru";
import pl from "./locales/pl";
import fr from "./locales/fr";

I18n.fallbacks = true;

I18n.translations = {
  en: en,
  de: de,
  zh: zh,
  ar: ar,
  es: es,
  it: it,
  ru: ru,
  pl: pl,
  fr: fr,
  "tr-TR": tr
};

const currentLocale = I18n.currentLocale();
// I18n.defaultLocale = "en-US"; // If the current locale in device is not en or hi
// I18n.locale = "en-US"; // If we do not want the framework to use the phone's locale by default

// Is it a RTL language?
export const isRTL =
  currentLocale.indexOf("he") === 0 || currentLocale.indexOf("ar") === 0;

// Allow RTL alignment in RTL languages
ReactNative.I18nManager.allowRTL(false);

export function getLocale() {
  return I18n.locale;
  // return I18n.currentLocale();
}

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  //alert(currentLocale);
  return I18n.t(name, params);
}
export const setLocale = locale => {
  I18n.locale = locale;
  console.log(I18n.locale);
  console.log(getLocale());
};
export default I18n;
