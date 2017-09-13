// traverse.js
// MIT licensed, see LICENSE file

const walk = require("acorn/dist/walk");

module.exports = function traverse(rootNode, options) {
    const ancestors = [];
    (function c(node, st, override) {
        const parent = ancestors[ancestors.length - 1];
        const isNew = node !== parent;
        if (options.pre && isNew) options.pre(node, parent);
        if (isNew) ancestors.push(node);
        walk.base[override || node.type](node, st, c);
        if (isNew) ancestors.pop();
        if (options.post && isNew) options.post(node, parent);
    })(rootNode);
};
