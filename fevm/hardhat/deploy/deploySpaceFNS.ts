import hre from 'hardhat';

import type { SpaceFNS} from '../typechain-types/contracts/SpaceFNS';
import type { SpaceFNS__factory } from '../typechain-types/factories/contracts/SpaceFNS__factory';

async function main() {
  console.log('Space deploying....');

  const ROOT_NODE = "fil";
  const domainHash = require("eth-ens-namehash");
  //const priorityFee = await hre.run('callRPC', {
  //  method: 'eth_maxPriorityFeePerGas',
  //  params: [],
  //});

  const owner = new hre.ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY || 'undefined',
    hre.ethers.provider
  );
  const spaceFNSFactory: SpaceFNS__factory = <
    SpaceFNS__factory
  >await hre.ethers.getContractFactory('SpaceFNS', owner);

  const spaceFNS: SpaceFNS = <SpaceFNS>(
    await spaceFNSFactory.deploy(
      domainHash.hash(ROOT_NODE)
     // ,
   //   {
   //     maxPriorityFeePerGas: priorityFee,
   //   }
    )
  );
  await spaceFNS.deployed();
  console.log('spaceFNS deployed to ', spaceFNS.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

