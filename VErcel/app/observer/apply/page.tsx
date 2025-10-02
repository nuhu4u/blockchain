"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, ArrowLeft, Upload, CheckCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AuthService } from "@/lib/services/authService";

export default function ObserverApplicationPage() {
  const [formData, setFormData] = useState({
    organizationName: "",
    organizationType: "",
    contactPerson: "",
    position: "",
    email: "",
    phone: "",
    address: "",
    website: "",
    description: "",
    experience: "",
    interestedElections: [] as string[],
    registrationDocument: null as File | null,
    letterOfIntent: null as File | null,
  })
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("");
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }))
    }
  }

  const handleElectionInterest = (election: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      interestedElections: checked
        ? [...prev.interestedElections, election]
        : prev.interestedElections.filter((e) => e !== election),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      // For now, we'll use a mock submission since observer application
      // isn't implemented in the backend yet
      // TODO: Implement proper observer application service
      // await ObserverService.apply(data, token);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Application submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-slate-900">Application Submitted Successfully</CardTitle>
            <CardDescription>Your observer application has been received and is under review</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                <strong>Application Reference:</strong> OBS-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                <br />
                <strong>Status:</strong> Under Review
                <br />
                <strong>Expected Response:</strong> Within 5-7 business days
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">What happens next?</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    1
                  </span>
                  Our team will review your application and supporting documents
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    2
                  </span>
                  We may contact you for additional information or clarification
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    3
                  </span>
                  You'll receive an email notification with the decision
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                    4
                  </span>
                  If approved, you'll receive observer credentials and access instructions
                </li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                <Link href="/elections">View Live Elections</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button variant="ghost" className="mb-4" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center space-x-3 mb-4">
            <Eye className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Observer Application</h1>
              <p className="text-slate-600">Apply for election observer accreditation</p>
            </div>
          </div>
        </div>

        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Observer Requirements:</strong> Only registered NGOs, civil society organizations, academic
            institutions, and international bodies are eligible to apply for observer status. All applications are
            subject to verification and approval.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Organization Information */}
            <Card>
              <CardHeader>
                <CardTitle>Organization Information</CardTitle>
                <CardDescription>Details about your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleInputChange("organizationName", e.target.value)}
                    placeholder="Enter organization name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="organizationType">Organization Type *</Label>
                  <Select
                    value={formData.organizationType}
                    onValueChange={(value) => handleInputChange("organizationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ngo">Non-Governmental Organization (NGO)</SelectItem>
                      <SelectItem value="cso">Civil Society Organization</SelectItem>
                      <SelectItem value="academic">Academic Institution</SelectItem>
                      <SelectItem value="international">International Organization</SelectItem>
                      <SelectItem value="media">Media Organization</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://www.example.org"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Organization Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Enter complete address"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Organization Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of your organization's mission and activities"
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Primary contact person details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                    placeholder="Full name of contact person"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="position">Position/Title *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    placeholder="e.g., Executive Director, Program Manager"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="contact@organization.org"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+234 xxx xxx xxxx"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Election Monitoring Experience</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    placeholder="Describe your organization's experience in election monitoring or related activities"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Election Interest */}
            <Card>
              <CardHeader>
                <CardTitle>Election Interest</CardTitle>
                <CardDescription>Select elections you wish to observe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="presidential"
                      checked={formData.interestedElections.includes("presidential")}
                      onCheckedChange={(checked) => handleElectionInterest("presidential", checked as boolean)}
                    />
                    <Label htmlFor="presidential">Presidential Election 2027</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="governorship"
                      checked={formData.interestedElections.includes("governorship")}
                      onCheckedChange={(checked) => handleElectionInterest("governorship", checked as boolean)}
                    />
                    <Label htmlFor="governorship">Governorship Elections</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="senatorial"
                      checked={formData.interestedElections.includes("senatorial")}
                      onCheckedChange={(checked) => handleElectionInterest("senatorial", checked as boolean)}
                    />
                    <Label htmlFor="senatorial">Senatorial Elections</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="house"
                      checked={formData.interestedElections.includes("house")}
                      onCheckedChange={(checked) => handleElectionInterest("house", checked as boolean)}
                    />
                    <Label htmlFor="house">House of Representatives Elections</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Upload supporting documents for your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="registrationDocument">Organization Registration Certificate *</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="registrationDocument"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-slate-500" />
                        <p className="mb-2 text-sm text-slate-500">
                          <span className="font-semibold">Click to upload</span> registration certificate
                        </p>
                        <p className="text-xs text-slate-500">PDF, PNG, JPG (MAX. 5MB)</p>
                      </div>
                      <input
                        id="registrationDocument"
                        type="file"
                        className="hidden"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileUpload("registrationDocument", e)}
                        required
                      />
                    </label>
                    {formData.registrationDocument && (
                      <p className="mt-2 text-sm text-green-600">✓ {formData.registrationDocument.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="letterOfIntent">Letter of Intent *</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="letterOfIntent"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-slate-500" />
                        <p className="mb-2 text-sm text-slate-500">
                          <span className="font-semibold">Click to upload</span> letter of intent
                        </p>
                        <p className="text-xs text-slate-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                      </div>
                      <input
                        id="letterOfIntent"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload("letterOfIntent", e)}
                        required
                      />
                    </label>
                    {formData.letterOfIntent && (
                      <p className="mt-2 text-sm text-green-600">✓ {formData.letterOfIntent.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms and Submit */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>Please review and accept the observer terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Observer Code of Conduct:</strong>
                    <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                      <li>Maintain strict neutrality and impartiality during observation</li>
                      <li>Do not interfere with the electoral process</li>
                      <li>Report observations accurately and objectively</li>
                      <li>Respect the confidentiality of sensitive information</li>
                      <li>Follow all instructions from election officials</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm text-slate-700 leading-relaxed">
                    I acknowledge that I have read and agree to abide by the Observer Code of Conduct and Terms of
                    Service. I understand that violation of these terms may result in immediate revocation of observer
                    status.
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  size="lg"
                  disabled={!acceptedTerms || isSubmitting}
                >
                  {isSubmitting ? "Submitting Application..." : "Submit Observer Application"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
