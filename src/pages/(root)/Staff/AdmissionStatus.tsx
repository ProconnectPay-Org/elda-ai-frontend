"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import RootLayout from '@/layouts/RootLayout'

const admissionStatusSchema = z.object({
  university1: z.string().min(1, "Please select a university"),
  course1: z.string().min(1, "Please select a course"),
  status1: z.enum(["Admitted", "Declined"]),
  university2: z.string().min(1, "Please select a university"),
  course2: z.string().min(1, "Please select a course"),
  status2: z.enum(["Admitted", "Declined"])
})

type AdmissionStatusForm = z.infer<typeof admissionStatusSchema>

export default function AdmissionStatus() {
  const form = useForm<AdmissionStatusForm>({
    resolver: zodResolver(admissionStatusSchema),
    defaultValues: {
      university1: "",
      course1: "",
      status1: "Declined",
      university2: "",
      course2: "",
      status2: "Declined"
    }
  })

  function onSubmit(data: AdmissionStatusForm) {
    console.log(data)
  }

  return (
    <RootLayout title="Dashboard">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admission Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">University 1</label>
                    <Select
                      name="university1"
                      onValueChange={(value) => form.setValue("university1", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select university" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uni1">University One</SelectItem>
                        <SelectItem value="uni2">University Two</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course 1</label>
                    <Select
                      name="course1"
                      onValueChange={(value) => form.setValue("course1", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course1">Course One</SelectItem>
                        <SelectItem value="course2">Course Two</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-4 justify-end">
                      <Button 
                      className="border border-red text-red font-bold hover:text-red"
                        type="button" 
                        variant="outline"
                        onClick={() => form.setValue("status1", "Declined")}
                      >
                        Declined
                      </Button>
                      <Button 
                        type="button"
                        variant={form.watch("status1") === "Admitted" ? "destructive" : "destructive"}
                        onClick={() => form.setValue("status1", "Admitted")}
                      >
                        Admitted
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">University 2</label>
                    <Select
                      name="university2"
                      onValueChange={(value) => form.setValue("university2", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select university" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uni1">University One</SelectItem>
                        <SelectItem value="uni2">University Two</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course 2</label>
                    <Select
                      name="course2"
                      onValueChange={(value) => form.setValue("course2", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="course1">Course One</SelectItem>
                        <SelectItem value="course2">Course Two</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex gap-4 justify-end">
                      <Button 
                      className="border border-red text-red font-bold hover:text-red"
                        type="button"
                        variant="outline"
                        onClick={() => form.setValue("status2", "Declined")}
                      >
                        Declined
                      </Button>
                      <Button 
                        type="button"
                        variant={form.watch("status2") === "Admitted" ? "destructive" : "destructive"}
                        onClick={() => form.setValue("status2", "Admitted")}
                      >
                        Admitted
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </RootLayout>
  )
}
