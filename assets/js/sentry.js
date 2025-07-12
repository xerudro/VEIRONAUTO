import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://d80f93dbbc66e85cc37113a61c010cd2@o4509654280962048.ingest.de.sentry.io/4509654372450384",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});