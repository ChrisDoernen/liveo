// tslint:disable: no-shadowed-variable
import { execSync } from "child_process";
import { copySync, emptyDirSync, writeFileSync } from "fs-extra";
import { join } from "path";

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
  const output = join(artifact.outputDirectory, artifact.name);
  const logFile = join(__dirname, "..", "logs", `pkg-debug-${artifact.name}.log`);

  const pkgArguments = [
    "pkg",
    "dist/apps/server/package.json",
    "--target",
    target,
    "--output",
    output,
    "--debug"
  ];

  console.log(`Starting packaging of ${artifact.name} with arguments '${pkgArguments.join(" ")}'...`);
  const stdout = execSync(pkgArguments.join(" "), { maxBuffer: 1024 * 1024  * 10}); // Enlarge buffer to 10MB
  writeFileSync(logFile, stdout);
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
    nodeVersion: "node12",
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
    console.error(`Error while creating artifacts: ${error}`);
    process.exit(1);
  }
}

cleanOutputDirectory();
createArtifacts(artifacts).then(() => {
  console.log("Creating artifacts successful");
});
