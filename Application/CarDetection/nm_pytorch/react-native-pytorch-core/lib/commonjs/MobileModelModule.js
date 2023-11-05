"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MobileModel = void 0;

var _reactNative = require("react-native");

var _Models = require("./Models");

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
const {
  PyTorchCoreMobileModelModule: MobileModelModule,
  PyTorchCoreModelLoaderModule: ModelLoaderModule
} = _reactNative.NativeModules;
const MobileModel = {
  async download(modelPath) {
    const uri = (0, _Models.getModelUri)(modelPath);
    return await ModelLoaderModule.download(uri);
  },

  async preload(modelPath) {
    const uri = (0, _Models.getModelUri)(modelPath);
    return await MobileModelModule.preload(uri);
  },

  async unload() {
    return await MobileModelModule.unload();
  },

  async execute(modelPath, params) {
    const uri = (0, _Models.getModelUri)(modelPath);
    return await MobileModelModule.execute(uri, params);
  }

};
exports.MobileModel = MobileModel;
//# sourceMappingURL=MobileModelModule.js.map