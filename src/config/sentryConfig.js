import Raven from 'raven-js';

const sentry_key = '3e40903e6ade4a9591bfc8a8fa779632';

const sentry_app='273977';

const sentry_url =`https://${sentry_key}@sentry.io/${sentry_app}`;

export const logException = (ex,context) =>{
  Raven.captureException(ex, {
    extra: context
  });

window && window.console && console.error && console.error(ex);

}
