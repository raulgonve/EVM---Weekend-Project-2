import { createPublicClient, createWalletClient, http, formatEther, toHex } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";

dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const voterAddress = process.env.VOTER_ADDRESS || "";
const delegateAddress = process.env.DELEGATE_ADDRESS || "";
const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  if (!providerApiKey || !deployerPrivateKey || !voterAddress || !delegateAddress) {
    throw new Error("Missing required environment variables.");
  }

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const deployerAccount = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const walletClient = createWalletClient({
    account: deployerAccount,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  console.log("Deployer address:", deployerAccount.address);
  const balance = await publicClient.getBalance({ address: deployerAccount.address });
  console.log("Deployer balance:", formatEther(balance), "ETH");

  console.log("\nDeploying Ballot contract...");
  const deployTxHash = await walletClient.deployContract({
    abi,
    bytecode: bytecode as `0x${string}`,
    args: [PROPOSALS.map((prop) => toHex(prop, { size: 32 }))],
  });
  console.log("Transaction hash for deployment:", deployTxHash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash: deployTxHash });
  const contractAddress = receipt.contractAddress!;
  console.log("Ballot contract deployed at:", contractAddress);

  const chairpersonAddress = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "chairperson",
    args: [],
  });
  if (chairpersonAddress !== deployerAccount.address) {
    throw new Error("Only the chairperson can grant voting rights.");
  }
  console.log("Verified that deployer is the chairperson.");

  console.log("\nGranting voting rights to:", delegateAddress);
  await grantVotingRights(publicClient, walletClient, contractAddress, delegateAddress);

  console.log("\nDelegating vote from deployer to:", delegateAddress);
  await delegateVote(publicClient, walletClient, contractAddress, delegateAddress);

  console.log("\nCasting vote by delegate for proposal index: 0");
  await castVote(publicClient, walletClient, contractAddress, 0);

  // Get the voting results
  console.log("\nFetching voting results...");
  await getResults(publicClient, contractAddress);
}

async function grantVotingRights(publicClient: any, walletClient: any, contractAddress: string, voterAddress: string) {
  try {
    const grantTxHash = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: "giveRightToVote",
      args: [voterAddress],
    });
    console.log("Transaction hash for granting voting rights:", grantTxHash);

    const receipt = await publicClient.waitForTransactionReceipt({ hash: grantTxHash });
    console.log("Voting rights granted successfully. Transaction confirmed:", receipt.transactionHash);
  } catch (error: any) {
    console.error("Error granting voting rights:", error.reason || error.message);
  }
}

async function delegateVote(publicClient: any, walletClient: any, contractAddress: string, delegateToAddress: string) {
  try {
    const delegateTxHash = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: "delegate",
      args: [delegateToAddress],
    });
    console.log("Transaction hash for delegating vote:", delegateTxHash);

    const receipt = await publicClient.waitForTransactionReceipt({ hash: delegateTxHash });
    console.log("Vote delegated successfully. Transaction confirmed:", receipt.transactionHash);
  } catch (error: any) {
    console.error("Error delegating vote:", error.reason || error.message);
  }
}

async function castVote(publicClient: any, walletClient: any, contractAddress: string, proposalIndex: number) {
  try {
    const voteTxHash = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName: "vote",
      args: [proposalIndex],
    });
    console.log("Transaction hash for casting vote:", voteTxHash);

    const receipt = await publicClient.waitForTransactionReceipt({ hash: voteTxHash });
    console.log("Vote cast successfully. Transaction confirmed:", receipt.transactionHash);
  } catch (error: any) {
    console.error("Error casting vote:", error.reason || error.message);
  }
}

async function getResults(publicClient: any, contractAddress: string) {
  try {
    const winningProposalIndex = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "winningProposal",
    });
    console.log("Winning proposal index:", winningProposalIndex);

    const winnerName = await publicClient.readContract({
      address: contractAddress,
      abi,
      functionName: "winnerName",
    });
    console.log("Winning proposal name:", winnerName);
  } catch (error: any) {
    console.error("Error fetching results:", error.reason || error.message);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
