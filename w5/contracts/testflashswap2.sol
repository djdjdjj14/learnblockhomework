// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IUniswapv2.sol";
import "./interfaces/ISwapRouter.sol";

interface IUniswapV2Callee {
  function uniswapV2Call(
    address sender,
    uint amount0,
    uint amount1,
    bytes calldata data
  ) external;
}

contract TestUniswapFlashSwap is IUniswapV2Callee {
  // Uniswap V2 router
  // 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
  address private constant atoken = 0x49c4441b010F6dBB321E4fd2C24E866FD187b93C;
  address private constant btoken = 0x561aAfE447cCb7Ace2E71E85Ef7F36695f215a27;
  // Uniswap V2 factory
  address private constant FACTORY = 0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
  address private constant V3Router = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
  address private constant V2Router = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;
  //event Log(string message, uint val);

  function testFlashSwap(address _tokenBorrow, uint _amount) external {
    IERC20(_tokenBorrow).transferFrom(msg.sender,address(this),_amount);
    address pair = IUniswapV2Factory(FACTORY).getPair(atoken, btoken);
    require(pair != address(0), "!pair");

    address token0 = IUniswapV2Pair(pair).token0();
    address token1 = IUniswapV2Pair(pair).token1();
    uint amount0Out = _tokenBorrow == token0 ? _amount : 0;
    uint amount1Out = _tokenBorrow == token1 ? _amount : 0;

    // need to pass some data to trigger uniswapV2Call
    bytes memory data = abi.encode(_tokenBorrow, _amount);

    IUniswapV2Pair(pair).swap(amount0Out, amount1Out, address(this), data);
  }

  // called by pair contract
  function uniswapV2Call(
    address _sender,
    uint _amount0,
    uint _amount1,
    bytes calldata _data
  ) external override {
    address token0 = IUniswapV2Pair(msg.sender).token0();
    address token1 = IUniswapV2Pair(msg.sender).token1();
    address pair = IUniswapV2Factory(FACTORY).getPair(token0, token1);
    require(msg.sender == pair, "!pair");
    require(_sender == address(this), "!sender");

    (address tokenBorrow, uint amount) = abi.decode(_data, (address, uint));

    // about 0.3%
    uint fee = ((amount * 3) / 997) + 1;
    uint amountToRepay = amount + fee;

    // do stuff here

    address tokenIn = atoken;
    address tokenOut = btoken;
    uint24 fee = 3000;
    address recipient = msg.sender;
    uint256 deadline = block.timestamp+15;
    uint256 amountIn = amount;
    uint256 amountOutMinimum = 0;
    uint160 sqrtPriceLimitX96 = 0;

    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams(
        tokenIn,
        tokenOut,
        fee,
        recipient,
        deadline,
        amountIn,
        amountOutMinimum,
        sqrtPriceLimitX96
    );

    ISwapRouter(V3Router).exactInputSingle(params);//v3换

    address[] memory path = new address[](2);
    path[0] = btoken;
    path[1] = atoken;

    uint btokennow = IERC20(btoken).balanceOf(address(this));
    IUniswapV2Router(V2Router).swapExactTokensForTokens(btokennow, 0, path, address(this), deadline);//v2换

    uint atoeknnow = IERC20(atoken).balanceOf(address(this));
    require(atoeknnow > amountToRepay);//有利可图

    IERC20(tokenBorrow).transfer(pair, amountToRepay);
  }
}