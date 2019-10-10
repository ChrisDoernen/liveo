export interface IStreamingSource {
  hasValidDevice: boolean;
  isStreaming: boolean;
  startStreaming(): void;
  stopStreaming(): void;
}
