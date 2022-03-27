// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./interfaces/aave/FlashLoanReceiverBase.sol";
import "./interfaces/IUniswapv2.sol";
import "./interfaces/ISwapRouter.sol";

contract TestAaveFlashLoan is FlashLoanReceiverBase {
  using SafeMath for uint;

  address private constant btoken = 0x561aAfE447cCb7Ace2E71E85Ef7F36695f215a27;
  address private constant V3Router = 0xE592427A0AEce92De3Edee1F18E0157C05861564;
  address private constant V2Router = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;
  constructor(ILendingPoolAddressesProvider _addressProvider)
    public
    FlashLoanReceiverBase(_addressProvider)
  {}

  function testFlashLoan(address asset, uint amount) external {
    uint bal = IERC20(asset).balanceOf(address(this));
    require(bal > amount, "bal <= amount");

    address receiver = address(this);

    address[] memory assets = new address[](1);
    assets[0] = asset;

    uint[] memory amounts = new uint[](1);
    amounts[0] = amount;

    // 0 = no debt, 1 = stable, 2 = variable
    // 0 = pay all loaned
    uint[] memory modes = new uint[](1);
    modes[0] = 0;

    address onBehalfOf = address(this);

    bytes memory params = ""; // extra data to pass abi.encode(...)
    uint16 referralCode = 0;

    LENDING_POOL.flashLoan(
      receiver,
      assets,
      amounts,
      modes,
      onBehalfOf,
      params,
      referralCode
    );
  }

  function executeOperation(
    address[] calldata assets,
    uint[] calldata amounts,
    uint[] calldata premiums,
    address initiator,
    bytes calldata params
  ) external override returns (bool) {
    // do stuff here (arbitrage, liquidation, etc...)
    // abi.decode(params) to decode params
    for (uint i = 0; i < assets.length; i++) {

        address tokenIn = assets[i];
        address tokenOut = btoken;
        uint24 fee = 3000;
        address recipient = msg.sender;
        uint256 deadline = block.timestamp+15;
        uint256 amountIn = amounts[i];
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

        ISwapRouter(V3Router).exactInputSingle(params);//v3 a换b

        address[] memory path = new address[](2);
        path[0] = btoken;
        path[1] = assets[i];

        uint btokennow = IERC20(btoken).balanceOf(address(this));
        IUniswapV2Router(V2Router).swapExactTokensForTokens(btokennow, 0, path, address(this), deadline);//v2 b换a

        uint atoeknnow = IERC20(assets[i]).balanceOf(address(this));
        uint amountOwing = amounts[i].add(premiums[i]);
        require(atoeknnow > amountOwing);//有利可图

        IERC20(assets[i]).approve(address(LENDING_POOL), amountOwing);
    }
    // repay Aave
    return true;
  }
}