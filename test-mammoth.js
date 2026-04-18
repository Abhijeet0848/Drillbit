const mammoth = require("mammoth");
const buffer = Buffer.from("");
mammoth.extractRawText({buffer: buffer})
  .then(() => console.log("Mammoth is working"))
  .catch((e) => console.log("Mammoth test failed as expected with empty buffer:", e.message));
