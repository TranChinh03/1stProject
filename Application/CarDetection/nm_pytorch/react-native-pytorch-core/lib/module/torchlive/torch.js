/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */
// Allows tensor data with arbitrary dimensions

/**
 * TypedArray type to allow index-based access to tensor data.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray}
 *
 * The type should preferrably be `ArrayBufferView`. However, that type includes
 * `DataView`, which itself is not indexable.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ArrayBufferView}
 *
 * A valid TypeScript expression is as follows:
 *
 * ```
 * torch.rand([2, 3]).data[3];
 * ```
 */

/**
 * The [[ModuleValue]] type is a convenient type representative of all possible
 * module output values.
 */

/**
 * The [[IValue]] type is a type representative of all supported
 * input types to [[Module]] forward function.
 */

/**
 * A [[Dtype]] is an object that represents the data type of a [[Tensor]].
 *
 * :::note
 *
 * The `int64` (a.k.a. `long`) data types are not fully supported in React Native.
 * For now, use `.to({dtype: torch.int32})` to downcast before accessing such
 * methods as `.data()` and `.item()`.
 *
 * :::
 *
 * {@link https://pytorch.org/docs/1.11/tensor_attributes.html#torch-dtype}
 */

/**
 * A [[MemoryFormat]] is an object representing the memory format on which a [[Tensor]] is or will be allocated.
 *
 * {@link https://pytorch.org/docs/1.11/tensor_attributes.html#torch.torch.memory_format}
 */
// Adopt the notion of a Scalar
export const torch = __torchlive__.torch;
//# sourceMappingURL=torch.js.map