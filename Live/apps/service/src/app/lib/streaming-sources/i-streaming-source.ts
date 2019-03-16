export interface IStreamingSource {
  hasValidDevice: boolean;
  startStreaming(): void;
  stopStreaming(): void;
}
