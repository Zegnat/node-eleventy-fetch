import { expectAssignable, expectError, expectType, printType } from "tsd";
import eleventyFetch from ".";

expectType<string>(eleventyFetch("", { type: "text"}));
expectType<unknown>(eleventyFetch("", { type: "json"}));
expectType<{some: "json"}>(eleventyFetch<{some: "json"}>("", { type: "json"}));
expectType<Buffer>(eleventyFetch("", { type: "buffer"}));

expectType<Promise<string> | undefined>(eleventyFetch.queue("", () => "a"));
expectType<Promise<Array<never>> | undefined>(eleventyFetch.queue("", () => []));

expectType<boolean>(eleventyFetch.Util.isFullUrl("https://example.com/"));
expectType<boolean>(eleventyFetch.Util.isFullUrl(new URL("https://example.com/")));

printType(new eleventyFetch.AssetCache("a", "b", {}));