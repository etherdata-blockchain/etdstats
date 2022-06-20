import { Node } from "./node";
import { OpenAPIV3 } from "openapi-types";
import { readFileSync } from "fs";
import yaml from "yaml";
import path from "path";

export type Model = OpenAPIV3.SchemaObject | undefined;

interface ParsedReference {
  filename: string | undefined;
  ref: string;
}

function replaceComponent(key: string) {
  return key.replace("#/components/schemas/", "");
}

/**
 * Recursively find $ref from value
 * @param values - array of values to be checked
 * @param prevRefs
 * @returns
 */
function findFromObject(
  values: { [key: string]: any },
  prevRefs: string[]
): string[] {
  const refs: string[] = prevRefs;

  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "object") {
      findFromObject(value, refs);
    }

    if (key === "$ref") {
      refs.push(value);
    }
  }
  return refs;
}

function replaceObject(values: { [key: string]: any }) {
  for (const [key, value] of Object.entries(values)) {
    if (typeof value === "object") {
      replaceObject(value);
    }

    if (value.$ref) {
      value.$ref = `#${value.$ref.split("#")[1]}`;
    }
  }
}

interface Props {
  refs: string[];
  name: string;
  models: { [key: string]: Model };
  apiSpec: OpenAPIV3.Document;
}

export class DependencyTree extends Node {
  refModels: { [key: string]: Model };
  models: { [key: string]: Model };
  apiSpec: OpenAPIV3.Document;

  constructor({ models, refs, name, apiSpec }: Props) {
    super(name);
    this.refModels = {};
    refs.forEach((ref) => {
      this.refModels[ref] = undefined;
    });

    this.models = models;
    this.apiSpec = apiSpec;
  }

  /**
   * Generate list of models from dependency tree
   */
  generateModels(): { [key: string]: Model } {
    return this.generateModelsUtil(this, {});
  }

  private generateModelsUtil(
    node: DependencyTree,
    prev: { [key: string]: Model }
  ): { [key: string]: Model } {
    let models: { [key: string]: Model } = { ...prev };
    if (node.hasChildren()) {
      node.children.forEach((child) => {
        models = {
          ...models,
          ...this.generateModelsUtil(child as DependencyTree, models),
        };
      });
    }

    const unvistedKeys = Object.keys(node.refModels).filter(
      (key) => node.refModels[key] === undefined
    );

    for (const key of unvistedKeys) {
      const newKey = replaceComponent(key);
      let foundModel = node.getModelByKey(newKey);
      if (foundModel) {
        this.assignModel(key, foundModel);
      }
    }
    models = { ...models, ...node.models };

    return models;
  }

  private getModelByKey(key: string): Model | undefined {
    const paths = key.split("/");
    for (const [modelKey, model] of Object.entries(this.models)) {
      for (const path of paths) {
        if (modelKey === key) {
          return model;
        }
      }
    }
  }

  assignModel(ref: string, model: Model): void {
    this.refModels[ref] = model;
  }

  /**
   * Build a dependency tree from file
   */
  static buildTree(yamlFileName: string): DependencyTree {
    const folderName = path.dirname(yamlFileName);
    const content = readFileSync(yamlFileName, "utf8");
    const openapi: OpenAPIV3.Document = yaml.parse(content);
    const refs = findFromObject(openapi, []);
    const parsedFiles: ParsedReference[] = [];
    for (const ref of refs) {
      const parsed = ref.split("#");
      let fileName: string = parsed[0];
      let refPath: string = parsed[1];

      parsedFiles.push({
        filename: fileName.length > 0 ? fileName : undefined,
        ref: refPath,
      });
    }
    const children: DependencyTree[] = [];

    for (const parsedFile of parsedFiles) {
      // referencing outside of the file
      if (parsedFile.filename) {
        const tree = DependencyTree.buildTree(
          path.join(folderName, parsedFile.filename)
        );
        children.push(tree);
      }
    }

    const models: { [key: string]: Model } = {};
    for (const [key, value] of Object.entries(
      openapi.components?.schemas || {}
    )) {
      // check if $ref not exists
      if ((value as any).$ref === undefined) {
        models[key] = value as Model;
      }
    }

    replaceObject(openapi);
    const tree = new DependencyTree({
      models: models,
      refs: parsedFiles.filter((p) => p.filename).map((p) => p.ref),
      name: yamlFileName,
      apiSpec: openapi,
    });

    tree.addChildren(children);
    return tree;
  }

  /**
   * Generate a replaced openapi spec from dependency tree
   * @returns OpenAPI Spec
   */
  toSpec(): OpenAPIV3.Document {
    return {
      ...this.apiSpec,
      components: {
        schemas: this.generateModels() as any,
      },
    };
  }
}
