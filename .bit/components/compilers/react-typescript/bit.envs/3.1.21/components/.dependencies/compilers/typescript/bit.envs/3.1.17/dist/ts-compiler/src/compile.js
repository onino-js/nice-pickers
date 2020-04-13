"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var execa_1 = __importDefault(require("execa"));
var fs = __importStar(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var recursive_readdir_1 = __importDefault(require("recursive-readdir"));
var vinyl_1 = __importDefault(require("vinyl"));
var tsconfig_1 = require("./tsconfig");
require("typescript");
var tsconfig_2 = require("./tsconfig");
var bit_envs_common_isolate_1 = require("@bit/bit.envs.common.isolate");
var md5_1 = __importDefault(require("md5"));
var os_1 = __importDefault(require("os"));
function compile(cc, preset) {
    return __awaiter(this, void 0, void 0, function () {
        var isolateResult, name_1, res, directory, srcTestFiles, context, results, dists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isolateResult = null;
                    if (!!cc.dynamicConfig.useExperimentalCache) return [3, 2];
                    return [4, bit_envs_common_isolate_1.isolate(cc)];
                case 1:
                    isolateResult = _a.sent();
                    return [3, 4];
                case 2:
                    name_1 = getCapsuleName(cc);
                    return [4, bit_envs_common_isolate_1.isolate(cc, {
                            skipNodeModules: true,
                            keepExistingCapsule: true
                        }, name_1)];
                case 3:
                    isolateResult = _a.sent();
                    _a.label = 4;
                case 4:
                    res = isolateResult.res, directory = isolateResult.directory;
                    srcTestFiles = getSrcTestFiles(cc.files);
                    return [4, createContext(res, directory, cc, srcTestFiles)];
                case 5:
                    context = _a.sent();
                    results = null;
                    return [4, preCompile(context, preset)];
                case 6:
                    _a.sent();
                    if (!(getNonCompiledFiles(cc.files).length === cc.files.length)) return [3, 8];
                    return [4, collectNonDistFiles(context)];
                case 7:
                    dists = _a.sent();
                    results = { dists: dists };
                    return [3, 10];
                case 8: return [4, _compile(context, cc)];
                case 9:
                    results = _a.sent();
                    _a.label = 10;
                case 10:
                    if (!(!process.env[bit_envs_common_isolate_1.DEBUG_FLAG] && !cc.dynamicConfig.useExperimentalCache)) return [3, 12];
                    return [4, context.capsule.destroy()];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12: return [2, results];
            }
        });
    });
}
exports.compile = compile;
function preCompile(context, preset) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2, preset.preCompile
                    ? Promise.all([createTSConfig(context), preset.preCompile(context)])
                    : createTSConfig(context)];
        });
    });
}
function _compile(context, cc) {
    return __awaiter(this, void 0, void 0, function () {
        var pathToTSC, _a, dists, nonCompiledDists, mainFile;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    pathToTSC = require.resolve('typescript/bin/tsc');
                    if (!!context.cc.dynamicConfig.useExperimentalCache) return [3, 2];
                    return [4, runNodeScriptInDir(context.directory, pathToTSC, ['-d'])];
                case 1:
                    _a = _b.sent();
                    return [3, 4];
                case 2: return [4, context.capsule.execNode(pathToTSC, ['-d'])];
                case 3:
                    _a = _b.sent();
                    _b.label = 4;
                case 4:
                    _a;
                    return [4, collectDistFiles(context)];
                case 5:
                    dists = _b.sent();
                    return [4, collectNonDistFiles(context)];
                case 6:
                    nonCompiledDists = _b.sent();
                    mainFile = findMainFile(context, dists);
                    return [2, { dists: dists.concat(nonCompiledDists), mainFile: mainFile }];
            }
        });
    });
}
function getNonCompiledFiles(files) {
    return files.filter(function (f) {
        return !f.basename.endsWith('ts') && !f.basename.endsWith('tsx');
    });
}
function findMainFile(context, dists) {
    var compDistRoot = path_1.default.resolve(context.directory, tsconfig_1.FIXED_OUT_DIR);
    var getNameOfFile = function (val, split) { return val.split(split)[0]; };
    var sourceFileName = getNameOfFile(context.main, '.ts');
    var pathPrefix = "" + compDistRoot + (compDistRoot.endsWith('/') ? '' : '/');
    var distMainFileExt = '.js';
    var res = dists.find(function (val) {
        if (!val.path.endsWith(distMainFileExt)) {
            return false;
        }
        var nameToCheck = getNameOfFile(val.path, distMainFileExt).split(pathPrefix)[1];
        return nameToCheck.endsWith(sourceFileName);
    });
    return (res || { relative: '' }).relative;
}
exports.findMainFile = findMainFile;
function createContext(res, directory, cc, srcTestFiles) {
    var componentObject = res.componentWithDependencies.component.toObject();
    return {
        main: componentObject.mainFile,
        dist: cc.context.rootDistDir,
        name: componentObject.name,
        capsule: res.capsule,
        directory: directory,
        res: res,
        cc: cc,
        srcTestFiles: srcTestFiles
    };
}
function getSrcTestFiles(files) {
    return files.filter(function (f) {
        return f.test === true;
    });
}
function runNodeScriptInDir(directory, scriptFile, args) {
    return __awaiter(this, void 0, void 0, function () {
        var result, cwd, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = null;
                    cwd = process.cwd();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    process.chdir(directory);
                    return [4, execa_1.default(scriptFile, args, { stdout: 1 })];
                case 2:
                    result = _a.sent();
                    return [3, 4];
                case 3:
                    e_1 = _a.sent();
                    process.chdir(cwd);
                    console.log();
                    throw e_1;
                case 4:
                    process.chdir(cwd);
                    return [2, result];
            }
        });
    });
}
function createTSConfig(context) {
    return __awaiter(this, void 0, void 0, function () {
        var configUserOverrides, content, pathToConfig;
        return __generator(this, function (_a) {
            configUserOverrides = context.cc.dynamicConfig.tsconfig;
            content = tsconfig_2.getTSConfig(false, configUserOverrides);
            pathToConfig = getTSConfigPath(context);
            return [2, fs.writeFile(pathToConfig, JSON.stringify(content, null, 4))];
        });
    });
}
function collectDistFiles(context) {
    return __awaiter(this, void 0, void 0, function () {
        var capsuleDir, compDistRoot, files, readFiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    capsuleDir = context.directory;
                    compDistRoot = path_1.default.resolve(capsuleDir, tsconfig_1.FIXED_OUT_DIR);
                    return [4, recursive_readdir_1.default(compDistRoot)];
                case 1:
                    files = _a.sent();
                    return [4, Promise.all(files.map(function (file) {
                            return fs.readFile(file);
                        }))];
                case 2:
                    readFiles = _a.sent();
                    return [2, files.map(function (file, index) {
                            var relativePath = path_1.default.relative(path_1.default.join(capsuleDir, tsconfig_1.FIXED_OUT_DIR), file);
                            var pathToFile = path_1.default.join(compDistRoot, relativePath);
                            var test = false;
                            if (getExt(relativePath) === 'js') {
                                test = isTestFile(context.srcTestFiles, relativePath, false);
                            }
                            return new vinyl_1.default({
                                path: pathToFile,
                                contents: readFiles[index],
                                base: compDistRoot,
                                test: test
                            });
                        })];
            }
        });
    });
}
exports.collectDistFiles = collectDistFiles;
function collectNonDistFiles(context) {
    return __awaiter(this, void 0, void 0, function () {
        var copyPolicy, capsuleDir, compDistRoot, ignoreFunction, fileList, readFiles, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    copyPolicy = context.cc.dynamicConfig.copyPolicy;
                    if (copyPolicy.disable) {
                        return [2, Promise.resolve([])];
                    }
                    capsuleDir = context.directory;
                    compDistRoot = path_1.default.resolve(capsuleDir, tsconfig_1.FIXED_OUT_DIR);
                    ignoreFunction = function (file, _stats) {
                        if (file.endsWith('.d.ts')) {
                            return false;
                        }
                        var defaultIgnore = ['node_modules/', tsconfig_1.FIXED_OUT_DIR, '.dependencies', '.ts'];
                        return defaultIgnore.concat(copyPolicy.ignorePatterns).reduce(function (prev, curr) {
                            return prev || !!~file.indexOf(curr);
                        }, false);
                    };
                    return [4, recursive_readdir_1.default(capsuleDir, ['*.tsx', ignoreFunction])];
                case 1:
                    fileList = _a.sent();
                    return [4, Promise.all(fileList.map(function (file) {
                            return fs.readFile(file);
                        }))];
                case 2:
                    readFiles = _a.sent();
                    list = fileList.map(function (file, index) {
                        var relativePath = path_1.default.relative(capsuleDir, file);
                        var pathToFile = path_1.default.join(compDistRoot, relativePath);
                        var test = false;
                        return new vinyl_1.default({
                            path: pathToFile,
                            contents: readFiles[index],
                            base: compDistRoot,
                            test: test
                        });
                    });
                    return [2, list];
            }
        });
    });
}
function getTSConfigPath(context) {
    return path_1.default.join(context.directory, 'tsconfig.json');
}
function getExt(filename) {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length);
}
function getWithoutExt(filename) {
    var ext = getExt(filename);
    if (ext === filename) {
        return filename;
    }
    return filename.substring(0, filename.length - ext.length - 1);
}
function isTestFile(srcTestFiles, fileToCheck, compareWithExtension) {
    if (compareWithExtension === void 0) { compareWithExtension = true; }
    var found = srcTestFiles.find(function (testFile) {
        if (compareWithExtension) {
            return testFile.relative === fileToCheck;
        }
        return getWithoutExt(testFile.relative).endsWith(getWithoutExt(fileToCheck));
    });
    return !!found;
}
function getCapsuleName(ctx) {
    var _a = ctx.context.componentObject, name = _a.name, version = _a.version;
    var componentInProjectId = md5_1.default("" + ctx.context.rootDistDir + name + version);
    var targetDir = path_1.default.join(os_1.default.tmpdir(), 'bit', componentInProjectId);
    return targetDir;
}
exports.getCapsuleName = getCapsuleName;
