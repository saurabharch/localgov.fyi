const path = require(`path`)
let activeEnv = 'staging'

if (process.env.PROJECT_ID && process.env.PROJECT_ID==='evergov-prod'){
  activeEnv ='production'
}

const pt = __dirname + `/.env.${activeEnv}`

require('dotenv').config({
  path : pt
});


module.exports = {
  siteMetadata: {
    title: `Papergov One: One dashboard to manage all your government services`,
    siteUrl: `https://embed.papergov.com`
  },
  plugins: [
    /*
     * Gatsby's data processing layer begins with “source”
     * plugins.  You can source data nodes from anywhere but
     * most sites, like Gatsbygram, will include data from
     * the filesystem so we start here with
     * “gatsby-source-filesystem”.
     *
     * A site can have as many instances of
     * gatsby-source-filesystem as you need.  Each plugin
     * instance is configured with a root path where it then
     * recursively reads in files and adds them to the data
     * tree.
     */
    // `gatsby-plugin-react-next`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
        defaultQuality: 90
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `illus`,
        path: path.join(__dirname, `src/illus`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `service_glossary`,
        path: path.join(__dirname, `data/service_glossary`)
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `sers`,
        path: path.join(__dirname, `data/sers`)
      }
    },
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage(filter : {
              path: {
               nin : ["/dyamic/"],
              }
            }) {
              edges {
                
                node {

                  path

                }
              }
            }
        }`,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `weekly`,
              priority: 0.9
            };
          })
      }
    },
    // This plugin transforms JSON file nodes.
    `gatsby-transformer-json`,
    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: {
        prefixes: [`/dynamic/*`]
      }
    },
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#0000ca`,
        // Disable the loading spinner.
        showSpinner: false
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `The Cool Application`,
        short_name: `Cool App`,
        description: `The application does cool things and makes your life better.`,
        lang: `en`,
        display: `standalone`,
        icon: `src/favicon.png`,
        start_url: `/`,
        background_color: `#0000ca`,
        theme_color: `#fff`
      }
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://papergov.com",
        sitemap: "https://papergov.com/sitemap.xml",
        policy: [{ userAgent: "*", disallow: [`/dynamic/*`] }]
      }
    },
    `gatsby-plugin-remove-serviceworker`,
    "gatsby-plugin-brotli",
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [
            "X-XSS-Protection: 0",
            "Content-Security-Policy: frame-ancestors 'self' https://*.papergov.com",
            "X-Frame-Options: ALLOW-FROM https://*.papergov.com"
          ]
        }
      }
    }
    // This plugin generates a service worker and AppShell html file so the site
    // works offline and is otherwise resistant to bad networks. Works with almost
    // any site!
  ]
};
