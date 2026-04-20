declare module "js/component" {
  interface Component {
    run(): void;
  }

  export default Component;
}

declare module "js/local-storage" {
  interface LocalStorageLike {
    getItem(key: string): string | null;
    setItem(key: string, value: string): void;
    removeItem(key: string): void;
  }

  const LocalStorage: LocalStorageLike;
  export default LocalStorage;
}
