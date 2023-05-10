import { defineConfig } from "cypress";

export default defineConfig({
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    fixturesFolder: "cypress/fixtures",
    video: false,
    e2e: {
        async setupNodeEvents(on, config) {
            const { default: setupNodeEvents } = await import("./cypress/plugins");
            return setupNodeEvents(on, config);
        },
        baseUrl: "http://localhost:4200",
    },
});
