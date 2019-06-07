import "reflect-metadata";
import { StreamingCommandProvider } from "./streaming-command-provider";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";

describe("StreamingCommandProvider", () => {
  let streamingCommandProvider: StreamingCommandProvider;
  const streamingCommand = {
    command: "ffmpeg",
    arguments: [
      "-y",
      "-f",
      "alsa",
      "-i",
      "hw:__DEVICEID__",
      "-rtbufsize",
      "64",
      "-probesize"
    ]
  }

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    streamingCommandProvider = new StreamingCommandProvider(logger, streamingCommand);
  });

  it("should construct", () => {
    expect(streamingCommandProvider).toBeTruthy();
  });

  it("should get streaming command correctly", () => {
    const command = streamingCommandProvider.getStreamingCommand("0");

    const expectedArguments = [
      "-y",
      "-f",
      "alsa",
      "-i",
      "hw:0",
      "-rtbufsize",
      "64",
      "-probesize"
    ]

    expect(command.command).toBe("ffmpeg");
    expect(command.arguments).toEqual(expectedArguments);
  });
});
