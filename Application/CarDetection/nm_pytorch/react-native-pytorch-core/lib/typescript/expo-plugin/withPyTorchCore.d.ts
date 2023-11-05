/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ConfigPlugin, ExportedConfigWithProps } from '@expo/config-plugins';
declare type Props = {};
export declare function setProjectRepositories(_config: Pick<ExportedConfigWithProps, 'android'>, buildGradle: string): string;
/**
 * Adding the Google Services plugin
 * NOTE(brentvatne): string replacement is a fragile approach! we need a
 * better solution than this.
 */
export declare function setClassPath(_config: Pick<ExportedConfigWithProps, 'android'>, buildGradle: string): string;
declare const _default: ConfigPlugin<Props>;
export default _default;
