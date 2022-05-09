import glob from "glob";
import yaml from "yaml";
import fs from "fs";
import path from "path";
import nunjucks from "nunjucks";

function generate() {
  glob("specs/*yaml", (err, matches) => {
    const outputFileNames: { name: string; path: string }[] = [];
    for (const match of matches) {
      const fileContent = fs.readFileSync(match, "utf-8");
      const yamlContent = yaml.parse(fileContent);
      const fileName = path.parse(match);
      const outputPath = path.join("src", `${fileName.name}.json`);
      outputFileNames.push({
        path: `${fileName.name}.json`,
        name: fileName.name.replace(".spec", ""),
      });
      fs.writeFileSync(outputPath, JSON.stringify(yamlContent, null, 4));
    }
    const indexFileContent = `
{%- for file in outputFileNames -%}
import {{ file.name }}_schema from "./{{ file.path }}"
{% endfor %}

export {
  {%- for file in outputFileNames %}
  {{ file.name }}_schema
  {%- endfor %}  
}
`;

    const compiledIndexFileContent = nunjucks.renderString(indexFileContent, {
      outputFileNames,
    });
    fs.writeFileSync("src/index.ts", compiledIndexFileContent);
  });
}

generate();
