// global.d.ts

declare global {
    interface Window {
      handleDownloadPDF: () => void;
      handlePrint: () => void;
    }
  }
  
  export {};
  