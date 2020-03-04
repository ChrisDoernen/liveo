// tslint:disable: no-shadowed-variable
import { existsSync, mkdirSync, writeFile } from "fs";
import * as JSZip from "jszip";
import { join } from "path";
import { version } from "../version";

type DeploymentTarget = "nightly" | "release";

interface ArtifactInfo {
  deploymentTarget: DeploymentTarget;
  date: string;
  branch: string;
  revision: string;
  version: string;
}

const createDeploymentDirectory = (): string => {
  const deploymentDir = "deployment";

  if (!existsSync(deploymentDir)) {
    mkdirSync(deploymentDir);
  }

  return deploymentDir;
}

const checkDeploymentTargetArguments = (): DeploymentTarget => {
  const deploymentTargetArgument = process.argv[2];

  if (deploymentTargetArgument !== "--nightly") {
    console.error("Only nightly builds are supported");
    process.exit(1);
  }

  return "nightly";
}

const formatBuildDate = () => {
  const d = new Date();
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("");
}

const createArtifactsDirectory = (deploymentDirectory: string, target: DeploymentTarget): string => {
  const buildDate = formatBuildDate();
  const targetDirectory = `${target}-${buildDate}`;
  const artifactsDirectory = join(deploymentDirectory, targetDirectory);
  if (!existsSync(artifactsDirectory)) {
    mkdirSync(artifactsDirectory);
  }

  return artifactsDirectory;
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

const getArtifactInfoJson = (target: DeploymentTarget): ArtifactInfo => {
  return {
    deploymentTarget: target,
    date: new Date().toISOString(),
    branch: version.branch,
    revision: version.revision,
    version: version.version
  };
}

const writeArtifactInfo = (directory: string, artifactInfo: ArtifactInfo) => {
  const fileName = join(directory, "artifactInfo.json");
  writeFile(fileName, JSON.stringify(artifactInfo, undefined, 2), () => {
    console.log(`Wrote build info to ${fileName} with content ${JSON.stringify(artifactInfo)}`);
  });
}

const deploymentTarget = checkDeploymentTargetArguments();
const deploymentDirectory = createDeploymentDirectory();
const artifactsDirectory = createArtifactsDirectory(deploymentDirectory, deploymentTarget);
const artifactInfo = getArtifactInfoJson(deploymentTarget);
writeArtifactInfo(artifactsDirectory, artifactInfo);
zipWinX64Build(artifactsDirectory);
