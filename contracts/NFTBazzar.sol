// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Importing ReentrancyGuard

contract NFTBazzar is ERC721URIStorage, ReentrancyGuard {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.0025 ether;
    address payable owner;

    mapping(uint256 => MarketItem) private idMarketItem;
    // mapping(uint256 => Auction) private auctions; // Auction details for each token

    struct MarketItem {
        uint256 _tokenId;
        address payable seller;
        address payable owner;
        address payable creator;
        address payable contractt;
        uint256 price; // This will represent the sale price or the auction's minimum bid
        bool sold;
        bool onAuction;
        bool onSale;
        uint256 auctionEndTime; // Auction-specific data
        uint256 highestBid; // Auction-specific data
        address payable highestBidder; // Auction-specific data
    }

    // struct Auction {
    //     uint256 tokenId;
    //     address payable seller;
    //     uint256 minBid;
    //     uint256 highestBid;
    //     address payable highestBidder;
    //     uint256 auctionEndTime;
    //     bool active;
    // }

    

    event AuctionStarted(
        uint256 indexed tokenId,
        uint256 minBid,
        uint256 duration
    );

    event NewBid(uint256 indexed tokenId, address bidder, uint256 bid);

    event AuctionEnded(
        uint256 indexed tokenId,
        uint256 highestBid,
        address winner 
    );

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price"
        );
        _;
    }

    constructor() ERC721("NFTBazzar", "MYNFT") {
        owner = payable(msg.sender); // Fixed assignment
    }

    function updateListingPrice(
        uint256 _listingPrice
    ) public payable onlyOwner {
        listingPrice = _listingPrice; // Updated function to set listing price
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Create NFT
    event TokenCreated(uint256 indexed tokenId, string tokenURI, uint256 price);
    event idMarketItemCreated(
        uint256 _tokenId,
        address payable seller,
        address payable owner,
        address payable creator,
        address payable contractt,
        uint256 price, 
        bool sold,
        bool onAuction,
        bool onSale,
        uint256 auctionEndTime, 
        uint256 highestBid,
        address payable highestBidder
    );
    function createToken(string memory tokenURI, uint256 price, bool isAuction, uint256 auctionDuration) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        if (isAuction) {
            createMarketItem(newTokenId, price, true, auctionDuration);
        } else {
            createMarketItem(newTokenId, price, false, 0);
        }
        emit TokenCreated(newTokenId, tokenURI, price);
        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price, bool isAuction, uint256 auctionDuration) private {
        require(price > 0, "Price must be greater than 0");
        require(msg.value == listingPrice, "Price must be equal to the listing price");

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), // seller is msg.sender initially
            payable(msg.sender), // owner remains null until purchased
            payable(msg.sender), // creator
            payable(address(this)), // contract
            price,
            false, // sold initially false
            isAuction, // onAuction
            !isAuction, // onSale is true if not auction
            block.timestamp + (auctionDuration * 1 minutes), // auction end time if auction
            0, // highest bid starts at 0
            payable(address(0)) // no highest bidder initially
        );

        emit idMarketItemCreated(
            tokenId,
            payable(msg.sender), // seller is msg.sender initially
            payable(msg.sender), // owner remains null until purchased
            payable(msg.sender), // creator
            payable(address(this)), // contract
            price,
            false, // sold initially false
            isAuction, // onAuction
            !isAuction, // onSale is true if not auction
            block.timestamp + (auctionDuration * 1 minutes), // auction end time if auction
            0, // highest bid starts at 0
            payable(address(0)) // no highest bidder initially
        );

        _transfer(msg.sender, address(this), tokenId);
    }

    // function createToken(
    //     string memory tokenURI,
    //     uint256 price
    // ) public payable returns (uint256) {
    //     _tokenIds.increment();
    //     uint256 newTokenId = _tokenIds.current();

    //     _mint(msg.sender, newTokenId);
    //     _setTokenURI(newTokenId, tokenURI);
    //     // createMarketItem(newTokenId, price);

    //     emit TokenCreated(newTokenId, tokenURI, price);

    //     return newTokenId;
    // }

    // // Create Market Item
    // function createMarketItem(uint256 tokenId, uint256 price) private {
    //     require(price > 0, "Price must be greater than 0");
    //     require(
    //         msg.value == listingPrice,
    //         "Price Must be equal to the listing price"
    //     );

    //     idMarketItem[tokenId] = MarketItem(
    //         tokenId,
    //         payable(address(this)),
    //         payable(msg.sender),
    //         payable(msg.sender), 
    //         payable(address(this)),
    //         price,
    //         false,
    //         false,
    //         true
    //     );

    //     _transfer(msg.sender, address(this), tokenId);

    //     emit idMarketItemCreated(
    //         tokenId,
    //         address(this),
    //         msg.sender,
    //         msg.sender,
    //         address(this),
    //         price,
    //         false,
    //         false,
    //         true
    //     );
    // }
    event BuyItem( uint256 tokenId, address indexed recipient);
    // Buy NFT
    function buyItem(uint256 tokenId) public payable nonReentrant() { 
        uint256 price = idMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price to complete the purchase"
        );

        uint256 listingFee = getListingPrice();
        uint256 sellerAmount = msg.value - listingFee;
        require(sellerAmount > 0, "Seller amount is zero");

        // Transfer to marketplace owner
        payable(owner).transfer(listingFee);

        // Transfer to seller
        payable(idMarketItem[tokenId].seller).transfer(sellerAmount);

            idMarketItem[tokenId].seller = idMarketItem[tokenId].owner;
            idMarketItem[tokenId].owner = payable(msg.sender);
            idMarketItem[tokenId].sold = true;
            idMarketItem[tokenId].onSale = false;
            _itemsSold.increment();

            _transfer(address(this), msg.sender, tokenId);
            emit BuyItem(tokenId, idMarketItem[tokenId].owner);

    }

    event ResellItem(uint256 tokenId, uint256 price, bool onAuction, uint256 auctionEndTime, address highestBidder);
    // Resale NFT
    function reSellItem(uint256 tokenId, uint256 price, bool isAuction, uint256 auctionDuration) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only NFT Owner can sell the NFT"
        );
        require(
            msg.value >= listingPrice,
            "Price Must be greater than or equal to the listing price"
        );

        idMarketItem[tokenId].seller = idMarketItem[tokenId].owner;
        idMarketItem[tokenId].sold = false;

        if (isAuction) {
            idMarketItem[tokenId].onAuction = true;
            idMarketItem[tokenId].price = price;
            idMarketItem[tokenId].auctionEndTime = block.timestamp + (auctionDuration * 1 minutes);
            idMarketItem[tokenId].highestBid = 0;
            idMarketItem[tokenId].highestBidder = payable(address(0));
        } else {
            idMarketItem[tokenId].onSale = true;
            idMarketItem[tokenId].price = price;
        }

        

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);

        emit ResellItem(tokenId, price, isAuction, idMarketItem[tokenId].auctionEndTime, idMarketItem[tokenId].highestBidder);
    }

    // Place a bid
    function bid(uint256 tokenId) public payable nonReentrant {
        MarketItem storage item = idMarketItem[tokenId]; // Load the item from storage
        require(item.onAuction, "Auction is not active");
        require(block.timestamp < item.auctionEndTime, "Auction has ended");
        require(
            msg.value > item.price,
            "Bid must be higher than the minimum bid"
        );
        require(
            msg.value > item.highestBid,
            "There is already a higher bid"
        ); 

        // Refund previous highest bidder
        if (item.highestBidder != address(0)) {
            item.highestBidder.transfer(item.highestBid);
        }

        item.highestBid = msg.value;
        item.highestBidder = payable(msg.sender);

        emit NewBid(tokenId, msg.sender, msg.value);
    }

    event AuctionEndedWithNoBid( uint256 tokenId);
    // End Auction
    function endAuction(uint256 tokenId) public payable nonReentrant {
        MarketItem storage item = idMarketItem[tokenId]; // Load the item from storage
        require(item.onAuction, "Auction is not active");
        require(
            block.timestamp >= item.auctionEndTime,
            "Auction is still ongoing"
        );

        // auction.active = false;
         
        item.onAuction = false;

        if (item.highestBidder != address(0)) {

            uint256 listingFee = getListingPrice();
            payable(owner).transfer(listingFee); // Transfer listing fee to marketplace owner

            // Transfer the remaining amount to the seller
            uint256 sellerAmount = item.highestBid;
            require(sellerAmount > 0, "Seller amount is zero");
            payable(item.seller).transfer(sellerAmount);
            // Transfer ownership of the NFT to the highest bidder
            item.seller = item.owner;
            item.owner = item.highestBidder;
            
            item.price = item.highestBid;

            item.sold = true;
            _itemsSold.increment();

            // Transfer funds to the seller
            // idMarketItem[tokenId].seller = item.highestBidder;
            _transfer(address(this), item.highestBidder, tokenId);

            emit AuctionEnded(
                tokenId,
                item.highestBid,
                item.highestBidder
            );
        } else {
            // No bids were placed, return NFT to seller
            // item.owner = item.seller;
            _transfer(address(this), item.seller, tokenId);
        }
    }

    // Get all NFT data
    function fetchAllItems() public view returns (MarketItem[] memory){
        uint256 itemCount = _tokenIds.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](itemCount); //1
        for (uint256 i = 0; i < itemCount; i++) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
        }

        require(currentIndex > 0, "No items found");
        return items;
    }

    // Get all onSale NFT data
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 onSaleItem = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].onSale) {
                onSaleItem += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](onSaleItem); //1
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].onSale) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
            }
        }

        require(currentIndex > 0, "No items found");
        return items;
    }

    // Get the single item
    function fetchSingleItem(
        uint256 tokenID
    ) public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();

        MarketItem[] memory items = new MarketItem[](1); //1
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1]._tokenId == tokenID) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
            }
        }

        require(currentIndex > 0, "No items found");
        return items;
    }

    // Get all onAuction NFT data
    function fetchAuctionItem() public view returns (MarketItem[] memory) { 
        uint256 itemCount = _tokenIds.current();
        uint256 auctionItemCount = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].onAuction) {
                auctionItemCount += 1;
            }
        }
        require(auctionItemCount > 0, "No auction items");
        MarketItem[] memory items = new MarketItem[](auctionItemCount); //1
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].onAuction) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
            }
        }
        require(currentIndex > 0, "No auction items");
        return items;
    }

    // User NFTs
    function fetchItemsListed(
        address userAdd
    ) public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current(); // Total number of tokens created
        // uint256 itemCount = 0;
        uint256 sitemCount = 0;
        // uint256 currentItemIndex = 0;
        uint256 sItemIndex = 0;

        // First loop: Count how many NFTs belong to the user
        for (uint256 i = 1; i <= totalCount; i++) {
            if (idMarketItem[i].owner == userAdd) {
                sitemCount += 1;
            }
        }

        MarketItem[] memory sitems = new MarketItem[](sitemCount);

        for (uint256 i = 1; i <= totalCount; i++) {

            // Populate sitems array with NFTs belonging to the user
            if (idMarketItem[i].owner == userAdd) {
                MarketItem storage sCurrentItem = idMarketItem[i];
                sitems[sItemIndex] = sCurrentItem;
                sItemIndex += 1;
            }
        }

        return sitems;
    }

}
