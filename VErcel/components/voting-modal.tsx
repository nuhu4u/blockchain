"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Vote, Shield, CheckCircle, AlertTriangle, User, Fingerprint, Lock, Eye, X } from "lucide-react"
import { useUserAuth } from "@/hooks/useUserAuth"
import { ElectionService } from "@/lib/services/electionService"
import { STATIC_CANDIDATES } from "@/lib/data/candidates"
import { useToast } from "@/components/toast"
import { LoadingButton } from "@/components/loading-states"
import { EnhancedErrorHandler } from "@/lib/enhanced-error-handler"

interface Candidate {
  id: string
  name: string
  party: string
  partyPicture: string
  age: number
  qualification: string
  runningMate?: string
}

interface Election {
  id: string
  title: string
  type: string
  status: string
  endTime: string
  hasVoted: boolean
  candidates: any[]
  contestants?: any[]
}

interface VoterInfo {
  name: string
  voterId: string
  blockchainAddress: string
  pollingUnit: string
  ward: string
  lga: string
  state: string
}

interface VotingModalProps {
  isOpen: boolean
  onClose: () => void
  election: Election | undefined
  voterInfo: VoterInfo
  onVoteSuccess?: () => void
}

type VotingStep = "verification" | "ballot" | "confirmation" | "submission" | "success"

export function VotingModal({ isOpen, onClose, election, voterInfo, onVoteSuccess }: VotingModalProps) {
  const { success, error: showError, loading } = useToast()
  const [currentStep, setCurrentStep] = useState<VotingStep>("verification")
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null)
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [voteHash, setVoteHash] = useState<string>("")
  const [votePosition, setVotePosition] = useState<number>(0)
  const [voteError, setVoteError] = useState<string>("")
  const [voteStatus, setVoteStatus] = useState<string>("success") // success, pending_chain
  const [isRetrying, setIsRetrying] = useState(false)

  const { token, isAuthenticated } = useUserAuth()

  // Use actual election contestants if available, otherwise fallback to static candidates
  const getCandidates = (): Candidate[] => {
    if (election?.contestants && election.contestants.length > 0) {
      
      // Static candidate data to preserve original details
      const staticCandidates = [
        {
          id: "candidate-1",
          name: "Adebayo Ogundimu",
          party: "All Progressives Congress (APC)",
          partyPicture: "/party-logos/apc.webp",
          age: 58,
          qualification: "PhD Political Science, Former Governor",
          runningMate: "Dr. Fatima Abdullahi",
        },
        {
          id: "candidate-2", 
          name: "Chinwe Okonkwo",
          party: "People's Democratic Party (PDP)",
          partyPicture: "/party-logos/pdp.webp",
          age: 52,
          qualification: "MBA Business Administration, Former Senator",
          runningMate: "Alhaji Ibrahim Musa",
        },
        {
          id: "candidate-3",
          name: "Emmanuel Okafor",
          party: "Labour Party (LP)",
          partyPicture: "/party-logos/labour-party.jpg",
          age: 45,
          qualification: "LLB Law, Human Rights Activist",
          runningMate: "Dr. Aisha Bello",
        },
        {
          id: "candidate-4",
          name: "Fatima Ibrahim",
          party: "New Nigeria People's Party (NNPP)",
          partyPicture: "/party-logos/nnpp.jpg",
          age: 49,
          qualification: "MSc Economics, Former Minister",
          runningMate: "Chief Olumide Adebayo",
        }
      ];

      // Use actual election contestants with their party pictures
      return election.contestants.map((contestant, index) => {
        const staticCandidate = staticCandidates[index] || staticCandidates[0]; // Fallback for missing data
        
        return {
          id: contestant.id || staticCandidate.id,
          name: contestant.name || staticCandidate.name, // Use edited name from election
          party: contestant.party || staticCandidate.party, // Use actual party from election
          partyPicture: contestant.partyPicture || staticCandidate.partyPicture, // Use actual party picture from election
          age: staticCandidate.age, // Keep original age
          qualification: staticCandidate.qualification, // Keep original qualification
          runningMate: contestant.running_mate || contestant.runningMate || staticCandidate.runningMate // Use actual running mate from election
        };
      });
    }
    
    // Fallback to static candidates if no election contestants
    return [
      {
        id: "candidate-1",
        name: "Adebayo Ogundimu",
        party: "All Progressives Congress (APC)",
        partyPicture: "/party-logos/apc.webp",
        age: 58,
        qualification: "PhD Political Science, Former Governor",
        runningMate: "Dr. Fatima Abdullahi",
      },
      {
        id: "candidate-2",
        name: "Chinedu Okwu",
        party: "Peoples Democratic Party (PDP)",
        partyPicture: "/party-logos/pdp.webp",
        age: 62,
        qualification: "LLB, Former Senator",
        runningMate: "Prof. Amina Hassan",
      },
      {
        id: "candidate-3",
        name: "Ibrahim Musa",
        party: "Labour Party (LP)",
        partyPicture: "/party-logos/labour-party.jpg",
        age: 55,
        qualification: "MBA, Business Executive",
        runningMate: "Mrs. Grace Okafor",
      },
      {
        id: "candidate-4",
        name: "Funmilayo Adeyemi",
        party: "New Nigeria Peoples Party (NNPP)",
        partyPicture: "/party-logos/nnpp.jpg",
        age: 51,
        qualification: "MSc Economics, Former Minister",
        runningMate: "Alhaji Suleiman Bello",
      },
    ];
  };

  const nigerianCandidates: Candidate[] = getCandidates();

  const handleVerificationComplete = () => {
    setCurrentStep("ballot")
  }

  const handleCandidateSelect = (candidateId: string) => {
    setSelectedCandidate(candidateId)
  }

  const handleProceedToConfirmation = () => {
    if (selectedCandidate) {
      setCurrentStep("confirmation")
    }
  }

  const handleConfirmVote = async () => {
    setCurrentStep("submission")
    setIsSubmitting(true)
    setVoteError("")

    try {
      // Show loading toast
      loading("Casting your vote", "Please wait while we process your vote...")

      // Get the candidate ID from the selected candidate
      const selectedCandidateData = nigerianCandidates.find((c) => c.id === selectedCandidate);
      if (!selectedCandidateData) {
        throw new Error('Selected candidate not found');
      }

      // Find the candidate in the election's contestants by ID or name
      const electionCandidate = election?.contestants?.find((c) => 
        c.id === selectedCandidate || c.name === selectedCandidateData.name
      );
      
      if (!electionCandidate) {
        throw new Error('Candidate not found in this election');
      }

      // Submit vote to the backend using cookie-based authentication
      // Safety check for election ID
      if (!election?.id) {
        throw new Error('Election ID is missing. Please refresh the page and try again.');
      }
      
      const response = await fetch(`/api/elections/${election.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          candidate_id: electionCandidate.id
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || 'Failed to cast vote');
      }

      // Set the vote details from the response
      setVoteHash(result.transaction_hash || result.voteHash || `0x${Date.now().toString(16)}`);
      setVotePosition(result.vote_position || result.votePosition || Date.now());
      setVoteStatus(result.status || "success");
      
      setIsSubmitting(false);
      setCurrentStep("success");
      
      // Show success toast based on status
      if (result.status === "pending_chain") {
        success("Vote Submitted!", "Your vote has been recorded and will be synced to blockchain shortly.")
      } else {
        success("Vote Cast Successfully!", "Your vote has been recorded and confirmed on blockchain.")
      }
      
      // Call onVoteSuccess callback if provided
      if (onVoteSuccess) {
        onVoteSuccess();
      }
    } catch (error) {
      setIsSubmitting(false);
      setCurrentStep("confirmation");
      
      // Get user-friendly error message
      const friendlyMessage = EnhancedErrorHandler.getUserFriendlyMessage(error);
      const suggestedActions = EnhancedErrorHandler.getSuggestedActions(error);
      
      setVoteError(friendlyMessage);
      
      // Show error toast with suggested actions
      showError(
        "Vote Casting Failed", 
        `${friendlyMessage}${suggestedActions.length > 0 ? ` Suggested actions: ${suggestedActions.join(', ')}` : ''}`
      );
    }
  }

  const handleClose = () => {
    setCurrentStep("verification")
    setSelectedCandidate(null)
    setVoteHash("")
    setVotePosition(0)
    setVoteError("")
    setVoteStatus("success")
    setIsRetrying(false)
    onClose()
  }

  const handleRetrySync = async () => {
    if (!election || !selectedCandidate) return;
    
    setIsRetrying(true);
    try {
      // Call retry endpoint (to be implemented in backend)
      const response = await fetch(`/api/elections/${election.id}/retry-sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (response.ok) {
        if (result.status === "success") {
          setVoteHash(result.transaction_hash);
          setVoteStatus("success");
          success("Sync Successful!", "Your vote has been successfully synced to blockchain.");
        } else {
          showError("Sync Failed", "Unable to sync vote to blockchain. Please try again later.");
        }
      } else {
        throw new Error(result.message || 'Sync failed');
      }
    } catch (error) {
      showError("Sync Error", "Failed to retry blockchain sync. Please try again later.");
    } finally {
      setIsRetrying(false);
    }
  }

  if (!election) return null

  const selectedCandidateData = nigerianCandidates.find((c) => c.id === selectedCandidate)

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Vote className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <DialogTitle className="text-xl">{election.title}</DialogTitle>
                <DialogDescription>
                  {election.type} Election • {voterInfo.state} State
                </DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Voting Progress</span>
            <span className="text-sm text-slate-600">
              Step{" "}
              {currentStep === "verification"
                ? 1
                : currentStep === "ballot"
                  ? 2
                  : currentStep === "confirmation"
                    ? 3
                    : currentStep === "submission"
                      ? 4
                      : 5}{" "}
              of 5
            </span>
          </div>
          <Progress
            value={
              currentStep === "verification"
                ? 20
                : currentStep === "ballot"
                  ? 40
                  : currentStep === "confirmation"
                    ? 60
                    : currentStep === "submission"
                      ? 80
                      : 100
            }
            className="h-2"
          />
        </div>

        {/* Step 1: Voter Verification */}
        {currentStep === "verification" && (
          <div className="space-y-6">
            <Alert className="border-blue-200 bg-blue-50">
              <Shield className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Voter Verification Required:</strong> Please confirm your identity before proceeding to cast
                your vote.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Voter Information Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Full Name</p>
                      <p className="font-semibold">{voterInfo.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Voter ID</p>
                      <p className="font-mono text-sm font-semibold">{voterInfo.voterId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Polling Unit</p>
                      <p className="text-sm">{voterInfo.pollingUnit}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-slate-600">Ward</p>
                      <p className="text-sm">{voterInfo.ward}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Local Government Area</p>
                      <p className="text-sm">{voterInfo.lga}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">State</p>
                      <p className="text-sm">{voterInfo.state}</p>
                    </div>
                  </div>
                </div>

                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Important:</strong> Ensure all information above is correct. You can only vote once per
                    election.
                  </AlertDescription>
                </Alert>

                <Button
                  onClick={handleVerificationComplete}
                  className="w-full bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirm Identity & Proceed to Ballot
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Electronic Ballot Paper */}
        {currentStep === "ballot" && (
          <div className="space-y-6">
            <div className="text-center border-2 border-green-600 bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-green-800 mb-2">OFFICIAL BALLOT PAPER</h3>
              <div className="text-sm text-green-700">
                <p>
                  <strong>FEDERAL REPUBLIC OF NIGERIA</strong>
                </p>
                <p>INDEPENDENT NATIONAL ELECTORAL COMMISSION (INEC)</p>
                <p className="mt-2">{election.title}</p>
                <p>
                  {voterInfo.state} STATE • {voterInfo.lga} LGA • {voterInfo.ward}
                </p>
              </div>
            </div>

            <Alert className="border-orange-200 bg-orange-50">
              <Vote className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Voting Instructions:</strong> Select ONE candidate by clicking on their box. Your choice will be
                highlighted in green.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h4 className="font-semibold text-center text-lg">SELECT YOUR CANDIDATE</h4>

              {nigerianCandidates.map((candidate) => (
                <Card
                  key={candidate.id}
                  className={`cursor-pointer transition-all border-2 ${
                    selectedCandidate === candidate.id
                      ? "border-green-500 bg-green-50 shadow-lg"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                  }`}
                  onClick={() => handleCandidateSelect(candidate.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      {/* Selection Box */}
                      <div
                        className={`w-8 h-8 border-2 rounded flex items-center justify-center ${
                          selectedCandidate === candidate.id ? "border-green-500 bg-green-500" : "border-slate-400"
                        }`}
                      >
                        {selectedCandidate === candidate.id && <CheckCircle className="h-5 w-5 text-white" />}
                      </div>

                      {/* Party Logo */}
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                        <img
                          src={candidate.partyPicture || "/placeholder-user.jpg"}
                          alt={`${candidate.party} picture`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>

                      {/* Candidate Info */}
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-bold text-lg text-slate-900">{candidate.name}</h5>
                            <p className="text-sm font-semibold text-blue-600">{candidate.party}</p>
                            <p className="text-xs text-slate-600">
                              Age: {candidate.age} • {candidate.qualification}
                            </p>
                          </div>
                          {candidate.runningMate && (
                            <div>
                              <p className="text-sm font-medium text-slate-700">Running Mate:</p>
                              <p className="text-sm text-slate-600">{candidate.runningMate}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Selection Indicator */}
                      {selectedCandidate === candidate.id && (
                        <div className="text-green-600">
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            SELECTED
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setCurrentStep("verification")} className="bg-transparent">
                Back to Verification
              </Button>
              <Button
                onClick={handleProceedToConfirmation}
                disabled={!selectedCandidate}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Proceed to Confirmation
                <CheckCircle className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Vote Confirmation */}
        {currentStep === "confirmation" && selectedCandidateData && (
          <div className="space-y-6">
            {voteError && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  <strong>Error:</strong> {voteError}
                </AlertDescription>
              </Alert>
            )}
            
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Final Confirmation:</strong> Please review your selection carefully. Once submitted, your vote
                cannot be changed.
              </AlertDescription>
            </Alert>

            <Card className="border-2 border-blue-500">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-center text-blue-900">VOTE CONFIRMATION</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg mx-auto flex items-center justify-center">
                    <img
                      src={selectedCandidateData.partyPicture || "/placeholder-user.jpg"}
                      alt={`${selectedCandidateData.party} picture`}
                      className="w-16 h-16 object-contain"
                    />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{selectedCandidateData.name}</h3>
                    <p className="text-lg font-semibold text-blue-600">{selectedCandidateData.party}</p>
                    {selectedCandidateData.runningMate && (
                      <p className="text-sm text-slate-600 mt-2">Running Mate: {selectedCandidateData.runningMate}</p>
                    )}
                  </div>

                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      ✓ You have selected {selectedCandidateData.name} as your choice for {election.title}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Vote Details:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div><strong>Election:</strong> {election.title}</div>
                    <div><strong>Election Type:</strong> {election.type}</div>
                      <div><strong>Voter ID:</strong> {voterInfo.voterId}</div>
                    <div><strong>Voter Name:</strong> {voterInfo.name}</div>
                    <div><strong>Polling Unit:</strong> {voterInfo.pollingUnit || 'N/A'}</div>
                    <div><strong>Ward:</strong> {voterInfo.ward || 'N/A'}</div>
                    <div><strong>LGA:</strong> {voterInfo.lga || 'N/A'}</div>
                    <div><strong>State:</strong> {voterInfo.state || 'N/A'}</div>
                      <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                    <div><strong>Time:</strong> {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep("ballot")} className="bg-transparent">
                Back to Ballot
              </Button>
              <Button onClick={handleConfirmVote} className="bg-green-600 hover:bg-green-700" size="lg">
                <Fingerprint className="h-4 w-4 mr-2" />
                Cast My Vote
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Vote Submission */}
        {currentStep === "submission" && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-blue-600 animate-pulse" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Submitting Your Vote</h3>
              <p className="text-slate-600">Please wait while we securely record your vote on the blockchain...</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>

              <div className="text-sm text-slate-600 space-y-1">
                <p>✓ Encrypting vote data</p>
                <p>✓ Generating blockchain transaction</p>
                <p>✓ Recording vote on distributed ledger</p>
                <p className="animate-pulse">⏳ Confirming transaction...</p>
              </div>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Your vote is being encrypted and recorded on the blockchain for maximum security and transparency.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Error Display */}
        {voteError && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {voteError}
            </AlertDescription>
          </Alert>
        )}

        {/* Step 5: Success */}
        {currentStep === "success" && selectedCandidateData && (
          <div className="space-y-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                {voteStatus === "success" ? "Vote Successfully Cast!" : "Vote Submitted!"}
              </h3>
              <p className="text-slate-600">
                {voteStatus === "success" 
                  ? "Your vote has been securely recorded and confirmed on blockchain." 
                  : "Your vote has been recorded and will be synced to blockchain shortly."}
              </p>
            </div>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-900 mb-2">Vote Confirmation Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-green-700">
                          <strong>Election:</strong> {election.title}
                        </p>
                        <p className="text-green-700">
                          <strong>Election Type:</strong> {election.type}
                        </p>
                        <p className="text-green-700">
                          <strong>Candidate:</strong> {selectedCandidateData.name}
                        </p>
                        <p className="text-green-700">
                          <strong>Party:</strong> {selectedCandidateData.party}
                        </p>
                        {selectedCandidateData.runningMate && (
                          <p className="text-green-700">
                            <strong>Running Mate:</strong> {selectedCandidateData.runningMate}
                          </p>
                        )}
                      </div>
                      <div>
                        <p className="text-green-700">
                          <strong>Voter ID:</strong> {voterInfo.voterId}
                        </p>
                        <p className="text-green-700">
                          <strong>Voter Name:</strong> {voterInfo.name}
                        </p>
                        <p className="text-green-700">
                          <strong>Vote Position:</strong> #{votePosition}
                        </p>
                        <p className="text-green-700">
                          <strong>Timestamp:</strong> {new Date().toLocaleString()}
                        </p>
                        <p className="text-green-700">
                          <strong>Status:</strong> 
                          <span className={`ml-1 px-2 py-1 rounded text-xs ${
                            voteStatus === "success" 
                              ? "bg-green-200 text-green-800" 
                              : "bg-yellow-200 text-yellow-800"
                          }`}>
                            {voteStatus === "success" ? "Confirmed on Blockchain" : "Pending Blockchain Sync"}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-green-200">
                    <p className="text-xs text-green-700 mb-2">
                      <strong>Blockchain Transaction Hash:</strong>
                    </p>
                    <p className="font-mono text-xs bg-white p-2 rounded border break-all">
                      {voteStatus === "success" ? voteHash : "pending..."}
                    </p>
                    {voteStatus === "pending_chain" && (
                      <div className="mt-3">
                        <Button 
                          onClick={handleRetrySync}
                          disabled={isRetrying}
                          size="sm"
                          variant="outline"
                          className="text-yellow-700 border-yellow-300 hover:bg-yellow-50"
                        >
                          {isRetrying ? "Retrying..." : "Retry Blockchain Sync"}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="border-blue-200 bg-blue-50">
              <Eye className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Your vote is now part of the permanent blockchain record. You can track the election results in
                real-time from your dashboard.
              </AlertDescription>
            </Alert>

            <Button onClick={handleClose} className="bg-green-600 hover:bg-green-700" size="lg">
              Return to Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
