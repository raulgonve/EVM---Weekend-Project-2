EVM-Weekend-Project-2
This project implements a voting smart contract in Solidity, deployed and managed on the Sepolia blockchain. The contract allows a "chairperson" to grant voting rights, delegate votes, and register votes for different proposals. Below is an overview of the code and the interaction flow with the contract.

Code Overview
The main code is written in TypeScript and uses the viem library to interact with the Ethereum blockchain. Below is a breakdown of each section of the code:

1. Setup and Dependencies
typescript
Copy code
import { createPublicClient, createWalletClient, http, formatEther, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
The code imports necessary libraries for blockchain interaction, hexadecimal data manipulation, and account management. dotenv is used to load environment variables with sensitive information such as private keys and the Alchemy API key.

2. Configuration Variables
typescript
Copy code
const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const voterAddress = process.env.VOTER_ADDRESS || "";
const delegateAddress = process.env.DELEGATE_ADDRESS || "";
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];
Here, necessary variables are configured, such as the deployer's private key, voter and delegate addresses, and the list of proposals to be used in the voting process.

3. Main Function (main)
The main function performs the following tasks:

Client Setup: Creates a publicClient for reading from the blockchain and a walletClient for making transactions, both connected to the Sepolia test network.

Deployment of Contract: Deploys the Ballot contract with the provided ABI, bytecode, and proposals, and waits for the transaction receipt to confirm deployment.

Chairperson Verification: Verifies if the deployer of the contract is set as the chairperson, which is necessary for managing voting rights.

Grant Voting Rights: Grants voting rights to a specified delegate address using the giveRightToVote function.

Delegate Vote: Delegates the deployer's vote to the specified delegate address.

Cast Vote: Casts a vote on a specific proposal by the delegate.

4. Supporting Functions
grantVotingRights: Grants voting rights to a specified address by calling the giveRightToVote function on the contract.

delegateVote: Delegates the deployer's vote to another address by calling the delegate function.

castVote: Allows an address to vote for a specified proposal using the vote function.

5. Results Retrieval
At the end of the process, the results of the voting can be retrieved by calling the contract’s winningProposal and winnerName functions to identify the proposal with the highest votes.

Usage Instructions
Clone the repository and install dependencies:

bash
Copy code
git clone https://github.com/raulgonve/EVM-Weekend-Project-2.git
cd EVM-Weekend-Project-2
npm install
Set up environment variables in a .env file:

vbnet
Copy code
ALCHEMY_API_KEY=your-alchemy-api-key
PRIVATE_KEY=your-private-key
VOTER_ADDRESS=address-to-grant-voting-rights
DELEGATE_ADDRESS=address-to-delegate-vote
Run the script:

bash
Copy code
ts-node scripts/DeployWithHardhat.ts
Flow Diagram
Deploy Contract: deployer -> Ballot contract
Grant Voting Rights: deployer -> voter
Delegate Vote: deployer -> delegate
Cast Vote: delegate -> Ballot contract
Retrieve Results: Query winningProposal and winnerName
This README provides an overview of the contract's purpose, a step-by-step guide on the code, and instructions for setting up and executing the project.
