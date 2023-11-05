"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModelUri = getModelUri;

var _reactNative = require("react-native");

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
const {
  resolveAssetSource
} = _reactNative.Image;
/**
 * An ML model can be loaded from three different sources, and must be one of
 * the following options:
 *
 * * url to a model file (e.g., https://example.com/my_model.ptl)
 * * path to a local model file (e.g., /data/0/some/path/my_model.ptl)
 * * a path in the JavaScript bundle (e.g., `require('./my_model.ptl')`)
 */

/**
 * Cache for previously resolved model paths (i.e., asset sources).
 */
const MODEL_PATH_CACHE = {};
/**
 * Resolves the model asset source. It will first try to find the asset source
 * in the cache if it was previously resolved, otherwise it will use the
 * `resolveAssetSource` provided by the React Native [[Image]].
 *
 * @param modelPath The model path (i.e., a `require`).
 */

function getModelAssetSource(modelPath) {
  let source = MODEL_PATH_CACHE[modelPath];

  if (source == null) {
    source = resolveAssetSource(modelPath);
    MODEL_PATH_CACHE[modelPath] = source;
  }

  return source;
}
/**
 * Checks if the passed in model path is a string or a resolvable asset source.
 * In case the path is a string it will be used as a URI. If it is a resolvable
 * asset source, it will resolve the asset source and get its URI.
 *
 * @param modelPath The model path as require or uri (i.e., `require`).
 * @returns A URI to resolve the model.
 */


function getModelUri(modelPath) {
  if (typeof modelPath === 'string') {
    return modelPath;
  } else {
    const source = getModelAssetSource(modelPath);
    return source.uri;
  }
}
//# sourceMappingURL=Models.js.map