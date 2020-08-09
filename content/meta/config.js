const colors = require("../../src/styles/colors");

module.exports = {
    siteTitle: "Random Presence", // <title>
    shortSiteTitle: "personal blog", // <title> ending for posts and pages
    siteDescription: "Random presence of my thoughts and learning...",
    siteUrl: "https://prasans.info",
    pathPrefix: "",
    siteImage: "preview.jpg",
    siteLanguage: "en",
    // author
    authorName: "Prasanna",
    authorTwitterAccount: "pvenk",
    // info
    infoTitle: "Prasanna's",
    infoTitleNote: "writings...",
    // manifest.json
    manifestName: "Random Presence",
    manifestShortName: "prasans", // max 12 characters
    manifestStartUrl: "/",
    manifestBackgroundColor: colors.background,
    manifestThemeColor: colors.background,
    manifestDisplay: "standalone",
    // contact
    contactEmail: "mail.prasanna.v@gmail.com",
    // social
    authorSocialLinks: [
        {name: "github", url: "https://github.com/prasann"},
        {name: "twitter", url: "https://twitter.com/pvenk"},
        {name: "facebook", url: "https://facebook.com/prasy"}
    ]
};
