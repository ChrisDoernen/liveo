export interface IStreamingSource {
  isStreaming: boolean;
  startStreaming(): void;
  stopStreaming(): void;
}
