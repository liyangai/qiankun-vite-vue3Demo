/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'com-components' {
  import type { DefineComponent } from 'vue';
  export const CommonButton: DefineComponent<any, any, any>;
  export const CommonCard: DefineComponent<any, any, any>;
}

declare module 'com-utils' {
  export function formatDate(date: Date | number, format?: string): string;
  export function getRelativeTime(date: Date | number): string;
  export const storage: {
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
    remove(key: string): void;
    clear(): void;
  };
  export const sessionStorage: {
    set<T>(key: string, value: T): void;
    get<T>(key: string): T | null;
    remove(key: string): void;
    clear(): void;
  };
  export function formatNumber(num: number): string;
  export function formatFileSize(bytes: number): string;
  export function maskPhone(phone: string): string;
  export function maskIdCard(idCard: string): string;
  export function isValidPhone(phone: string): boolean;
  export function isValidEmail(email: string): boolean;
  export function isValidIdCard(idCard: string): boolean;
  export function isValidUrl(url: string): boolean;
  export function isEmpty(value: unknown): boolean;
}

