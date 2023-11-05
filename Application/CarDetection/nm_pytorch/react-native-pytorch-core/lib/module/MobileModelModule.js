/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { NativeModules } from 'react-native';
import { getModelUri } from './Models';
const {
  PyTorchCoreMobileModelModule: MobileModelModule,
  PyTorchCoreModelLoaderModule: ModelLoaderModule
} = NativeModules;
export const MobileModel = {
  async download(modelPath) {
    const uri = getModelUri(modelPath);
    return await ModelLoaderModule.download(uri);
  },

  async preload(modelPath) {
    const uri = getModelUri(modelPath);
    return await MobileModelModule.preload(uri);
  },

  async unload() {
    return await MobileModelModule.unload();
  },

  async execute(modelPath, params) {
    const uri = getModelUri(modelPath);
    return await MobileModelModule.execute(uri, params);
  }

};
//# sourceMappingURL=MobileModelModule.js.map