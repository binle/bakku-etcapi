export const initialization = (rootPath: string): void => {
  global.applicationContexts = {
    resource: {
      port: 8080,
    },
    rootPath,
  };
};
