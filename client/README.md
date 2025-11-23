# React + Vite

Минимальная сборка React на Vite с HMR и базовой конфигурацией ESLint.

Два официальных плагина:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) — Fast Refresh через Babel (или oxc с rolldown).
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) — Fast Refresh через SWC.

## React Compiler
По умолчанию выключен из-за накладных расходов в разработке/сборке. Подробнее: https://react.dev/learn/react-compiler/installation

## Расширение ESLint
Для продакшн-проектов лучше использовать TypeScript и правила с типами. Шаблон TS: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts и https://typescript-eslint.io
