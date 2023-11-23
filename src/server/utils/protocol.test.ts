import { describe, it, expect } from "vitest";
import { PipelineUrl } from "./protocol";

describe('splitProtocolAndPath', () => {
    it.each([
        ["test", { protocol: '', path: 'test' }],
        ["ado:test", { protocol: 'ado', path: 'test' }],
        ["https://www.example.com/path/to/resource", { protocol: 'https', path: '//www.example.com/path/to/resource' }],
    ])('should split the input "%s" into protocol and path', (input, expected) => {
        expect(PipelineUrl.splitString(input)).toEqual(expected);
    });
});