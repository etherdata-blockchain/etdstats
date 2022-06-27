import {DependencyTree, Model} from "../dependency_tree";
import yaml, {Schema} from "yaml";
import {OpenAPIV3} from "openapi-types";

jest.mock("fs");
jest.mock("yaml");

describe("Given a dependency tree", () => {
    const model1: Model = {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
        },
    };

    const model2: Model = {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
        },
    };

    const model3: Model = {
        type: "object",
        properties: {
            name: {
                type: "string",
            },
        },
    };

    const schema1: OpenAPIV3.Document = {
        openapi: "",
        info: {
            title: "",
            version: "",
        },
        paths: {
            "/": {
                get: {
                    responses: {
                        "200": {
                            description: "",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "component1.yaml#/components/schemas/model1",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/hello": {
                get: {
                    responses: {
                        "200": {
                            description: "",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "component1.yaml#/components/schemas/model2",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    const schema1Hard: OpenAPIV3.Document = {
        openapi: "",
        info: {
            title: "",
            version: "",
        },
        paths: {
            "/": {
                get: {
                    responses: {
                        "200": {
                            description: "",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            total: {
                                                type: "number"
                                            },
                                            results: {
                                                $ref: "component1.yaml#/components/schemas/model2",
                                            }
                                        }
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/hello": {
                get: {
                    responses: {
                        "200": {
                            description: "",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "component1.yaml#/components/schemas/model2",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    const schema2: OpenAPIV3.Document = {
        openapi: "",
        info: {
            title: "",
            version: "",
        },
        paths: {
            "/": {
                get: {
                    responses: {
                        "200": {
                            description: "",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/model1",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                model1: model1,
                model2: model2,
                model3: model3,
            },
        },
    };

    const schema2Hard: OpenAPIV3.Document = {
        openapi: "",
        info: {
            title: "",
            version: "",
        },
        paths: {
            "/": {
                get: {
                    responses: {
                        "200": {
                            description: "",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/model2",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        components: {
            schemas: {
                model2: model2,
                model3: model3,
            },
        },
    };

    test("Simple tree", () => {
        const tree = new DependencyTree({
            name: "root",
            refs: ["#/components/schemas/model1"],
            models: {
                model2: model2,
            },
            apiSpec: schema1,
        });

        let node = new DependencyTree({
            name: "#/components/schemas/model1",
            refs: [],
            models: {
                model1: model1,
            },
            apiSpec: schema1,
        });

        tree.addChild(node);

        const result = tree.generateModels();
        expect(result).toStrictEqual({
            model1: model1,
            model2: model2,
        });
    });

    test("Nested tree", () => {
        const tree = new DependencyTree({
            name: "root",
            refs: ["#/components/schemas/model2"],
            models: {
                model1: model1,
            },
            apiSpec: schema2,
        });

        let node = new DependencyTree({
            name: "#/components/schemas/model2",
            refs: ["#/components/schemas/model3"],
            models: {
                model2: model2,
            },
            apiSpec: schema2,
        });

        let nodenode = new DependencyTree({
            name: "#/components/schemas/model3",
            refs: [],
            models: {
                model3: model3,
            },
            apiSpec: schema2,
        });

        node.addChild(nodenode);
        tree.addChild(node);

        const result = tree.generateModels();
        expect(result).toStrictEqual({
            model1: model1,
            model2: model2,
            model3: model3,
        });
    });

    test("Build tree", () => {
        (yaml.parse as any as jest.Mock)
            .mockReturnValueOnce(JSON.parse(JSON.stringify(schema1)))
            .mockReturnValueOnce(JSON.parse(JSON.stringify(schema2)))
            .mockReturnValueOnce(JSON.parse(JSON.stringify(schema2)));

        const tree = DependencyTree.buildTree("test.yaml");
        expect(tree.getChildren()).toHaveLength(1);

        const result = tree.generateModels();
        expect(result).toStrictEqual({
            model1: model1,
            model2: model2,
            model3: model3,
        });

        const generatedSpec = tree.toSpec();
        expect(
            (generatedSpec.paths["/"]?.get?.responses["200"] as any).content[
                "application/json"
                ].schema.$ref
        ).toStrictEqual("#/components/schemas/model1");
        expect(generatedSpec.components!.schemas).toStrictEqual({
            model1: model1,
            model2: model2,
            model3: model3,
        });
    });

    test("Build tree 2", () => {
        (yaml.parse as any as jest.Mock)
            .mockReturnValueOnce(JSON.parse(JSON.stringify(schema1Hard)))
            .mockReturnValueOnce(JSON.parse(JSON.stringify(schema2Hard)))
            .mockReturnValueOnce(JSON.parse(JSON.stringify(schema2Hard)));

        const tree = DependencyTree.buildTree("test.yaml");
        expect(tree.getChildren()).toHaveLength(1);

        const result = tree.generateModels();
        expect(result).toStrictEqual({
            model2: model2,
            model3: model3,
        });

        const generatedSpec = tree.toSpec();
        expect(
            (generatedSpec.paths["/"]?.get?.responses["200"] as any).content[
                "application/json"
                ].schema.properties.results.$ref
        ).toStrictEqual("#/components/schemas/model2");
        expect(generatedSpec.components!.schemas).toStrictEqual({
            model2: model2,
            model3: model3,
        });
    });
});
