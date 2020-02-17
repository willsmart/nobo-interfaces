// TODO document

export default interface ValueCleaningPolicy_publicInterface {
  queueCleanup(name: string, cleanupCallback: () => Promise<void>): void;
  cancelCleanup(name: string): void;
}
