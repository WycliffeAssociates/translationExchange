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

 var config = {
     apiUrl: "https://127.0.0.1/api/",
     streamingUrl: "https://127.0.0.1/"
};


const SENTRY_KEY = '88334842aa79457baf6c939141ec062c';
const SENTRY_APP = '276208';
export const SENTRY_URL = `https://${SENTRY_KEY}@sentry.io/${SENTRY_APP}`;

// const config = {                                            //remote api
//     apiUrl: "https://localhost/api/",
//     streamingUrl: "https://localhost/"
// };

// const config = {                                            //remote api
//     apiUrl: "https://te.loc/api/",
//     streamingUrl: "https://te.loc/"
// };

export default config;
