import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Form, Button, Card, Image } from 'react-bootstrap';

function App() {
	const [storedPrice, setStoredPrice] = useState('');
	const [item, setItem] = useState({ pairs: '' });
	const { pairs } = item;

	// change this address when the contract is re-deployed
	const contractAddress = '0x030256B5668D138870297eEa7422E143B5881Cb4';

	const ABI = [
		{
			"inputs": [],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "string",
					"name": "pair",
					"type": "string"
				}
			],
			"name": "getChainlinkDataFeedLatestAnswer",
			"outputs": [
				{
					"internalType": "int256",
					"name": "",
					"type": "int256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	];

	const provider = new ethers.BrowserProvider(window.ethereum);

	// not writing to the blockchain, so no need for signer
	// const signer = provider.getSigner();

	const contract = new ethers.Contract(contractAddress, ABI, provider);

	const getPair = async () => {
		// pass the selected conversion pair to the function
		console.log(pairs);
		const contractPrice = await contract.getChainlinkDataFeedLatestAnswer(pairs);
		if (pairs === 'BTC/ETH') {
			setStoredPrice(parseInt(contractPrice) / 10 ** 18);
		} else {
			setStoredPrice('$' + parseInt(contractPrice) / 10 ** 8);
		}
	};

	const handleChange = (e) => {
		console.log(e.target.value);
		setStoredPrice('');
		setItem((prevState) => ({
			...prevState,
			pairs: e.target.value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// alert(`${pairs}`);
	};

	return (
		<div className='container'>
			<Image
				src='https://seeklogo.com/images/C/chainlink-logo-B072B6B9FE-seeklogo.com.png'
				width={200}
				height={200}
				fluid
				className='mt-5'
			/>
			<hr></hr>
			<div>
				<Card
					style={{ width: '32rem' }}
					className='mt-5 shadow bg-body rounded'>
					<Card.Header as='h5'>Conversion Pairs</Card.Header>
					<Card.Body>
						{' '}
						<div className='col'>
							<form onSubmit={handleSubmit}>
								<Form.Group controlId='pairs'>
									<Form.Check
										value='BTC/USD'
										type='radio'
										aria-label='radio 1'
										label='BTC/USD'
										onChange={handleChange}
										checked={pairs === 'BTC/USD'}
									/>
									<Form.Check
										value='ETH/USD'
										type='radio'
										aria-label='radio 2'
										label='ETH/USD'
										onChange={handleChange}
										checked={pairs === 'ETH/USD'}
									/>
									<Form.Check
										value='LINK/USD'
										type='radio'
										aria-label='radio 3'
										label='LINK/USD'
										onChange={handleChange}
										checked={pairs === 'LINK/USD'}
									/>
									<Form.Check
										value='BTC/ETH'
										type='radio'
										aria-label='radio 3'
										label='BTC/ETH'
										onChange={handleChange}
										checked={pairs === 'BTC/ETH'}
									/>
								</Form.Group>
							</form>
							<div className='mt-5'>
								<Button
									variant='outline-primary'
									size='sm'
									type='submit'
									onClick={getPair}>
									Get Currency Conversion From Oracle
								</Button>
							</div>
						</div>
					</Card.Body>
				</Card>
				<div>
					<Card
						style={{ width: '32rem' }}
						className='mt-5 shadow bg-body rounded'>
						<Card.Header as='h5'>Result</Card.Header>
						<Card.Body>
							<div className='col'>
								<h5>
									{pairs} ➡ {storedPrice}
								</h5>
							</div>
						</Card.Body>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default App;
