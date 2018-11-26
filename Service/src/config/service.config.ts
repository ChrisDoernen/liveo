const serviceConfig = {
    port: process.env.PORT || 8080,
    environment: process.env.ENVIRONMENT || "Development"
};

export = serviceConfig;
