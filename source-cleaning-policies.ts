// TODO document

export default interface ValueSourceCleaningPolicy_publicInterface {
  queueCleanup(name: string, cleanupCallback: () => Promise<void>): void;
  cancelCleanup(name: string): void;
}
