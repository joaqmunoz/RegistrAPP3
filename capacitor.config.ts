const config = {
  appId: 'io.ionic.starter',
  appName: 'App',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CameraPreview: {
      position: 'rear',
      width: 320,
      height: 240,
      toBack: false
    }
  }
};

export default config;
