// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MagicContract {
    // Define the Category and Project structures
    struct Share {
        uint256 fund;
        address wallet;
    }

    struct Project {
        string name;
        uint256 requiredFund; // Using uint256 to represent the amount in Wei (smallest unit of Ether)
        uint256 funded; // Amount already funded
        Share[] shares;
        string state;
        string[] categories;
        Share ownerShare; // Owner's share
    }

    // Array to store categories
    string[] public categories;
    
    // Array to store projects
    Project[] public projects;

    // Events
    event ProjectRegistered(string name, uint256 requiredFund, address ownerWallet);
    event ShareChanged(uint256 projectId, uint256 shareIndex, uint256 fund, address wallet);
    event StateChanged(uint256 projectId, string state);
    event FundsReceived(address from, uint256 amount);
    event RefundIssued(uint256 projectId, uint256 totalFund);

    // Register a new project
    function register(
        string memory _name,
        uint256 _requiredFund,
        Share[] memory _shares,
        string memory _state,
        string[] memory _categories,
        uint256 _ownerFund,
        address _ownerWallet
    ) public {
        Share memory ownerShare = Share({
            fund: _ownerFund,
            wallet: _ownerWallet
        });

        Project memory newProject = Project({
            name: _name,
            requiredFund: _requiredFund,
            funded: 0,
            shares: _shares,
            state: _state,
            categories: _categories,
            ownerShare: ownerShare
        });

        projects.push(newProject);

        emit ProjectRegistered(_name, _requiredFund, _ownerWallet);
    }

    // Change share for a project
    function changeShare(uint256 _projectId, uint256 _shareIndex, uint256 _fund, address _wallet) public {
        require(_projectId < projects.length, "Project does not exist.");
        require(_shareIndex < projects[_projectId].shares.length, "Share index does not exist.");

        projects[_projectId].shares[_shareIndex].fund = _fund;
        projects[_projectId].shares[_shareIndex].wallet = _wallet;

        emit ShareChanged(_projectId, _shareIndex, _fund, _wallet);
    }

    // Change state of a project
    function changeState(uint256 _projectId, string memory _state) public {
        require(_projectId < projects.length, "Project does not exist.");

        projects[_projectId].state = _state;

        emit StateChanged(_projectId, _state);
    }

    // Get all categories
    function getCategories() public view returns (string[] memory) {
        return categories;
    }

    // Add a new category
    function addCategory(string memory _category) public {
        categories.push(_category);
    }

    // Refund function to distribute funds to shareholders
    function refund(uint256 _projectId) public {
        require(_projectId < projects.length, "Project does not exist.");
        Project storage project = projects[_projectId];
        
        uint256 totalFund = project.funded;
        uint256 totalShares = totalFund + project.ownerShare.fund;

        // Refund to each shareholder
        for (uint256 i = 0; i < project.shares.length; i++) {
            Share memory share = project.shares[i];
            uint256 refundAmount = (share.fund * totalFund) / totalShares;
            payable(share.wallet).transfer(refundAmount);
        }

        // Refund to project owner
        uint256 ownerRefund = (project.ownerShare.fund * totalFund) / totalShares;
        payable(project.ownerShare.wallet).transfer(ownerRefund);

        // Reset funded amount to 0 after refund
        project.funded = 0;

        emit RefundIssued(_projectId, totalFund);
    }

    // Function to receive funds
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }
}
