import "reflect-metadata";
import createMockInstance from "jest-create-mock-instance";
import { Logger } from "../logging/logger";
import { FileStreamingCommandProvider } from "./file-streaming-command-provider";

describe("FileStreamingCommandProvider", () => {
  let fileStreamingCommandProvider: FileStreamingCommandProvider;
  const streamingCommand = {
    command: "ffmpeg",
    arguments: [
      "-re",
      "-i",
      "__FILENAME__",
      "-rtbufsize",
      "64",
      "-probesize"
    ]
  }

  beforeEach(() => {
    const logger = createMockInstance(Logger);
    fileStreamingCommandProvider = new FileStreamingCommandProvider(logger, streamingCommand);
  });

  it("should construct", () => {
    expect(fileStreamingCommandProvider).toBeTruthy();
  });

  it("should get streaming command correctly", () => {
    const command = fileStreamingCommandProvider.getStreamingCommand("/home/chris/some-file.mp3");

    const expectedArguments = [
      "-re",
      "-i",
      "/home/chris/some-file.mp3",
      "-rtbufsize",
      "64",
      "-probesize"
    ]

    expect(command.command).toBe("ffmpeg");
    expect(command.arguments).toEqual(expectedArguments);
  });
});
