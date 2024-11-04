# Ballot Voting Contract Project

This project deploys and interacts with the `Ballot.sol` contract, allowing voting rights assignment, vote casting, vote delegation, and querying of results.

### Prerequisites

- **Node.js** (v20 or higher recommended)
- **Viem** (for Ethereum interaction)
- **Hardhat**
- **Sepolia Network** (Alchemy API Key required)

### Environment Setup

1. Clone the repository.
2. Create a `.env` file following `.env.example` as a guide. Add the following keys:
   - `ALCHEMY_API_KEY`: Your Alchemy API key for Sepolia.
   - `PRIVATE_KEY`: Your deployer's private key.
   - `VOTER_ADDRESS`: Address for a voter to be given voting rights.
   - `DELEGATE_ADDRESS`: Address to delegate the vote to.

### Installation & Compilation

1. Install dependencies:

    npm install

2. Compile the contract:

    npx hardhat compile

3. Deploy and Run Scripts

    To deploy and interact with the contract, use the following command:

    npx hardhat run ./scripts/DeployWithHardhat.ts --network sepolia

    This will:

    Deploy Ballot.sol to the Sepolia testnet.
    Assign voting rights, delegate votes, cast votes, and retrieve voting results.

### Note

Ensure Sepolia network keys and parameters are correctly set up in the .env file.

## Team Members
- Raul Gonzalez - k2NaNm - @Cryptowolf 
- kNohaF    - @LucasRohr 
- AvgRax    - @Meet
- Marguerite Blair - XEGTvv    - @eratosthenessieve 
- crg7DC - @hagi 
- Esteban Valsecchi - YNgtg8 - @Esteban CryptoBull13 
- JDxvP6    - @Vamshi