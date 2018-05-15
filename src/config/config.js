/*
    To access any of the configuration settings in this file, use:
        import config from "[path to config.js]"
    Then you can access the settings as "config.apiUrl", "config.streamingUrl", etc
*/

// var config = {
//     apiUrl: "http://172.19.145.91/api/",
//     streamingUrl: "http://172.19.145.91/"
// };
//
//  var config = {
//      apiUrl: "http://127.0.0.1:8000/api/",
//      streamingUrl: "http://127.0.0.1/"
// };




const config = {                                                        // local development
  apiUrl: 'http://localhost/api/',
  streamingUrl: 'http://localhost/',
  redirectUri: 'http://localhost:3000',
};

// const config = {                                                        //production
//     apiUrl: 'https://te.loc/api/',
//     streamingUrl: 'https://te.loc/',
//     redirectUri: 'https://te.loc/'
// };

// const config = {                                                        // new VM
//   apiUrl: 'https://opentranslationtools.org/api/',
//   streamingUrl: 'https://opentranslationtools.org/',
//   redirectUri: 'http://opentranslationtools.org',
// };


export default config;
