## Report on `Ballot.sol` Function Execution

This report outlines the execution of key functions within the `Ballot.sol` smart contract, including the transaction hashes for successful executions or revert reasons in cases of failure.

---

### 1. Contract Deployment

- **Transaction Hash:** `0x5712ea8c8db5e439f35e32a224992c31635fec765b83f995373b20d1ece57b0a`
- **Status:** Successful
- **Details:** The `Ballot` contract was successfully deployed to the Sepolia network. The deployer's address (`0x6766DAAC95d194c99dCd563F0518d0C904Ec3deE`) was verified as the chairperson.

---

### 2. Granting Voting Rights

- **Function:** `giveRightToVote(address voter)`
- **Voter Address:** `0xbDA5747bFD65F08deb54cb465eB87D40e51B197E`
- **Transaction Hash:** `0x0bccd627543c2022f2bc77ab8cbb06b9ce8272be588ba10d2bf01e5f3e023429`
- **Status:** Successful
- **Details:** Voting rights were granted successfully to the specified address. The deployer, acting as the chairperson, executed this function.

---

### 3. Delegating Vote

- **Function:** `delegate(address to)`
- **Delegated To:** `0xbDA5747bFD65F08deb54cb465eB87D40e51B197E`
- **Transaction Hash:** `0x389cf627d6e4cf0778953fffde02fcc2ec6def14834eb50082687d3bdfcb932a`
- **Status:** Successful
- **Details:** The vote was successfully delegated from the deployer to the specified delegate address.

---

### 4. Casting Vote

- **Function:** `vote(uint proposal)`
- **Proposal Index:** `0`
- **Transaction Hash:** N/A
- **Status:** Failed
- **Revert Reason:** `Missing or invalid parameters.`
- **Details:** Attempting to cast a vote for proposal index `0` resulted in an error due to invalid parameters. The issue was traced back to an exceeding gas allowance for the transaction, which prevented execution.

---

### 5. Fetching Voting Results

- **Function:** `winningProposal() / winnerName()`
- **Winning Proposal Index:** `0`
- **Winning Proposal Name:** `Proposal 1`
- **Status:** Successful
- **Details:** The function correctly returned the winning proposal, indexed at `0`, with the name "Proposal 1".
