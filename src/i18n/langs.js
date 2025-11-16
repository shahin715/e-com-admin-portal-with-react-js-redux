export const locales = {
    en: {
        label: "English",
        dayjs: () => import('dayjs/locale/en'),
        flatpickr: null,
        i18n: () => import("./locales/en/translations.json"),
    },
    bn: {
        label: "Bangla",
        dayjs: () => import('dayjs/locale/bn'),
        flatpickr: () => import("flatpickr/dist/l10n/bn").then((module) => module.Bangla),
        i18n: () => import("./locales/bn/translations.json"),
    },
    ar: {
        label: "Arabic",
        dayjs: () => import('dayjs/locale/ar'),
        flatpickr: () => import("flatpickr/dist/l10n/ar").then((module) => module.Arabic),
        i18n: () => import("./locales/ar/translations.json"),
    },
}