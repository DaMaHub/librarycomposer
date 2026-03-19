import Ajv from "ajv";
import addFormats from "ajv-formats";
import standaloneCode from "ajv/dist/standalone/index.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ajv = new Ajv({
  schemas: [
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/space.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/reference-pointer.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/base-contract.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/datatype.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/marker.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/cues.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/media.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/product.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/research.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/compute.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/experiment.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/lifeboard.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/module.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/packaging.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/question.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/units.json"), "utf8")),
    JSON.parse(fs.readFileSync(path.join(__dirname, "../src/schemas/visualise.json"), "utf8"))
  ],
  code: { source: true, esm: true },
  strict: false
});

addFormats(ajv);

let moduleCode = standaloneCode(ajv, {
  "datatype": "https://hop.io/schemas/datatype.json",
  "marker": "https://hop.io/schemas/marker.json",
  "cue": "https://hop.io/schemas/cues.json",
  "media": "https://hop.io/schemas/media.json",
  "product": "https://hop.io/schemas/product.json",
  "research": "https://hop.io/schemas/research.json",
  "compute": "https://hop.io/schemas/compute.json",
  "experiment": "https://hop.io/schemas/experiment.json",
  "lifeboard": "https://hop.io/schemas/lifeboard.json",
  "module": "https://hop.io/schemas/module.json",
  "packaging": "https://hop.io/schemas/packaging.json",
  "question": "https://hop.io/schemas/question.json",
  "units": "https://hop.io/schemas/units.json",
  "visualise": "https://hop.io/schemas/visualise.json"
});

// Fix for ajv-formats in ESM standalone mode
moduleCode = moduleCode.replace(
  /require\("ajv-formats\/dist\/formats"\)/g,
  'await import("ajv-formats/dist/formats.js").then(m => m.default || m)'
);
moduleCode = moduleCode.replace(
  /const formats0 = await import\("ajv-formats\/dist\/formats\.js"\)\.then\(m => m\.default \|\| m\)\.fullFormats\.uri;/g,
  'const formats0 = (await import("ajv-formats/dist/formats.js").then(m => m.default || m)).fullFormats.uri;'
);

const outDir = path.join(__dirname, "../src/validation");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, "validate.js"), moduleCode);
console.log("Validation module generated at src/validation/validate.js");
