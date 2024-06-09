/// <reference types="vite/client" />

interface Styles {
  [key: string]: string;
}

declare module '*.scss' {
  const styles: Styles;
  export default styles;
}