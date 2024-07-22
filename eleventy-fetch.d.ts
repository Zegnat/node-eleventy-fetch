/// <reference types="node" />
// import { Buffer } from 'buffer';

type FetchType = "json" | "buffer" | "text";

type EleventyFetchOptions<T extends FetchType> = {
	type?: T;
	directory?: string;
	concurrency?: number;
	fetchOptions?: RequestInit;
	dryRun?: boolean;
	removeUrlQueryParams?: boolean;
	verbose?: boolean;
	hashLength?: number;
	duration?: string;
	formatUrlForDisplay?: (url: string) => string;
};

interface AssetCacheConstructor {
	new (
		uniqueKey: string,
		cacheDirectory: string,
		options: EleventyFetchOptions<"text">,
	): AssetCacheInterface;
}
interface AssetCacheInterface {
	log(message: string): void;
	source: unknown;
	hash: unknown;
	cacheDirectory: string;
	readonly cacheFilename: string;
	readonly rootDir: string;
	readonly cachePath: string;
	readonly cache: unknown; // Actually from flatCache.load?!
	getDurationMs(duration: string): number;
	getCachedContentsPath(type: FetchType): string;
	ensureDir(): Promise<void>;
	save(contents: unknown, type: FetchType): Promise<void>;
	getCachedContents(type: FetchType): Promise<any>;
	_backwardsCompatibilityGetCachedValue(type: FetchType): any;
	getCachedValue(): Promise<any>;
	isCacheValid(duration: string): boolean;
	readonly cachedObject: any;
	needsToFetch(duration: string): boolean;
	fetch(options: EleventyFetchOptions): unknown;
}

interface RemoteAssetCacheConstructor {
	new (
		url: string | URL,
		cacheDirectory: string,
		options: EleventyFetchOptions<"text">,
	): RemoteAssetCacheInterface;
}
interface RemoteAssetCacheInterface extends AssetCacheInterface {}

declare function eleventyFetch(url: string, options?: EleventyFetchOptions<"buffer">): Buffer;
declare function eleventyFetch(url: string, options?: EleventyFetchOptions<"text">): string;
declare function eleventyFetch(url: string, options?: EleventyFetchOptions<"json">): unknown;
declare function eleventyFetch<T extends any>(
	url: string,
	options?: EleventyFetchOptions<"json">,
): T;

declare namespace eleventyFetch {
	let concurrency: number;
	function queue<T extends any>(source: string, queueCallback: () => T): Promise<T> | undefined;
	const Util: { isFullUrl: (url: string | URL) => boolean };
	const RemoteAssetCache: RemoteAssetCacheConstructor;
	const AssetCache: AssetCacheConstructor;
}

export = eleventyFetch;
