import raven from 'raven-js';
import config from 'config';

const SENTRY_DSN = 'https://XXXX@app.getsentry.com/YYYY';

function sendQueue() {
  const sentryOffline = JSON.parse(window.localStorage.sentryOffline);

  if (sentryOffline.length > 0) {
    raven._send(sentryOffline[0]);
  }
}

const CrashReporter = {
  init: () => {
    if (!window.localStorage.sentryOffline) {
      window.localStorage.sentryOffline = '[]';
    }

    raven.config(SENTRY_DSN, {});
    raven.install();

    document.addEventListener('ravenFailure', ({data}) => {
      // Only store it once.
      if (!data.extra.retry) {
        // Mutation with side effect.
        data.extra.retry = true;

        const sentryOffline = JSON.parse(window.localStorage.sentryOffline);
        // We can't store too much data
        if (sentryOffline.length < 10) {
          sentryOffline.push(data); // We use a FIFO.
          window.localStorage.sentryOffline = JSON.stringify(sentryOffline);
        }
      }
    });

    document.addEventListener('ravenSuccess', ({data}) => {
      if (data.extra.retry === true) {
        const sentryOffline = JSON.parse(window.localStorage.sentryOffline);
        sentryOffline.shift(); // We use a FIFO.
        window.localStorage.sentryOffline = JSON.stringify(sentryOffline);
      }

      // The last push succeded, let's try to clear the queue.
      sendQueue();
    });

    // First load, let's try to clear the queue.
    sendQueue();
  },
};

export default CrashReporter;
