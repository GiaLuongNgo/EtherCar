pragma solidity ^0.5.8;

contract Marketplace {

    uint public productCount = 0;
    mapping(uint => Product) public products;
    address payable seller;
    address payable public buyer;
    address public marketplaceContractAddress=address(this);

    modifier onlyBuyer {
        require(buyer==msg.sender, 'not buyer');
        _;
    }

    modifier onlySeller {
        require(seller==msg.sender, 'not seller');
        _;
    }

    struct Product {
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    function confirmCreate() private {
        seller = msg.sender;
    }

    function createProduct(string memory _name, uint _price) public  {
        confirmCreate();
        // Require a valid name
        require(bytes(_name).length > 0,'');
        // Require a valid price
        require(_price > 0,'');
        // Create the product
        products[productCount] = Product(productCount, _name, _price, seller, false);
        // Trigger an event
        emit ProductCreated(productCount, _name, _price, seller, false);
        // Increment product count
        productCount ++;
    }

    function confirmPurchase() private {
        buyer = msg.sender;
    }

    function purchaseProduct(uint _id) public payable {
        confirmPurchase();
            // Fetch the product
        Product memory _product = products[_id];
            // Make sure the product has a valid id
        require(_product.id >= 0 && _product.id <= productCount,'');
            // Require that there is enough Ether in the transaction
        require(msg.value >= _product.price,'');
            // Require that the product has not been purchased already
        require(!_product.purchased,'');
            // Mark as purchased
        _product.purchased = true;
        require(buyer != _product.owner,'');
        buyer.transfer(_product.price);
        _product.owner.transfer(address(this).balance);
        _product.owner = buyer;
        products[_id] = _product;
            // Trigger an event
        emit ProductPurchased(_product.id, _product.name, _product.price, msg.sender, true);
    }
}

