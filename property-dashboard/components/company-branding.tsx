"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface CompanyBrandingProps {
  onSave: (logo: string, signature: string) => void
}

export function CompanyBranding({ onSave }: CompanyBrandingProps) {
  const [logo, setLogo] = useState<string>("")
  const [signature, setSignature] = useState<string>("")
  const [previewLogo, setPreviewLogo] = useState<string>("")
  const [previewSignature, setPreviewSignature] = useState<string>("")

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
        setPreviewLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSignature(reader.result as string)
        setPreviewSignature(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    onSave(logo, signature)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Branding</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="logo">Company Logo</Label>
          <Input id="logo" type="file" accept="image/*" onChange={handleLogoChange} />
          {previewLogo && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <Image
                src={previewLogo || "/placeholder.svg"}
                alt="Company Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="signature">Electronic Signature</Label>
          <Input id="signature" type="file" accept="image/*" onChange={handleSignatureChange} />
          {previewSignature && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">Preview:</p>
              <Image
                src={previewSignature || "/placeholder.svg"}
                alt="Signature"
                width={200}
                height={100}
                className="object-contain"
              />
            </div>
          )}
        </div>
        <Button onClick={handleSave} className="w-full">
          Save Branding
        </Button>
      </CardContent>
    </Card>
  )
}

