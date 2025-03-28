import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Flag from 'react-world-flags'
import { X } from "lucide-react"
import TestingLayout from '@/layouts/TestingLayout'
import { useCandidates } from '@/hooks/useCandidiates'
import Cookies from 'js-cookie'
import { useQuery } from '@tanstack/react-query'
import { getSingleOnboardedCandidateInfo } from '@/lib/actions/acs.actions'

const initialCountries = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' }
]

export default function CandidateInformation() {
    const [countries, setCountries] = useState(initialCountries)

    const removeCountry = (codeToRemove: string) => {
        setCountries(countries.filter(country => country.code !== codeToRemove))
    };
    
    const { data: allCandidates, isLoading } = useQuery({
        queryKey: ["onboardedCandidates"],
        queryFn: ()=>getSingleOnboardedCandidateInfo("daramoladayo2030@gmail.com"),
        staleTime: 5 * 60 * 1000,
      });
console.log(allCandidates)
    return (
        <TestingLayout>
            <section className="pt-16 lg:pt-0 px-4 pb-4 md:px-6 md:pb-6 space-y-6 md:space-y-8">
                {/* Personal Data Section */}
                <div className="space-y-4 md:space-y-6">
                    <h2 className="text-xl md:text-2xl font-semibold">Personal Data</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-4">
                            <Label className="font-medium">Full Name</Label>
                            <Input placeholder="Desire" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-4">
                            <Label className="font-medium">Personal Email Address</Label>
                            <Input placeholder="desire@gmail.com" type="email" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-4">
                            <Label className="font-medium">Personal Phone Number</Label>
                            <Input placeholder="+234 704 437 8863" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-4">
                            <Label className="font-medium">Personal WhatsApp Number</Label>
                            <Input placeholder="+234 704 437 8863" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-4">
                            <Label className="font-medium">Gender</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Female" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-4">
                            <Label className="font-medium">Age</Label>
                            <Input placeholder="41 Years old" />
                        </div>
                    </div>
                </div>

                {/* Educational Data Section */}
                <div className="space-y-4 md:space-y-6">
                    <h2 className="text-xl md:text-2xl font-semibold">Educational Data</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Graduate of</Label>
                            <Input placeholder="A University" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Name of University</Label>
                            <Input placeholder="Kwame Nkrumah University of Science and Technology" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Kind of Degree</Label>
                            <Input placeholder="Bachelor of Arts" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Course of Study Graduated from</Label>
                            <Input placeholder="Chemical Engineering" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Class of Degree</Label>
                            <Input placeholder="First Class" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Specific CGPA</Label>
                            <Input placeholder="3.55/4" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Do you have a masters degree?</Label>
                            <RadioGroup defaultValue="yes" className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="yes" />
                                    <Label htmlFor="yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="no" />
                                    <Label htmlFor="no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Kind of degree</Label>
                            <Input placeholder="Master of Science" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Course of Study Graduated from with master</Label>
                            <Input placeholder="Mass Communication" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Class of Degree</Label>
                            <Input placeholder="First Class" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Specific CGPA for Masters</Label>
                            <Input placeholder="3.55/4" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Country you are INTERESTED in</Label>
                            <div className="flex flex-wrap gap-2 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2">
                                {countries.map((country) => (
                                    <div 
                                        key={country.code} 
                                        className="flex items-center gap-1.5 bg-secondary px-2 py-1 rounded-md text-sm"
                                    >
                                        <Flag code={country.code} className="w-4 h-3" />
                                        <span>{country.name}</span>
                                        <X 
                                            className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" 
                                            onClick={() => removeCountry(country.code)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Type of Academic Degree Interested in Abroad</Label>
                            <Input placeholder="MBA" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Academic program or course in mind that aligns with your professional experience</Label>
                            <Input placeholder="Open to Recommendation" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Are you opened to taking the GMAT or GRE if it is required</Label>
                            <RadioGroup defaultValue="yes" className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="gmat-yes" />
                                    <Label htmlFor="gmat-yes">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="gmat-no" />
                                    <Label htmlFor="gmat-no">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:items-center md:gap-8">
                            <Label className="font-medium">Preferred Universities</Label>
                            <Input placeholder="Enter preferred universities" />
                        </div>
                    </div>
                </div>
            </section>
        </TestingLayout>
    )
}
