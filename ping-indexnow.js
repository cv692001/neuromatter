import https from "node:https";

const payload = JSON.stringify({
  host: "neuromatter.in",
  key: "98623e2cf0754eef8c8aed0679141bc5",
  keyLocation: "https://neuromatter.in/98623e2cf0754eef8c8aed0679141bc5.txt",
  urlList: [
    "https://www.neuromatter.in/",
    "https://www.neuromatter.in/offerings",
    "https://www.neuromatter.in/technology",
    "https://www.neuromatter.in/news",
    "https://www.neuromatter.in/best-neuromarketing-agency-india",
    "https://www.neuromatter.in/best-conversion-rate-optimization-agencies-india",
    "https://www.neuromatter.in/conversion-rate-optimization-strategy",
    "https://www.neuromatter.in/how-to-increase-roas-meta-ads",
  ],
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
