"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Smartphone, Download, Copy, ExternalLink } from "lucide-react"
import { mobileAppService } from "@/lib/services/mobileAppService"

interface QRCodeModalProps {
  isOpen: boolean
  onClose: () => void
  electionId: string
  electionTitle: string
}

export function QRCodeModal({ isOpen, onClose, electionId, electionTitle }: QRCodeModalProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const electionDeepLink = mobileAppService.generateElectionDeepLink(electionId, electionTitle)

  useEffect(() => {
    if (isOpen && electionId) {
      generateQRCode()
    }
  }, [isOpen, electionId])

  const generateQRCode = async () => {
    try {
      setIsGenerating(true)
      const qrCode = await mobileAppService.generateQRCode(electionDeepLink.deepLink)
      setQrCodeDataUrl(qrCode)
    } catch (error) {
      } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      const success = await mobileAppService.copyDeepLink(text)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    } catch (error) {
      }
  }

  const handleDownloadApp = () => {
    mobileAppService.showInstallPrompt()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Vote on Mobile App
          </DialogTitle>
          <DialogDescription>
            Scan the QR code with your mobile app to vote in <strong>{electionTitle}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code */}
          <div className="flex flex-col items-center space-y-4">
            {isGenerating ? (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code for mobile voting"
                  className="w-64 h-64"
                />
              </div>
            )}
          </div>

          {/* Instructions */}
          <Alert>
            <Smartphone className="h-4 w-4" />
            <AlertDescription>
              <strong>How to vote:</strong>
              <ol className="mt-2 space-y-1 text-sm">
                <li>1. Download the mobile app if you haven't already</li>
                <li>2. Open the app and scan this QR code</li>
                <li>3. Complete your vote securely on mobile</li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleDownloadApp}
              className="w-full"
              disabled={isGenerating}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Mobile App
            </Button>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => copyToClipboard(electionDeepLink.deepLink)}
                className="flex-1"
                disabled={isGenerating}
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.open(electionDeepLink.webUrl, '_blank')}
                className="flex-1"
                disabled={isGenerating}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Web Link
              </Button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="text-xs text-gray-500 text-center">
            <p>🔒 Voting is restricted to mobile app for enhanced security</p>
            <p>Your biometric data and vote are protected with military-grade encryption</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
