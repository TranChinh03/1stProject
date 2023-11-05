"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProjectRepositories = setProjectRepositories;
exports.setClassPath = setClassPath;
exports.default = void 0;

var _configPlugins = require("@expo/config-plugins");

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// Keeping the name, and version in sync with it's package.
const pkg = require('react-native-pytorch-core/package.json');

const withPyTorch = (config, _props = {}) => {
  config = (0, _configPlugins.withProjectBuildGradle)(config, innerConfig => {
    if (innerConfig.modResults.language === 'groovy') {
      innerConfig.modResults.contents = setProjectRepositories(innerConfig, innerConfig.modResults.contents);
    }

    return innerConfig;
  });
  config = (0, _configPlugins.withAppBuildGradle)(config, innerConfig => {
    if (innerConfig.modResults.language === 'groovy') {
      innerConfig.modResults.contents = setClassPath(innerConfig, innerConfig.modResults.contents);
    }

    return innerConfig;
  });
  return config;
};

function setProjectRepositories(_config, buildGradle) {
  const finalBuildGradle = buildGradle.replace(/allprojects\s*?{\n\s*?repositories\s*?{/, `allprojects {
    repositories {
        maven {
          url("https://oss.sonatype.org/content/repositories/snapshots")
        }
        `);
  return finalBuildGradle;
}
/**
 * Adding the Google Services plugin
 * NOTE(brentvatne): string replacement is a fragile approach! we need a
 * better solution than this.
 */


function setClassPath(_config, buildGradle) {
  buildGradle = buildGradle.replace(/android\s?{/, `android {
    /**
     * Without the packaging options, it will result in the following build error:
     *
     * * What went wrong:
     * Execution failed for task ':app:mergeDebugNativeLibs'.
     * > A failure occurred while executing com.android.build.gradle.internal.tasks.Workers$ActionFacade
     *    > More than one file was found with OS independent path 'lib/x86/libfbjni.so'
     */
    packagingOptions {
        pickFirst '**/*.so'
    }
`); //

  const finalBuildGradle = buildGradle.replace(/dependencies\s?{/, `dependencies {
    implementation 'org.pytorch:pytorch_android_lite:1.10.0'
    implementation 'org.pytorch:pytorch_android_torchvision_lite:1.10.0'
`);
  return finalBuildGradle;
} // A helper method that wraps `withRunOnce` and appends items to `pluginHistory`.


var _default = (0, _configPlugins.createRunOncePlugin)( // The plugin to guard.
withPyTorch, // An identifier used to track if the plugin has already been run.
pkg.name, // Optional version property, if omitted, defaults to UNVERSIONED.
pkg.version);

exports.default = _default;
//# sourceMappingURL=withPyTorchCore.js.map