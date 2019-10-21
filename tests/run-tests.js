// run-tests.js
// MIT licensed, see LICENSE file
// Copyright (c) 2013-2016 Olov Lassus <olov.lassus@gmail.com>

"use strict";

const assert = require("assert");
const ngAnnotate = require("../src/ng-annotate-main");
const fs = require("fs");
const os = require("os");
const diff = require("diff");
const SourceMapConsumer = require("source-map").SourceMapConsumer;
const coffee = require("coffee-script");
const convertSourceMap = require("convert-source-map");

// optionals
const ngAnnotateAdfPlugin = require("../src/optionals/angular-dashboard-framework.js");

function slurp(filename) {
    return String(fs.readFileSync(filename));
}

function time(name, fn) {
    const t0 = Date.now();
    fn();
    const t1 = Date.now();
    console.log(`  [${t1 - t0}ms] ${name}`);
}

function test(correct, got, name) {
    if (normalizeLineEndings(got) !== normalizeLineEndings(correct)) {
        const patch = diff.createPatch(name, correct, got);
        process.stderr.write(patch);
        process.exit(-1);
    }
}

function normalizeLineEndings(str) {
  return str.replace(/\r?\n/g, "\r\n");
}

function findLineColumn(content, index) {
    let line = 1;
    let col = 0;
    let i = 0;
    for (const ch of content) {
        if (i === index) {
            return {line, col};
        }
        if (ch === "\n") {
            line += 1;
            col = 0;
        } else {
            col += 1;
        }
        i += 1;
    }
    assert(index < content.length);
}

const renameOptions = [
    {"from": "$a", "to": "$aRenamed"},
    {"from": "$b", "to": "$bRenamed"},
    {"from": "$c", "to": "$cRenamed"},
    {"from": "$d", "to": "$dRenamed"},
    {"from": "$e", "to": "$eRenamed"},
    {"from": "$f", "to": "$fRenamed"},
    {"from": "$g", "to": "$gRenamed"},
    {"from": "$h", "to": "$hRenamed"},
    {"from": "$i", "to": "$iRenamed"},
];

function testSourcemap(original, got, sourcemap) {
    const smc = new SourceMapConsumer(sourcemap);

    function stringRegExp(commentText) {
        return new RegExp("\"" + commentText + "\"");
    }

    function functionRegExp(functionName) {
        return new RegExp("(function)?\\(" + functionName + "_param1, " + functionName + "_param2\\)")
    }

    function testMapping(needle) {
        const gotResult = needle.exec(got);
        if (gotResult == null) {
            process.stderr.write(`Couldn't find ${needle} in output source`);
            process.exit(-1);
        }

        const expectedResult = needle.exec(original);
        if (expectedResult == null) {
            process.stderr.write(`Couldn't find ${needle} in expected source`);
            process.exit(-1);
        }

        const gotPosition = findLineColumn(got, gotResult.index);
        const originalPosition = smc.originalPositionFor({ line: gotPosition.line, column: gotPosition.col });
        const expectedPosition = findLineColumn(original, expectedResult.index);

        if (originalPosition.line !== expectedPosition.line || originalPosition.column !== expectedPosition.col) {
            const expected = `(${expectedPosition.line},${expectedPosition.col})`;
            const got = `(${gotPosition.line},${gotPosition.col})`;
            const original = `(${originalPosition.line},${originalPosition.column})`;
            process.stderr.write(`Sourcemap mapping error for ${needle}. Expected: ${expected} => ${got}. Got: ${original} => ${got}.`);
            process.exit(-1);
        }
    }

    testMapping(stringRegExp("before"));
    for (let i = 1; i <= 4; i++) {
        testMapping(functionRegExp("ctrl" + i));
        testMapping(stringRegExp("ctrl" + i + " body"));
    }
    testMapping(stringRegExp("after"));
}

function run(ngAnnotate) {
    const original = slurp("tests/original.js");

    console.log("testing adding annotations");
    const annotated = ngAnnotate(original, {add: true}).src;
    test(slurp("tests/with_annotations.js"), annotated, "with_annotations.js");

    console.log("testing adding annotations with arrow functions");
    const arrowFunctions = slurp("tests/arrow-functions.js");
    const arrowFunctionsAnnotated = ngAnnotate(arrowFunctions, {add: true}).src;
    test(slurp("tests/arrow-functions.annotated.js"), arrowFunctionsAnnotated, "arrow-functions.annotated.js");

    const rename = slurp("tests/rename.js");

    console.log("testing adding annotations and renaming");
    const annotatedRenamed = ngAnnotate(rename, {
        add: true,
        rename: renameOptions,
    }).src;
    test(slurp("tests/rename.annotated.js"), annotatedRenamed, "rename.annotated.js");

    console.log("testing removing annotations");
    test(original, ngAnnotate(annotated, {remove: true}).src, "original.js");

    console.log("testing adding annotations twice");
    test(annotated, ngAnnotate(annotated, {add: true}).src, "with_annotations.js");

    console.log("testing rebuilding annotations");
    test(annotated, ngAnnotate(annotated, {add: true, remove: true}).src, "with_annotations.js");

    console.log("testing adding existing $inject annotations (no change)");
    test(slurp("tests/has_inject.js"), ngAnnotate(slurp("tests/has_inject.js"), {add: true}).src);

    console.log("testing removing existing $inject annotations");
    test(slurp("tests/has_inject_removed.js"), ngAnnotate(slurp("tests/has_inject.js"), {remove: true}).src);

    console.log("testing sourcemaps");
    const originalSourcemaps = slurp("tests/sourcemaps.coffee");
    const compiledSourcemaps = coffee.compile(originalSourcemaps, { sourceFiles: ["sourcemaps.coffee"], generatedFile: "sourcemaps.js", sourceMap: true });
    const annotatedSourcemaps = ngAnnotate(compiledSourcemaps.js, {remove: true, add: true, map: { sourceRoot: "/source/root/dir" }});
    test(slurp("tests/sourcemaps.annotated.js"), annotatedSourcemaps.src, "sourcemaps.annotated.js");
    testSourcemap(compiledSourcemaps.js, annotatedSourcemaps.src, annotatedSourcemaps.map);

    console.log("testing sourcemap combination");
    const inlinedCompiledSourcemaps = compiledSourcemaps.js +
        os.EOL +
        convertSourceMap.fromJSON(compiledSourcemaps.v3SourceMap).toComment();
    const combinedSourcemaps = ngAnnotate(inlinedCompiledSourcemaps, {remove: true, add: true, map: { inline: true, inFile: "sourcemaps.js", sourceRoot: "/source/root/dir" }});
    const combinedSourcemapsSrc = convertSourceMap.removeMapFileComments(combinedSourcemaps.src);
    const combinedSourcemapsMap = convertSourceMap.fromSource(combinedSourcemaps.src).toJSON();
    testSourcemap(originalSourcemaps, combinedSourcemapsSrc, combinedSourcemapsMap);

    const ngminOriginal = slurp("tests/ngmin-tests/ngmin_original.js");

    console.log("testing adding annotations (imported tests)");
    const ngminAnnotated = ngAnnotate(ngminOriginal, {add: true, regexp: "^myMod"}).src;
    test(slurp("tests/ngmin-tests/ngmin_with_annotations.js"), ngminAnnotated, "ngmin_with_annotations.js");

    console.log("testing removing annotations (imported tests)");
    test(ngminOriginal, ngAnnotate(ngminAnnotated, {remove: true, regexp: "^myMod"}).src, "ngmin_original.js");

    // TODO generic test-runner code for finding and testing all optionals automatically
    // optionals angular-dashboard-framework adding annotations
    console.log("testing optionals/angular-dashboard-framework.js (adding annotations)");
    const adf = slurp("tests/optionals/angular-dashboard-framework.js");
    const adfAnnotated = ngAnnotate(adf, {add: true, plugin: [ngAnnotateAdfPlugin]}).src;
    test(slurp("tests/optionals/angular-dashboard-framework.annotated.js"), adfAnnotated, "optionals/angular-dashboard-framework.annotated.js");

    // optionals angular-dashboard-framework removing annotations
    console.log("testing optionals/angular-dashboard-framework.js (removing annotations)");
    test(adf, ngAnnotate(adfAnnotated, {remove: true, plugin: [ngAnnotateAdfPlugin]}).src, "optionals/angular-dashboard-framework.js");

    // issue #3 (ng-annotate-patched) - Support for ES6 Classes
    console.log("testing es6 classes");
    const es6Classes = slurp("tests/es6-classes.js");
    const es6ClassesAnnotated = ngAnnotate(es6Classes, {add: true}).src;
    test(slurp("tests/es6-classes.annotated.js"), es6ClassesAnnotated, "tests/es6-classes.annotated.js");

    console.log("testing performance");
    const ng1 = String(fs.readFileSync("tests/angular.js"));
    // const ng5 = ng1 + ng1 + ng1 + ng1 + ng1;

    time("ng1", function() { ngAnnotate(ng1, {add: true}) });
    time("ng1 with sourcemaps", function() { ngAnnotate(ng1, {add: true, map: true}) });
    //time("  ng5 processed in {0} ms", function() { ngAnnotate(ng5, {add: true}) });
    //time("  ng5 processed with sourcemaps in {0} ms", function() { ngAnnotate(ng5, {add: true, map: true}) });

    console.log("all ok");
}

run(ngAnnotate);
