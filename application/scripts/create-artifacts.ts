// tslint:disable: no-shadowed-variable
import { ncp } from "ncp";
import { join } from "path";
import { exec } from "pkg";

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

const filter = (fileName: string): boolean => {
  const copyBlacklist = [
    "node_modules",
    "yarn.lock"
  ];
  const blacklistEvalutation = copyBlacklist.map((item) => fileName.includes(item));
  const containsBlacklistedItem = blacklistEvalutation.indexOf(true) > -1;

  return !containsBlacklistedItem;
}

const ncpOptions = {
  filter: filter,
  stopOnErr: true
}

const copySync = async (source: string, destination: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    console.log(`Copying ${source} to ${destination}`);
    ncp(source, destination, ncpOptions, (error) => {
      if (error) {
        console.error(`Error while ncp: ${error}`);
        reject(error);
      } else {
        resolve();
      }
    });
  });
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

const copy = async (filesToCopy: SourceDestinationPair[]) => {
  for (let index = 0; index < filesToCopy.length; index++) {
    const source = filesToCopy[index].source;
    const destination = filesToCopy[index].destination;
    try {
      await copySync(source, destination);
    } catch (error) {
      console.error(`Error while copying file ${source} to ${destination}: ${error.toString()}`);
      process.exit(1);
    }
  }
};

const artifacts: Artifact[] = [
  {
    name: "linux-x64",
    nodeVersion: "node10",
    outputDirectory: "bin",
    filesToCopy: [
      {
        source: "dist/apps/client",
        destination: "bin/linux-x64/client"
      },
      {
        source: "dist/apps/admin",
        destination: "bin/linux-x64/admin"
      },
      {
        source: "misc/bundle-structure",
        destination: "bin/linux-x64"
      },
      {
        source: "ffmpeg/linux-x64",
        destination: "bin/linux-x64/ffmpeg"
      }
    ],
    action: pkg
  },
  {
    name: "win-x64",
    nodeVersion: "node10",
    outputDirectory: "bin",
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
      }
    ],
    action: pkg
  },
  {
    name: "nodejs",
    nodeVersion: null,
    outputDirectory: "bin",
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
        source: "misc/bundle-structure/live.env",
        destination: "bin/nodejs/liveo.env"
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

createArtifacts(artifacts).then(() => {
  console.log("Creating artifacts successful");
});
