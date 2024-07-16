# Token DApp

## Introduction

This repository contains the Token DApp project, which includes a Solidity smart contract and a React frontend.

## Prerequisites

- Node.js
- npm
- MetaMask (with 2 accounts)
- Hardhat
- Remix IDE

## Setup and Deployment

### Smart Contract Deployment using Remix IDE

1. Open Remix IDE.
2. Create `Token.sol` and paste the Solidity code.
3. Compile and deploy the contract using MetaMask.

### Frontend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/AbdourahamaneIssakaSani/token-dapp
    cd token-dapp
    ```

2. Install dependencies:

    ```sh
    npm install --legacy-peer-deps
    ```

3. Start the React application:

    ```sh
    npm start
    ```

## Usage

1. Open the React application in your browser.
2. Connect your MetaMask wallet.
3. Make sure you have 2 accounts. The app uses 2 accounts only to send and receive between them.
4. View and transfer tokens between accounts.

## Software Testing

### Using Hardhat

1. Frontend app test:

    ```sh
    npm test
    ```

    This is to confirm that the UI is displayed correctly.

2. Smart Contract Test:

    Create .env file and add the private key as follow:

    ```sh
    PRIVATE_KEY=<YOUR_PRIVATE_KEY>
    ```

    Doing so is not required and the frontend app can be use with the deployed contract already.

    For the first time

    ```sh
    npx hardhat compile
    ```

    then do always:

    ```sh
    npx hardhat test
    ```

    The test cases inlcudes the deployement and tranfers between accounts, ensuring that all expectations are met.
