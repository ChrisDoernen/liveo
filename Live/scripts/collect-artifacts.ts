// tslint:disable: no-shadowed-variable
import { existsSync, mkdirSync, writeFile, writeFileSync } from "fs";
import * as JSZip from "jszip";
import { join } from "path";
import { version } from "../version";

interface ArtifactInfo {
  date: string;
  branch: string;
  revision: string;
  version: string;
}

const createDirectoryIfNotExisting = (directory: string): string => {
  const artifacts = "artifacts";
  const artifactDirectory = join("artifacts", directory);

  if (!existsSync(artifacts)) {
    mkdirSync(artifacts);
  }

  if (!existsSync(artifactDirectory)) {
    mkdirSync(artifactDirectory);
  }

  return artifactDirectory;
}

const checkArguments = (): string => {
  const artifactDirectory = process.argv[2];

  if (!artifactDirectory) {
    console.error("Please specify a directory");
    process.exit(1);
  }

  return artifactDirectory;
}

const zipWinX64Build = (directory: string) => {
  const zip = new JSZip();
  zip.folder("bin/win-x64").generateAsync({ type: "uint8array" }).then((content) => {
    const fileName = join(directory, "win-x64.zip");
    writeFile(fileName, content, () => {
      console.log(`Wrote file ${fileName}`);
    });
  });
}

const getArtifactInfoJson = (): ArtifactInfo => {
  return {
    date: new Date().toISOString(),
    branch: version.branch,
    revision: version.revision,
    version: version.version
  };
}

const writeArtifactInfo = (directory: string, artifactInfo: ArtifactInfo) => {
  const fileName = join(directory, "artifactInfo.json");
  writeFileSync(fileName, JSON.stringify(artifactInfo, undefined, 2));
  console.log(`Wrote build info to ${fileName} with content ${JSON.stringify(artifactInfo)}`);
}

const artifactDirectory = checkArguments();
const artifactsDirectory = createDirectoryIfNotExisting(artifactDirectory);
const artifactInfo = getArtifactInfoJson();
writeArtifactInfo(artifactsDirectory, artifactInfo);
zipWinX64Build(artifactsDirectory);
