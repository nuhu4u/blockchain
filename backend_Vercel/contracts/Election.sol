// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title Election Contract
 * @dev Smart contract for individual election management
 * 
 * Each election gets its own deployed contract instance.
 * This ensures complete isolation between different elections.
 */

contract Election {
    // Structs
    struct Candidate {
        string name;
        string party;
        uint256 voteCount;
        bool isActive;
    }

    struct ElectionInfo {
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        bool isFinalized;
    }

    // State variables
    address public admin;
    ElectionInfo public election;
    mapping(address => bool) public voters;
    mapping(address => bool) public hasVoted;
    Candidate[] public candidates;
    uint256 public totalVotes;

    // Events
    event ElectionCreated(string title, uint256 startTime, uint256 endTime);
    event CandidateAdded(uint256 candidateId, string name, string party);
    event VoteCast(address indexed voter, uint256 candidateId);
    event ElectionFinalized(uint256 totalVotes);

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDuringElection() {
        require(block.timestamp >= election.startTime && block.timestamp <= election.endTime, "Election is not active");
        require(election.isActive, "Election is not active");
        _;
    }

    modifier onlyAfterElection() {
        require(block.timestamp > election.endTime || !election.isActive, "Election is still active");
        _;
    }

    // Constructor
    constructor(
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime
    ) {
        admin = msg.sender;
        election = ElectionInfo({
            title: _title,
            description: _description,
            startTime: _startTime,
            endTime: _endTime,
            isActive: true,
            isFinalized: false
        });
        
        emit ElectionCreated(_title, _startTime, _endTime);
    }

    // Admin functions
    function addCandidate(string memory _name, string memory _party) external onlyAdmin {
        require(election.isActive && !election.isFinalized, "Election is not active or already finalized");
        
        candidates.push(Candidate({
            name: _name,
            party: _party,
            voteCount: 0,
            isActive: true
        }));
        
        emit CandidateAdded(candidates.length - 1, _name, _party);
    }

    function registerVoter(address _voter) external onlyAdmin {
        require(!voters[_voter], "Voter already registered");
        voters[_voter] = true;
    }

    function vote(uint256 _candidateId) external onlyDuringElection {
        require(voters[msg.sender], "Voter not registered");
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId < candidates.length, "Invalid candidate");
        require(candidates[_candidateId].isActive, "Candidate is not active");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVotes++;

        emit VoteCast(msg.sender, _candidateId);
    }

    function finalizeElection() external onlyAdmin onlyAfterElection {
        require(!election.isFinalized, "Election already finalized");
        election.isFinalized = true;
        emit ElectionFinalized(totalVotes);
    }

    // View functions
    function getCandidateCount() external view returns (uint256) {
        return candidates.length;
    }

    function getCandidate(uint256 _candidateId) external view returns (
        string memory name,
        string memory party,
        uint256 voteCount,
        bool isActive
    ) {
        require(_candidateId < candidates.length, "Invalid candidate ID");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.name, candidate.party, candidate.voteCount, candidate.isActive);
    }

    function getVoterStatus(address _voter) external view returns (
        bool isRegistered,
        bool voted
    ) {
        return (voters[_voter], hasVoted[_voter]);
    }

    function getElectionInfo() external view returns (
        string memory title,
        string memory description,
        uint256 startTime,
        uint256 endTime,
        bool isActive,
        bool isFinalized,
        uint256 voteCount
    ) {
        return (
            election.title,
            election.description,
            election.startTime,
            election.endTime,
            election.isActive,
            election.isFinalized,
            totalVotes
        );
    }

    function getResults() external view returns (
        uint256[] memory candidateVotes,
        string[] memory candidateNames,
        string[] memory candidateParties
    ) {
        uint256 candidateCount = candidates.length;
        candidateVotes = new uint256[](candidateCount);
        candidateNames = new string[](candidateCount);
        candidateParties = new string[](candidateCount);
        
        for (uint256 i = 0; i < candidateCount; i++) {
            candidateVotes[i] = candidates[i].voteCount;
            candidateNames[i] = candidates[i].name;
            candidateParties[i] = candidates[i].party;
        }
    }
}
