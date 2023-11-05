/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { Image as RNImage, NativeModules } from 'react-native';
import { toPlainNativeJSRef } from './NativeJSRef';
const {
  resolveAssetSource
} = RNImage;
const {
  PyTorchCoreImageModule: ImageModule
} = NativeModules;
/**
 * An image is a high-level data type, which can be used for model inference
 * with [[MobileModel.execute]] or it can be drawn on a [[Canvas.drawImage]].
 *
 * An [[Image]] object in JavaScript is a reference to a native image object
 * wrapped in [[NativeJSRef]]. The image data is not transferred over the React
 * Native Bridge, but it offers functions to manipulate the image. All
 * functions are executed `async` in native.
 *
 * :::info
 *
 * Eventually, this will change with the introduction of the new React Native
 * architecture including JSI, Fabric, and TurboModules.
 *
 * :::
 */

export const wrapRef = ref => ({ ...ref,

  getWidth() {
    return ImageModule.getWidth(ref);
  },

  getHeight() {
    return ImageModule.getHeight(ref);
  },

  getNaturalWidth() {
    return ImageModule.getNaturalWidth(ref);
  },

  getNaturalHeight() {
    return ImageModule.getNaturalHeight(ref);
  },

  getPixelDensity() {
    return ImageModule.getPixelDensity(ref);
  },

  async scale(sx, sy) {
    const scaledRef = await ImageModule.scale(ref, sx, sy);
    return wrapRef(scaledRef);
  },

  async release() {
    return await ImageModule.release(ref);
  }

});
const IMAGE_PATH_CACHE = {};

const getImageAssetSource = imagePath => {
  let source = IMAGE_PATH_CACHE[imagePath];

  if (source == null) {
    source = resolveAssetSource(imagePath);
    IMAGE_PATH_CACHE[imagePath] = source;
  }

  return source;
};
/**
 * The [[ImageUtil]] object provides functions to load an [[Image]] either from
 * a URL or load an image that is bundled with the React Native app bundle. The
 * returned Image object can the then be used to run model inference or it can
 * be drawn on a canvas.
 */


export const ImageUtil = {
  /**
   * The `fromBundle` function loads an [[Image]] that is bundled with the
   * React Native app bundle. The function param is a `require` with a relative
   * path (the path is relative to the file that contains the
   * [[ImageUtils.fromBundle]] call). Be aware that the
   * [[ImageUtils.fromBundle]] function is an `async` function and needs to be
   * `await`ed to access the loaded image.
   *
   * @param imagePath The image path (i.e., a `require`).
   * @returns A promise resolving into an [[Image]].
   */
  async fromBundle(imagePath) {
    const source = getImageAssetSource(imagePath);
    const ref = await ImageModule.fromBundle(source);
    return wrapRef(ref);
  },

  /**
   * The `fromFile` function loads an [[Image]] at the filepath (e.g., stored
   * on the file system).
   *
   * ```typescript
   * const image: Image = await ImageUtils.fromFile('/data/0/pytorch/image.png');
   * ```
   *
   * @param path The file path to the image.
   * @returns A promise resolving into an [[Image]].
   */
  async fromFile(path) {
    const ref = await ImageModule.fromFile(path);
    return wrapRef(ref);
  },

  /**
   * Transforms an [[ImageData]] into an [[Image]] object.
   *
   * @param imageData The ImageData that will be transformed into an [[Image]].
   * @returns A promise resolving into an [[Image]].
   */
  async fromImageData(imageData) {
    // Only send NativeJSRef ID to native and omit other fields
    const imageDataRef = {
      ID: imageData.ID
    };
    const ref = await ImageModule.fromImageData(imageDataRef, true);
    return wrapRef(ref);
  },

  /**
   * The `fromJSRef` function returns an [[Image]] by wrapping a [[NativeJSRef]]
   * object.
   *
   * Example of a [[NativeJSRef]] for a non-serializable object like an image:
   *
   * ```javascript
   * {ID:"5AD79901-C651-4994-9C99-23B23216B8F4"}
   * ```
   *
   * ```typescript
   * const {result: {image: imageRef}} = MobileModel.execute<ImageToImageResult>(model, {image});
   * const wrappedImage: Image = await ImageUtil.fromJSRef(imageRef);
   * // do something with wrappedImage
   * wrappedImage.release();
   * ```
   *
   * @param imageRef The Native JS Object Reference ID of the image. You usually get those from image to image models.
   * @returns an [[Image]].
   **/
  fromJSRef(imageRef) {
    return wrapRef(imageRef);
  },

  /**
   * The `fromURL` function loads an [[Image]] from a URL. Be aware that the
   * `fromURL` function is an `async` function and needs to be `await`ed to
   * access the loaded image.
   *
   * ```typescript
   * const image: Image = await ImageUtils.fromURL('https://image.url');
   * ```
   *
   * @param url The image url.
   * @returns A promise resolving into an [[Image]].
   */
  async fromURL(url) {
    const ref = await ImageModule.fromURL(url);
    return wrapRef(ref);
  },

  /**
   * Releases am image and ultimately frees memory.
   *
   * @param image Image that will be released.
   */
  async release(image) {
    return await ImageModule.release(image);
  },

  /**
   * Saves an image to a file.
   *
   * ```typescript
   * const path: string = ImageUtils.toFile(image);
   * ```
   *
   * @param image Image to save.
   * @returns path Path to image file.
   */
  async toFile(image) {
    // TODO(T122223365) Temporary solution to make the toFile function work
    // with either NativeJSRef images or true native images (see IImage.h).
    //
    // Without this reassignment of just the image ID, the bridge will
    // eventually throw an error because it can't serialize the the native
    // image.
    //
    // {@link https://github.com/pytorch/live/blob/main/react-native-pytorch-core/cxx/src/torchlive/media/image/IImage.h#L15}
    const imageRef = toPlainNativeJSRef(image);
    return await ImageModule.toFile(imageRef);
  }

};
//# sourceMappingURL=ImageModule.js.map