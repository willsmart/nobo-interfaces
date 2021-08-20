// TODO document

export default interface SourceCleaningPolicy_forTheWorld {
  queueCleanup(_: { key: string; cleanupCallback: () => Promise<void> }): void;
  cancelCleanup(key: string): void;
}
