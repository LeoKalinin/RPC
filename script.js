// Подключаемся к контракту

const contractAddress = "0xDD79EDab8Baae7782A23ef5c25b05Ee50301b182"; //Адрес контракта

// Указываем ABI (Application Binary Interface) контракта
const abi = [
		{
			"inputs": [
				{
					"internalType": "enum RockPaperScissors.Choice",
					"name": "_playerOneChoice",
					"type": "uint8"
				},
				{
					"internalType": "enum RockPaperScissors.Choice",
					"name": "_playerTwoChoice",
					"type": "uint8"
				}
			],
			"name": "play",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "reset",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "game",
			"outputs": [
				{
					"internalType": "address payable",
					"name": "playerOne",
					"type": "address"
				},
				{
					"internalType": "address payable",
					"name": "playerTwo",
					"type": "address"
				},
				{
					"internalType": "enum RockPaperScissors.Choice",
					"name": "playerOneChoice",
					"type": "uint8"
				},
				{
					"internalType": "enum RockPaperScissors.Choice",
					"name": "playerTwoChoice",
					"type": "uint8"
				},
				{
					"internalType": "enum RockPaperScissors.Winner",
					"name": "winner",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getGameInfo",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				},
				{
					"internalType": "enum RockPaperScissors.Choice",
					"name": "",
					"type": "uint8"
				},
				{
					"internalType": "enum RockPaperScissors.Choice",
					"name": "",
					"type": "uint8"
				},
				{
					"internalType": "enum RockPaperScissors.Winner",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

// Подключаемся к web3 провайдеру (метамаск)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

async function play() {
  const playerOneChoice = document.getElementById("_playerOneChoice").value;
  const playerTwoChoice = document.getElementById("_playerTwoChoice").value;
  const setNote = await contract.play(playerOneChoice,playerTwoChoice);
}

async function reset() {
	document.getElementById("_playerOneChoice").value = null;
	document.getElementById("_playerTwoChoice").value = null;
	document.getElementById("resultGame").value = null;
  }

  async function getGameInfo() {
	const response = await contract.getGameInfo();
	const { playerOne, playerTwo, playerOneChoice, playerTwoChoice, winner } = await response;
  
	console.log(playerOne, playerTwo, playerOneChoice, playerTwoChoice, winner);

	const gameInfo = `Адрес игрока 1: ${playerOne}\n` +
					 `Адрес игрока 2: ${playerTwo}\n` +
					 `Выбор игрока 1: ${playerOneChoice}\n` +
					 `Выбор игрока 2: ${playerTwoChoice}\n` +
					 `Победитель: ${winner}`;
	document.getElementById("resultGame").innerText = gameInfo;
  }

