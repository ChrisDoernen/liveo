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
  artifacts: string[];
}

interface ArtifactCompressionAction {
  sourceDirectory: string;
  targetFilename: string;
  actionMethod: (sourceDirectory: string, targetFileName: string, directory: string) => void;
}

const createDirectoryIfNotExisting = (directory: string): string => {
  const artifacts = "artifacts";
  const artifactDirectory = join(artifacts, directory);

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

const zip = (sourceDirectory: string, targetFilename: string, targetDirectory: string) => {
  const zip = new JSZip();
  zip.folder(sourceDirectory).generateAsync({ type: "uint8array" }).then((content) => {
    const filename = join(targetDirectory, targetFilename);
    writeFile(filename, content, () => {
      console.log(`Wrote file ${filename}`);
    });
  });
}

const artifacts: ArtifactCompressionAction[] = [
  {
    sourceDirectory: "bin/win-x64",
    targetFilename: "win-x64.zip",
    actionMethod: zip
  },
  {
    sourceDirectory: "bin/nodejs",
    targetFilename: "nodejs.zip",
    actionMethod: zip
  }
];

const compressArtifacts = (artifacts: ArtifactCompressionAction[], targetDirectory: string) => {
  artifacts.forEach((artifact) => {
    artifact.actionMethod(artifact.sourceDirectory, artifact.targetFilename, targetDirectory);
  });
}

const getArtifactInfoJson = (artifacts: ArtifactCompressionAction[]): ArtifactInfo => {
  return {
    date: new Date().toISOString(),
    branch: version.branch,
    revision: version.revision,
    version: version.version,
    artifacts: artifacts.map((artifact) => artifact.targetFilename)
  };
}

const writeArtifactInfo = (directory: string, artifactInfo: ArtifactInfo) => {
  const fileName = join(directory, "artifactInfo.json");
  writeFileSync(fileName, JSON.stringify(artifactInfo, undefined, 2));
  console.log(`Wrote build info to ${fileName} with content ${JSON.stringify(artifactInfo)}`);
}

const artifactDirectory = checkArguments();
const artifactsDirectory = createDirectoryIfNotExisting(artifactDirectory);
const artifactInfo = getArtifactInfoJson(artifacts);
writeArtifactInfo(artifactsDirectory, artifactInfo);
compressArtifacts(artifacts, artifactsDirectory);
