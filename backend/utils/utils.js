import fs from "fs";
import Handlebars from "handlebars";

export default function createTemplate({ file, params }) {
  const source = fs.readFileSync("./utils/emails/" + file, "utf-8").toString();
  const template = Handlebars.compile(source);
  const html = template(params);

  return html;
}
