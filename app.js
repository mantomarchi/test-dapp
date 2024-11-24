import { createWalletClient, custom, getContract } from "https://esm.sh/viem";
import { sepolia } from "https://esm.sh/viem/chains";

// Create a client that connects the user's account to Ethereum Sepolia
const walletClient = createWalletClient({
    chain: sepolia,
    transport: custom(window.ethereum)
});

// This will make your wallet extension show you a pop-up requesting you to connect your wallet
// Accounts will be an array
const accounts = await walletClient.requestAddresses();
const [address] = accounts;

const MoodContractAddress = "0xacDf96a3321394077052EfEB3461282F39BF9409";
const MoodContractABI = [
	{
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// Create an instance of the contract
const MoodContractInstance = getContract({
    address: MoodContractAddress,
    abi: MoodContractABI,
    client: walletClient,
});

getMood = async function() {
    const mood = await MoodContractInstance.read.getMood();
    document.getElementById("show-mood").innerText = `Your Mood: ${mood}`;
}

setMood = async function() {
    const mood = document.getElementById("mood").value;
    await MoodContractInstance.write.setMood([mood], { account: address});
}