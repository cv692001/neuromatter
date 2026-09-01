import fs from "node:fs";
import https from "node:https";
import path from "node:path";

// Read the URL list straight out of the sitemap the build just generated, so a
// new page only has to be added to src/lib/site-config.ts to be submitted here.
const SITEMAP_PATH = path.resolve(process.cwd(), "dist", "sitemap.xml");

if (!fs.existsSync(SITEMAP_PATH)) {
  console.error(`IndexNow: ${SITEMAP_PATH} not found. Run the build first.`);
  process.exit(1);
}

const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
const urlList = [
  ...new Set(
    [...sitemap.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/g)].map((m) => m[1].trim())
  ),
];

if (urlList.length === 0) {
  console.error("IndexNow: no <loc> entries found in sitemap.xml.");
  process.exit(1);
}

console.log(`IndexNow: submitting ${urlList.length} URLs.`);

const payload = JSON.stringify({
  host: "www.neuromatter.in",
  key: "98623e2cf0754eef8c8aed0679141bc5",
  keyLocation:
    "https://www.neuromatter.in/98623e2cf0754eef8c8aed0679141bc5.txt",
  urlList,
});

const options = {
  hostname: "api.indexnow.org",
  path: "/indexnow",
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
  },
};

const req = https.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => (body += chunk));
  res.on("end", () => {
    console.log(`IndexNow response: ${res.statusCode} ${res.statusMessage}`);
    if (body) console.log(body);

    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log("URLs submitted successfully.");
    } else {
      console.error("IndexNow submission failed.");
      process.exit(1);
    }
  });
});

req.on("error", (err) => {
  console.error("Request error:", err.message);
  process.exit(1);
});

req.write(payload);
req.end();
