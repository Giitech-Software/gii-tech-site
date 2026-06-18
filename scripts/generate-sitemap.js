// scripts/generate-sitemap.js

const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

const SITE_URL = "https://giitech-software-systems.web.app";

// 🚨 Ensure you have the serviceAccountKey.json in the root or use an ENV variable
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Static routes
const staticRoutes = [
  "/",
  "/services",
  "/projects",
  "/blog",
  "/jobs",
  "/contact",
  "/client-confidence",
  "/faqs",
  "/jobs/frontend-developer",
  "/jobs/backend-developer",
  "/jobs/python-programming-expert",
  "/jobs/react-native-expert",
  "/jobs/seo-engineer",
  "/login",
];

// Helper: build XML from routes
function generateSitemapXml(routes) {
  const timestamp = new Date().toISOString();

  const urls = routes.map(
    route => `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${timestamp}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${route === "/" ? "1.0" : "0.7"}</priority>
  </url>`
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls.join("\n")}
</urlset>`;
}

async function generateSitemap() {
  try {
    const blogSnapshot = await db.collection("blogPosts").get();
    const jobSnapshot = await db.collection("jobPosts").get();

    const blogRoutes = blogSnapshot.docs.map(doc => `/blog/${doc.id}`);
    const jobRoutes = jobSnapshot.docs.map(doc => `/jobs/${doc.id}`);

    const allRoutes = [...staticRoutes, ...blogRoutes, ...jobRoutes];
    const xml = generateSitemapXml(allRoutes);

    const outputPath = path.join(__dirname, "../public/sitemap.xml");
    fs.writeFileSync(outputPath, xml);

    console.log("✅ Sitemap generated with", allRoutes.length, "routes.");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
  }
}

generateSitemap();
