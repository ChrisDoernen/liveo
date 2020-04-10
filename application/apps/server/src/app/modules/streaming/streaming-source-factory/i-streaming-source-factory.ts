import { IStreamingSource } from "../streaming-sources/i-streaming-source";

export const IStreamingSourceFactoryToken = "IStreamingSourceFactoryToken";

export type IStreamingSourceFactory = (deviceId: string, streamingId: string, onError: (error: Error) => void) => IStreamingSource;
