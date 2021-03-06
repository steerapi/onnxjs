// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import {FLOAT_TYPES, NUMBER_TYPES} from '../../operators';
import {OpSet} from '../../opset';

import {CpuArgMax} from './ops/argMax';
import {CpuBatchNormalization} from './ops/batch-normalization';
import {CpuBinaryOp} from './ops/binary-op';
import {CpuConcat} from './ops/concat';
import {CpuConv} from './ops/conv';
import {CpuDropout} from './ops/dropout';
import {CpuFlatten} from './ops/flatten';
import {CpuGather} from './ops/gather';
import {CpuGemm} from './ops/gemm';
import {CpuImageScaler} from './ops/image-scaler';
import {CpuInstanceNormalization} from './ops/instance-normalization';
import {CpuLrn} from './ops/lrn';
import {CpuMatMul} from './ops/matmul';
import {CpuPad} from './ops/pad';
import {CpuAveragePool, CpuGlobalAveragePool, CpuGlobalMaxPool, CpuMaxPool} from './ops/pool';
import * as cpuReduce from './ops/reduce';
import {CpuReshape} from './ops/reshape';
import {CpuSlice, CpuSliceV10} from './ops/slice';
import {CpuSoftmax} from './ops/softmax';
import {CpuSqueeze} from './ops/squeeze';
import {CpuSum} from './ops/sum';
import {CpuTile} from './ops/tile';
import {CpuTranspose} from './ops/transpose';
import * as unaryOps from './ops/unary-op';
import {CpuUnaryOp} from './ops/unary-op';
import {CpuUnsqueeze} from './ops/unsqueeze';

export const CPU_OP_RESOLVE_RULES: ReadonlyArray<OpSet.ResolveRule> = [
  ['Abs', '', '6+', () => new CpuUnaryOp(NUMBER_TYPES, unaryOps.abs)],
  ['Acos', '', '7+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.acos)],
  ['Acosh', '', '9+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.acosh)],
  ['Add', '', '7+', () => new CpuBinaryOp(NUMBER_TYPES, (e1, e2) => (e1 + e2))],
  ['And', '', '7+', () => new CpuBinaryOp(['bool'], (e1, e2) => (e1 && e2))],
  ['ArgMax', '', '1+', () => new CpuArgMax()],
  ['Asin', '', '7+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.asin)],
  ['Asinh', '', '9+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.asinh)],
  ['Atan', '', '7+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.atan)],
  ['Atanh', '', '9+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.atanh)],
  ['AveragePool', '', '7+', () => new CpuAveragePool()],  // TODO: support new attributes for AveragePool-10
  ['BatchNormalization', '', '7+', () => new CpuBatchNormalization()],
  ['Ceil', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.ceil)],
  ['Clip', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.clip, unaryOps.clipInitializer)],
  ['Concat', '', '4+', () => new CpuConcat()],
  ['Conv', '', '1+', () => new CpuConv()],
  ['Cos', '', '7+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.cos)],
  ['Cosh', '', '9+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.cosh)],
  ['Div', '', '7+', () => new CpuBinaryOp(NUMBER_TYPES, (e1, e2) => (e1 / e2))],
  ['Dropout', '', '7+', () => new CpuDropout()],
  ['Elu', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.elu, unaryOps.eluInitializer)],
  ['Exp', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.exp)],
  ['Flatten', '', '1+', () => new CpuFlatten()],
  ['Floor', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.floor)],
  ['Gather', '', '1+', () => new CpuGather()],
  ['Gemm', '', '7+', () => new CpuGemm()],
  ['GlobalAveragePool', '', '1+', () => new CpuGlobalAveragePool()],
  ['GlobalMaxPool', '', '1+', () => new CpuGlobalMaxPool()],
  ['ImageScaler', '', '1+', () => new CpuImageScaler()],
  ['InstanceNormalization', '', '6+', () => new CpuInstanceNormalization()],
  ['IsNaN', '', '9+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.isNan, undefined, 'bool')],
  ['LeakyRelu', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.leakyRelu, unaryOps.leakyReluInitializer)],
  ['Log', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.log)],
  ['LRN', '', '1+', () => new CpuLrn()],
  ['MatMul', '', '1+', () => new CpuMatMul()],
  ['MaxPool', '', '1+', () => new CpuMaxPool()],  // TODO: support new attributes for MaxPool-8 and MaxPool-10
  ['Mul', '', '7+', () => new CpuBinaryOp(NUMBER_TYPES, (e1, e2) => (e1 * e2))],
  ['Neg', '', '6+', () => new CpuUnaryOp(NUMBER_TYPES, unaryOps.neg)],
  ['Not', '', '1+', () => new CpuUnaryOp(['bool'], unaryOps.not, undefined, 'bool')],
  ['Or', '', '7+', () => new CpuBinaryOp(['bool'], (e1, e2) => (e1 || e2))],
  ['PRelu', '', '7+', () => new CpuBinaryOp(NUMBER_TYPES, (e1, e2) => (e1 >= 0 ? e1 : e1 * e2))],
  ['Pad', '', '7+', () => new CpuPad()],
  ['Reciprocal', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.reciprocal)],
  ['ReduceLogSum', '', '1+', () => new cpuReduce.CpuReduceLogSum()],
  ['ReduceMax', '', '1+', () => new cpuReduce.CpuReduceMax()],
  ['ReduceMean', '', '1+', () => new cpuReduce.CpuReduceMean()],
  ['ReduceMin', '', '1+', () => new cpuReduce.CpuReduceMin()],
  ['ReduceProd', '', '1+', () => new cpuReduce.CpuReduceProd()],
  ['ReduceSum', '', '1+', () => new cpuReduce.CpuReduceSum()],
  ['ReduceSumSquare', '', '1+', () => new cpuReduce.CpuReduceSumSquare()],
  ['Relu', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.relu)],
  ['Reshape', '', '5+', () => new CpuReshape()],
  ['Sigmoid', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.sigmoid)],
  ['Sign', '', '9+', () => new CpuUnaryOp(NUMBER_TYPES, unaryOps.sign)],
  ['Sin', '', '7+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.sin)],
  ['Sinh', '', '9+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.sinh)],
  ['Slice', '', '10+', () => new CpuSliceV10()],  // TODO: support 'steps' for Slice-10
  ['Slice', '', '1-9', () => new CpuSlice()],
  ['Softmax', '', '1+', () => new CpuSoftmax()],
  ['Sqrt', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.sqrt)],
  ['Squeeze', '', '1+', () => new CpuSqueeze()],
  ['Sub', '', '7+', () => new CpuBinaryOp(NUMBER_TYPES, (e1, e2) => (e1 - e2))],
  ['Sum', '', '6+', () => new CpuSum()],  // TODO: support multidirectional broadcast for Sum-8
  ['Tan', '', '7+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.tan)],
  ['Tanh', '', '6+', () => new CpuUnaryOp(FLOAT_TYPES, unaryOps.tanh)],
  ['Tile', '', '6+', () => new CpuTile()],
  ['Transpose', '', '1+', () => new CpuTranspose()],
  ['Unsqueeze', '', '1+', () => new CpuUnsqueeze()],
  ['Xor', '', '7+', () => new CpuBinaryOp(['bool'], (e1, e2) => (e1 ^ e2))],
];
