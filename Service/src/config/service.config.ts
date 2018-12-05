const serviceConfig = {
    port: process.env.PORT || 8080,
    environment: process.env.ENVIRONMENT || "Development",
    os: process.platform,
    arch: process.arch
};

export = serviceConfig;
