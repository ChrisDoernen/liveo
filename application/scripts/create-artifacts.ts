// tslint:disable: no-shadowed-variable
import { copySync, emptyDirSync } from "fs-extra";
import { join } from "path";
import { exec } from "pkg";

const outputDirectory = "bin";

declare interface SourceDestinationPair {
  source: string,
  destination: string;
}

declare interface Artifact {
  name: string,
  nodeVersion: string,
  outputDirectory: string,
  filesToCopy: SourceDestinationPair[],
  action: (artifact: Artifact) => Promise<void>
}

const pkg = async (artifact: Artifact) => {
  const target = `${artifact.nodeVersion}-${artifact.name}`;
  const outPath = join(artifact.outputDirectory, artifact.name);
  const logFile = join("logs", `pkg-debug-${artifact.name}.log`);
  const debugArgument = `--debug > ${logFile}`;

  const pkgArguments = [
    "dist/apps/server/package.json",
    "--target",
    target,
    "--out-path",
    outPath,
    debugArgument
  ];

  try {
    console.log(`Starting packaging of ${artifact.name} with arguments ${pkgArguments.join(" ")}...`);
    await exec(pkgArguments);
  } catch (error) {
    console.error(`Error while packaging ${artifact.name}: ${error.toString()}`);
    process.exit(1);
  }

  console.log(`Packaging of ${artifact.name} successful.`);
}

const cleanOutputDirectory = () => {
  emptyDirSync(outputDirectory);
}

const copy = async (filesToCopy: SourceDestinationPair[]) => {
  for (let index = 0; index < filesToCopy.length; index++) {
    const source = filesToCopy[index].source;
    const destination = filesToCopy[index].destination;
    copySync(source, destination);
  }
};

const artifacts: Artifact[] = [
  {
    name: "win-x64",
    nodeVersion: "node10",
    outputDirectory,
    filesToCopy: [
      {
        source: "dist/apps/client",
        destination: "bin/win-x64/client"
      },
      {
        source: "dist/apps/admin",
        destination: "bin/win-x64/admin"
      },
      {
        source: "misc/bundle-structure",
        destination: "bin/win-x64"
      },
      {
        source: "ffmpeg/win-x64",
        destination: "bin/win-x64/ffmpeg"
      },
      {
        source: "../license.txt",
        destination: "bin/win-x64/license.txt"
      }
    ],
    action: pkg
  },
  {
    name: "nodejs",
    nodeVersion: null,
    outputDirectory,
    filesToCopy: [
      {
        source: "dist/apps/server",
        destination: "bin/nodejs"
      },
      {
        source: "dist/apps/client",
        destination: "bin/nodejs/client"
      },
      {
        source: "dist/apps/admin",
        destination: "bin/nodejs/admin"
      },
      {
        source: "dist/scripts",
        destination: "bin/nodejs/scripts"
      },
      {
        source: "misc/bundle-structure/liveo.env",
        destination: "bin/nodejs/liveo.env"
      },
      {
        source: "../license.txt",
        destination: "bin/nodejs/license.txt"
      }
    ],
    action: null
  }
];

const createArtifacts = async (artifacts: Artifact[]) => {
  try {
    for (let index = 0; index < artifacts.length; index++) {
      const artifact = artifacts[index];
      if (artifact.action) {
        await artifact.action(artifact);
      }
      await copy(artifact.filesToCopy);
    }
  } catch (error) {
    console.error(`Error while creating artifacts: ${error.toString}`);
    process.exit(1);
  }
}

cleanOutputDirectory();
createArtifacts(artifacts).then(() => {
  console.log("Creating artifacts successful");
});
