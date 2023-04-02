import React from 'react'
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
export default function Transaction() {
	const navigate=useNavigate()

	function handleClick(n){
		if(n===0){
			navigate("/")
			toast.success("NFT Added to Portfolio")
		} else{
			navigate("/")
			toast.error("NFT not acquired")
		}
	}
  return (
	
		<div class="transaction-info">
			<h1 className='text-center font-semibold'>Metamask Transaction Confirmation</h1>
			<h2>Transaction Details:</h2>
			<div class="details">
				<div class="detail">
					<p class="label">From:</p>
					<p class="value">0x1234567890abcdef1234567890abcdef12345678</p>
				</div>
				<div class="detail">
					<p class="label">To:</p>
					<p class="value">0x0987654321fedcba0987654321fedcba09876543</p>
				</div>
				<div class="detail">
					<p class="label">Value:</p>
					<p class="value">1 ETH</p>
				</div>
				<div class="detail">
					<p class="label">Gas Limit:</p>
					<p class="value">21000</p>
				</div>
				<div class="detail">
					<p class="label">Gas Price:</p>
					<p class="value">5 GWEI</p>
				</div>
				<div class="detail">
					<p class="label">Nonce:</p>
					<p class="value">1234</p>
				</div>
			</div>
			<div class="warning">
				<p>Please review the details above before confirming the transaction.</p>
			</div>
			<button onClick={()=>handleClick(0)} class="confirm-button">Confirm</button>
			<button onClick={()=>handleClick(1)} class="cancel-button">Cancel</button>
			<p>&copy; 2023 Metamask Transaction Confirmation</p>
		</div>
	
		
	
  )
}

		