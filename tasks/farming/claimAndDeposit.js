module.exports = async function (
	{ pid, amountAMin, amountBMin, minAmountOutA, deadline, caller, bnbAmount },
	{
		ethers: {
			getNamedSigners,
			getContract,
			provider: { getBlockNumber },
		},
	}
) {
	if (deadline === "0") {
		deadline = (await getBlockNumber()) + 10000000;
	}
	const signers = await getNamedSigners();

	const farming = await getContract("GymFarming", signers[caller]);

	const tx = await farming.claimAndDeposit(pid, amountAMin, amountBMin, minAmountOutA, deadline, {
		value: bnbAmount,
	});

	return tx;
};
