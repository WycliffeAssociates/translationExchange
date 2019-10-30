/*
    To access any of the configuration settings in this file, use:
        import config from "[path to config.js]"
    Then you can access the settings as "config.apiUrl", "config.streamingUrl", etc
*/

const uploadServer = localStorage.getItem("uploadServer") || "opentranslationtools.org";

const config = {
  apiUrl: 'http://' + uploadServer + '/api/',
  streamingUrl: 'http://' + uploadServer + '/',
  redirectUri: 'http://' + uploadServer + '/',
  domain: '' + uploadServer + ''
};

export default config;
