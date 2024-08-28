import hre from 'hardhat';

async function main() {
    const NFTBazzar = await hre.ethers.deployContract("NFTBazzar");
    const nftBazzar = await NFTBazzar.waitForDeployment();

    // await nftBazzar.deployed();

    console.log(
        `deployed Contract Address ${nftBazzar.target}`
    );
}

main().catch((error)=>{
    console.error(error);
    process.exitCode=1;
})