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
    mapping(uint256 => Auction) private auctions; // Auction details for each token

    struct MarketItem {
        uint256 _tokenId;
        address payable seller;
        address payable owner;
        address payable creator;
        address payable contractt;
        uint256 price;
        bool sold;
        bool onAuction;
        bool onSale;
    }

    struct Auction {
        uint256 tokenId;
        address payable seller;
        uint256 minBid;
        uint256 highestBid;
        address payable highestBidder;
        uint256 auctionEndTime;
        bool active;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        address creator,
        address contractt,
        uint256 price,
        bool sold,
        bool onAuction,
        bool onSale
    );

    event AuctionStarted(
        uint256 indexed tokenId,
        uint256 minBid,
        uint256 duration
    );

    event NewBid(uint256 indexed tokenId, address bidder, uint256 bid);

    event AuctionEnded(
        uint256 indexed tokenId,
        address winner,
        uint256 highestBid
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

    // Start Auction for an NFT
    function startAuction(
        uint256 tokenId,
        uint256 minBid,
        uint256 auctionDuration
    ) public {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only the owner can start an auction"
        );
        require(
            auctions[tokenId].active == false,
            "Auction already active for this NFT"
        );
        idMarketItem[tokenId].onAuction = true;

        uint256 auctionEndTime = block.timestamp + auctionDuration;

        auctions[tokenId] = Auction({
            tokenId: tokenId,
            seller: payable(msg.sender),
            minBid: minBid,
            highestBid: 0,
            highestBidder: payable(address(0)),
            auctionEndTime: auctionEndTime,
            active: true
        });

        emit AuctionStarted(tokenId, minBid, auctionDuration);
    }

    // Place a bid
    function bid(uint256 tokenId) public payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction is not active");
        require(block.timestamp < auction.auctionEndTime, "Auction has ended");
        require(
            msg.value > auction.minBid,
            "Bid must be higher than the minimum bid"
        );
        require(
            msg.value > auction.highestBid,
            "There is already a higher bid"
        );

        // Refund previous highest bidder
        if (auction.highestBidder != address(0)) {
            auction.highestBidder.transfer(auction.highestBid);
        }

        auction.highestBid = msg.value;
        auction.highestBidder = payable(msg.sender);

        emit NewBid(tokenId, msg.sender, msg.value);
    }

    // End Auction
    function endAuction(uint256 tokenId) public nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(auction.active, "Auction is not active");
        require(
            block.timestamp >= auction.auctionEndTime,
            "Auction is still ongoing"
        );

        auction.active = false;
        idMarketItem[tokenId].onAuction = false;

        if (auction.highestBidder != address(0)) {
            // Transfer ownership of the NFT to the highest bidder
            idMarketItem[tokenId].owner = auction.highestBidder;
            // aa jovanu che
            idMarketItem[tokenId].seller = auction.highestBidder;
            idMarketItem[tokenId].price = auction.highestBid;

            idMarketItem[tokenId].sold = true;
            _itemsSold.increment();
            _transfer(address(this), auction.highestBidder, tokenId);

            // Transfer funds to the seller
            auction.seller.transfer(auction.highestBid);

            emit AuctionEnded(
                tokenId,
                auction.highestBidder,
                auction.highestBid
            );
        } else {
            // No bids were placed, return NFT to seller
            idMarketItem[tokenId].owner = auction.seller;
            _transfer(address(this), auction.seller, tokenId);
        }
    }

    // Create NFT
    event TokenCreated(uint256 indexed tokenId, string tokenURI, uint256 price);

    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price);

        emit TokenCreated(newTokenId, tokenURI, price);

        return newTokenId;
    }

    // Create Market Item
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be greater than 0");
        require(
            msg.value == listingPrice,
            "Price Must be equal to the listing price"
        );

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(address(this)), //seller
            payable(msg.sender), //owner
            payable(msg.sender), //creator
            payable(address(this)),
            price,
            false,
            false,
            true
        );

        _transfer(msg.sender, address(this), tokenId);

        emit idMarketItemCreated(
            tokenId,
            address(this),
            msg.sender,
            msg.sender,
            address(this),
            price,
            false,
            false,
            true
        );
    }

    // Resale NFT
    function reSellToken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only NFT Owner can sell the NFT"
        );
        require(
            msg.value >= listingPrice,
            "Price Must be greater than or equal to the listing price"
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].onSale = true;
        idMarketItem[tokenId].price = price;

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // Buy NFT
    function createMarketSale(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;
        require(
            msg.value == price,
            "Please submit the asking price to complete the purchase"
        );

        idMarketItem[tokenId].seller = idMarketItem[tokenId].owner;
        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].onSale = false;

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idMarketItem[tokenId].seller).transfer(msg.value);
    }

    // Get all unsold NFT data
    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        require(unsoldItemCount > 0, "No unsold items");

        MarketItem[] memory items = new MarketItem[](unsoldItemCount); //1
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < itemCount; i++) {
            if (!idMarketItem[i + 1].sold) {
                items[currentIndex] = idMarketItem[i + 1];
                currentIndex += 1;
            }
        }

        require(currentIndex > 0, "No items found");
        return items;
    }

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

    function fetchSingleAuctionItem(
        uint256 tokenId
    ) public view returns (Auction[] memory) {
        uint256 itemCount = _tokenIds.current();
        Auction[] memory items = new Auction[](1); //1
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (auctions[i + 1].tokenId == tokenId) {
                items[currentIndex] = auctions[i + 1];
                currentIndex += 1;
            }
        }
        require(currentIndex > 0, "No auction items");

        return items;
    }

    function fetchAuctionItem() public view returns (Auction[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 auctionItemCount = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (auctions[i + 1].active) {
                auctionItemCount += 1;
            }
        }
        require(auctionItemCount > 0, "No auction items");
        Auction[] memory items = new Auction[](auctionItemCount); //1
        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (auctions[i + 1].active) {
                items[currentIndex] = auctions[i + 1];
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

        // Second loop: Count how many NFTs in general (this can be skipped if not needed)
        // for (uint256 i = 1; i <= totalCount; i++) {
        //     if (idMarketItem[i].seller != address(0)) { // Check valid seller
        //         itemCount += 1;
        //     }
        // }

        // Create the return array and populate it with the NFTs
        // MarketItem[] memory items = new MarketItem[](itemCount);
        MarketItem[] memory sitems = new MarketItem[](sitemCount);

        for (uint256 i = 1; i <= totalCount; i++) {
            // if (idMarketItem[i].seller != address(0)) { // Valid seller
            //     MarketItem storage currentItem = idMarketItem[i];
            //     items[currentItemIndex] = currentItem;
            //     currentItemIndex += 1;
            // }

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
