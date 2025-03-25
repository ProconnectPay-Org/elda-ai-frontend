import CandidateNewLayout from '@/layouts/CandidateNewLayout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';

export default function AdmissionStatusPrompt() {
  return (
    <CandidateNewLayout>
        <section className="space-y-6 p-6">
            <h1 className="text-2xl font-semibold">Admission Status</h1>
            <div className="space-y-8">
                {/* University 1 Section */}
                <div className="space-y-4">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="University 1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="uni1">University Option 1</SelectItem>
                            <SelectItem value="uni2">University Option 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Course 1" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="course1">Course Option 1</SelectItem>
                            <SelectItem value="course2">Course Option 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex gap-4 justify-end">
                    <Button variant="outline" className="border-red border text-red hover:bg-red-50">
                            Declined
                        </Button>
                        <Button variant="default" className="bg-red hover:bg-red-700">
                            Admitted
                        </Button>
                    </div>
                </div>

                {/* University 2 Section */}
                <div className="space-y-4">
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="University 2" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="uni1">University Option 1</SelectItem>
                            <SelectItem value="uni2">University Option 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Course 2" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="course1">Course Option 1</SelectItem>
                            <SelectItem value="course2">Course Option 2</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="flex gap-4 justify-end">
                        <Button variant="outline" className="border-red border text-red hover:bg-red-50">
                            Declined
                        </Button>
                        <Button variant="default" className="bg-red hover:bg-red-700">
                            Admitted
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </CandidateNewLayout>
  )
}
