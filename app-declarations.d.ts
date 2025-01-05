export {};

declare global {
  interface FormData {
    append(
      name: string,
      value: { uri: string; type: string | null; name: string | null },
      fileName: string | null
    ): void;
  }
}