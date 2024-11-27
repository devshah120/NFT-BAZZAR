import { useSelector } from "react-redux";



export class NftsService {
  // Get all NFTs
  getAllNfts(nfts){
    return nfts;
  }
  // Get on sale NFTs
  getOnSaleNfts(nfts){
    console.log(nfts);
    return nfts.filter(nft => nft.onSale);
  }

  // Get on auction NFTs
  getOnAuctionNfts(nfts){
    return nfts.filter(nft => nft.onAuction );
  }

  // Get NFT by ID
  getNftById(nfts,tokenId){
    console.log(nfts,tokenId);
    
    return nfts.find(nft => nft.tokenId === tokenId);
  }

  // Get NFTs by NFT catagory
  getNftsByNftCategory(nfts,tokenId){
    const nftData = nfts.find(nft => nft.tokenId === tokenId);
    console.log(nfts);
    
    return nfts.filter(nft => nft.catagory === nftData.catagory);
  }
  
  // Get NFTs by owner
  getNftsByOwner(nfts,owner){
    return nfts.filter(nft => nft.owner.toLowerCase() === owner);
  }

  // Get filtered onSale NFTs by owner
  getOnSaleNftsByOwner(nfts,owner){
    return nfts.filter(nft => nft.onSale && nft.owner.toLowerCase() === owner);
  }

  // Get filtered onAuction NFTs by owner
  getOnAuctionNftsByOwner(nfts,owner){
    return nfts.filter(nft => nft.onAuction && nft.owner.toLowerCase() === owner);
  }

  // Get filtered just created not on auction and not on sale NFTs by owner
  getJustCreatedNftsByOwner(nfts,owner){
    return nfts.filter(nft => !nft.onSale && !nft.onAuction && nft.owner.toLowerCase() === owner);
  }

  // Get filtered bought NFTs by owner
  getBoughtNftsByOwner(nfts,owner){
    return nfts.filter(nft => nft.owner.toLowerCase() === owner);
  }

  // Get NFTs by catagory
  getNftsByCategory(nfts,category){
    return nfts.filter(nft => nft.catagory === category);
  }

}

const nftsService = new NftsService();

export default nftsService