/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
} from "ethers";
import {
  Contract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "@ethersproject/contracts";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";

interface IQuoterV2Interface extends ethers.utils.Interface {
  functions: {
    "quoteExactInput(bytes,uint256)": FunctionFragment;
    "quoteExactInputSingle(tuple)": FunctionFragment;
    "quoteExactOutput(bytes,uint256)": FunctionFragment;
    "quoteExactOutputSingle(tuple)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "quoteExactInput",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteExactInputSingle",
    values: [
      {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      }
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteExactOutput",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "quoteExactOutputSingle",
    values: [
      {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      }
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "quoteExactInput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteExactInputSingle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteExactOutput",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "quoteExactOutputSingle",
    data: BytesLike
  ): Result;

  events: {};
}

export class IQuoterV2 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  on(event: EventFilter | string, listener: Listener): this;
  once(event: EventFilter | string, listener: Listener): this;
  addListener(eventName: EventFilter | string, listener: Listener): this;
  removeAllListeners(eventName: EventFilter | string): this;
  removeListener(eventName: any, listener: Listener): this;

  interface: IQuoterV2Interface;

  functions: {
    quoteExactInput(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "quoteExactInput(bytes,uint256)"(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    quoteExactInputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "quoteExactInputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    quoteExactOutput(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "quoteExactOutput(bytes,uint256)"(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    quoteExactOutputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;

    "quoteExactOutputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<ContractTransaction>;
  };

  quoteExactInput(
    path: BytesLike,
    amountIn: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "quoteExactInput(bytes,uint256)"(
    path: BytesLike,
    amountIn: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  quoteExactInputSingle(
    params: {
      tokenIn: string;
      tokenOut: string;
      amountIn: BigNumberish;
      fee: BigNumberish;
      sqrtPriceLimitX96: BigNumberish;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "quoteExactInputSingle((address,address,uint256,uint24,uint160))"(
    params: {
      tokenIn: string;
      tokenOut: string;
      amountIn: BigNumberish;
      fee: BigNumberish;
      sqrtPriceLimitX96: BigNumberish;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  quoteExactOutput(
    path: BytesLike,
    amountOut: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "quoteExactOutput(bytes,uint256)"(
    path: BytesLike,
    amountOut: BigNumberish,
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  quoteExactOutputSingle(
    params: {
      tokenIn: string;
      tokenOut: string;
      amount: BigNumberish;
      fee: BigNumberish;
      sqrtPriceLimitX96: BigNumberish;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  "quoteExactOutputSingle((address,address,uint256,uint24,uint160))"(
    params: {
      tokenIn: string;
      tokenOut: string;
      amount: BigNumberish;
      fee: BigNumberish;
      sqrtPriceLimitX96: BigNumberish;
    },
    overrides?: Overrides
  ): Promise<ContractTransaction>;

  callStatic: {
    quoteExactInput(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      amountOut: BigNumber;
      sqrtPriceX96AfterList: BigNumber[];
      initializedTicksCrossedList: number[];
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber[];
      2: number[];
      3: BigNumber;
    }>;

    "quoteExactInput(bytes,uint256)"(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      amountOut: BigNumber;
      sqrtPriceX96AfterList: BigNumber[];
      initializedTicksCrossedList: number[];
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber[];
      2: number[];
      3: BigNumber;
    }>;

    quoteExactInputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<{
      amountOut: BigNumber;
      sqrtPriceX96After: BigNumber;
      initializedTicksCrossed: number;
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: number;
      3: BigNumber;
    }>;

    "quoteExactInputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<{
      amountOut: BigNumber;
      sqrtPriceX96After: BigNumber;
      initializedTicksCrossed: number;
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: number;
      3: BigNumber;
    }>;

    quoteExactOutput(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      amountIn: BigNumber;
      sqrtPriceX96AfterList: BigNumber[];
      initializedTicksCrossedList: number[];
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber[];
      2: number[];
      3: BigNumber;
    }>;

    "quoteExactOutput(bytes,uint256)"(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: CallOverrides
    ): Promise<{
      amountIn: BigNumber;
      sqrtPriceX96AfterList: BigNumber[];
      initializedTicksCrossedList: number[];
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber[];
      2: number[];
      3: BigNumber;
    }>;

    quoteExactOutputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<{
      amountIn: BigNumber;
      sqrtPriceX96After: BigNumber;
      initializedTicksCrossed: number;
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: number;
      3: BigNumber;
    }>;

    "quoteExactOutputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: CallOverrides
    ): Promise<{
      amountIn: BigNumber;
      sqrtPriceX96After: BigNumber;
      initializedTicksCrossed: number;
      gasEstimate: BigNumber;
      0: BigNumber;
      1: BigNumber;
      2: number;
      3: BigNumber;
    }>;
  };

  filters: {};

  estimateGas: {
    quoteExactInput(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "quoteExactInput(bytes,uint256)"(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    quoteExactInputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "quoteExactInputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    quoteExactOutput(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    "quoteExactOutput(bytes,uint256)"(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: Overrides
    ): Promise<BigNumber>;

    quoteExactOutputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;

    "quoteExactOutputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    quoteExactInput(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "quoteExactInput(bytes,uint256)"(
      path: BytesLike,
      amountIn: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    quoteExactInputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "quoteExactInputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amountIn: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    quoteExactOutput(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "quoteExactOutput(bytes,uint256)"(
      path: BytesLike,
      amountOut: BigNumberish,
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    quoteExactOutputSingle(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;

    "quoteExactOutputSingle((address,address,uint256,uint24,uint160))"(
      params: {
        tokenIn: string;
        tokenOut: string;
        amount: BigNumberish;
        fee: BigNumberish;
        sqrtPriceLimitX96: BigNumberish;
      },
      overrides?: Overrides
    ): Promise<PopulatedTransaction>;
  };
}
