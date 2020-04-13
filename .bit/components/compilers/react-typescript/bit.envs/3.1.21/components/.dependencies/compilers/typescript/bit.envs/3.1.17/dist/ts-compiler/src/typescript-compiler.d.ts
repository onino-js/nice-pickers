import { ActionReturnType, Compiler, CompilerContext, InitAPI, Logger } from '@bit/bit.envs.common.compiler-types';
import { Preset } from '@bit/bit.envs.common.preset';
export declare class TypescriptCompiler implements Compiler {
    private preset;
    private _logger;
    constructor(preset?: Preset);
    init(ctx: {
        api: InitAPI;
    }): {
        write: boolean;
    };
    getDynamicPackageDependencies(ctx: CompilerContext, name?: string): import("@bit/bit.envs.common.preset").DependenciesJSON;
    getDynamicConfig(ctx: CompilerContext): {
        tsconfig: {};
        development: boolean;
        copyPolicy: {
            ignorePatterns: string[];
            disable: boolean;
        };
        useExperimentalCache: boolean;
    } & import("@bit/bit.envs.common.compiler-types").GenericObject;
    action(compilerContext: CompilerContext): Promise<ActionReturnType>;
    readonly logger: Logger | undefined;
}
