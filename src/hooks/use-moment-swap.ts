import { Contract } from "ethers";

import MomentSwapFRC721 from "@Contracts/MomentSwapFRC721.sol/MomentSwapFRC721.json";
import { useWalletProvider } from "src/hooks";

const contractAddress = process.env.NEXT_PUBLIC_MOMENTSWAP_CONTRACT_ADDRESS || "";
export const getContract = () => new Contract(contractAddress, MomentSwapFRC721.abi);

export const useMomentSwap = () => {
  const { signer, provider } = useWalletProvider();
  const contractWithProvider = new Contract(contractAddress, MomentSwapFRC721.abi, provider);
  const contractWithSigner = new Contract(contractAddress, MomentSwapFRC721.abi, signer);

  // read-only
  const getNFTCollection = () => {
    return contractWithProvider.getNFTCollection();
  };
  const getNFTCollectionByOwner = (owner: string) => {
    return contractWithProvider.getNFTCollectionByOwner(owner);
  };

  // read-write
  const mintMomentSwapNFT = (owner: string, ipfsURL: string) => {
    return contractWithSigner.mintMomentSwapNFT(owner, ipfsURL);
  };
  const mintMultipleMomentSwapNFTs = (owner: string, ipfsURLs: Array<string>) => {
    return contractWithSigner.mintMultipleMomentSwapNFTs(owner, ipfsURLs);
  };

  return { getNFTCollection, getNFTCollectionByOwner, mintMomentSwapNFT, mintMultipleMomentSwapNFTs };
};
