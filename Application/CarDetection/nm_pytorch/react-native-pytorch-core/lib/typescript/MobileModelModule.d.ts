/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
import { ModelPath } from './Models';
export interface ModelResultMetrics {
    /**
     * The pack time, model inference time, and unpack time in milliseconds.
     */
    totalTime: number;
    /**
     * The model inference time in milliseconds.
     */
    inferenceTime: number;
    /**
     * The pack time in milliseconds.
     */
    packTime: number;
    /**
     * The unpack time in milliseconds.
     */
    unpackTime: number;
}
/**
 * Result of model inference. Each model result has the inference time and the
 * model result. The model result depends on the model and is therefore
 * specified as a generic type (i.e., template).
 *
 * @template T Model result type
 */
export interface ModelResult<T> {
    /**
     * The model result.
     */
    result: T;
    /**
     * The model result metrics, e.g., including inference time in milliseconds.
     */
    metrics: ModelResultMetrics;
}
/**
 * @packageDocumentation
 *
 * The `MobileModel` is the core module providing functions to run model
 * inference and preload models.
 */
export interface MobileModel {
    /**
     * Download a model to the local file system and return the local file path
     * as a model. If the model path is a file path already, it will return the
     * same path as a result.
     *
     * @param modelPath The model path as require or uri (i.e., `require`).
     */
    download(modelPath: ModelPath): Promise<string>;
    /**
     * Preload a model. If a model is not preloaded, it will be loaded during the
     * first inference call. However, the first inference time will therefore
     * take significantly longer. This function allows to preload a model ahead
     * of time before running the first inference.
     *
     * @param modelPath The model path as require or uri (i.e., `require`).
     */
    preload(modelPath: ModelPath): Promise<void>;
    /**
     * Unload all model. If any model were loaded previously, they will be discarded.
     * This function allows to load a new version of a model without restarting the
     * app.
     */
    unload(): Promise<void>;
    /**
     * Run inference on a model.
     *
     * ```typescript
     * const classificationModel = require('../models/mobilenet_v3_small.ptl');
     *
     * // or
     *
     * const classificationModel = require('https://example.com/models/mobilenet_v3_small.ptl');
     *
     * const image: Image = await ImageUtils.fromURL('https://image.url');
     *
     * const { result: {maxIdx} } = await MobileModel.execute(
     *   classificationModel,
     *   {
     *     image,
     *   }
     * );
     *
     * const topClass = ImageClasses(scores);
     * ```
     *
     * @param modelPath The model path as require or uri (i.e., `require`).
     * @param params The input parameters for the model.
     */
    execute<T>(modelPath: ModelPath, params: any): Promise<ModelResult<T>>;
}
export declare const MobileModel: MobileModel;
