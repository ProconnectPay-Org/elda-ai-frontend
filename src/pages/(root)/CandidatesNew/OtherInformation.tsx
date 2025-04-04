import staff from "../../../assets/staff.png";
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CandidateNewLayout from "@/layouts/CandidateNewLayout";

export default function OtherInformation() {
  return (
    <CandidateNewLayout>
      <section className='flex flex-col gap-6'>
        <h1 className="text-[#1F384C] text-xl md:text-3xl font-bold">Other Information</h1>
        <img src={staff} alt="" className="w-full object-contain" />
        <p className="font-semibold">Connect with other candidates and industry professionals.</p>
        <Link to={"https://www.linkedin.com/groups/9562922/"} target="_blank" >
        <Button className='bg-transparent border-red text-red border'>Join our LinkedIn group</Button>
        </Link>
        <div className='bg-[#F5F7F9] p-8 rounded-lg'>
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">» Next Steps</h2>
          <div className="flex flex-col relative">
            {/* Vertical line that runs through all steps */}
            <div className="absolute left-4 top-4 w-[2px] h-[calc(100%-32px)] bg-blue-600"></div>
            
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">1</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>📋</span> Complete Registration
                  </h3>
                  <p className="text-gray-600">Upload all required documents.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">2</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>👤</span> Assigned Manager
                  </h3>
                  <p className="text-gray-600">Check your email and status dashboard for your assigned manager's details.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">3</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>📝</span> Application Submission
                  </h3>
                  <p className="text-gray-600">Your manager submits two applications approved by the Academic Counseling Team and <span className="text-blue-600">eLDa AI</span>.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">4</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🔑</span> Login Details
                  </h3>
                  <p className="text-gray-600">Find your school and loan application credentials in the portal's status dashboard.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">5</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🎉</span> Admission Offer
                  </h3>
                  <p className="text-gray-600">Send your admission status to info@proconnectpay.com.</p>
                </div>
              </div>

              {/* Step 6 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">6</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>💰</span> Loan Processing
                  </h3>
                  <p className="text-gray-600">Collaborate with the Loan Origination Team to complete your application.</p>
                </div>
              </div>

              {/* Step 7 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">7</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>📄</span> Support Letter
                  </h3>
                  <p className="text-gray-600">Receive your support letter.</p>
                </div>
              </div>

              {/* Step 8 */}
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 bg-white rounded-full border-2 border-blue-600"></div>
                  <div className="absolute inset-0 w-6 h-6 bg-blue-600 rounded-full m-1 flex items-center justify-center text-white">8</div>
                </div>
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    <span>🛂</span> Visa Processing
                  </h3>
                  <p className="text-gray-600"> Manage your visa application independently.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F5F7F9] border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-red-500 mb-6">⚠ Important Notice</h2>
          <div className="space-y-6">
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>💰</span> Application Fees
              </h3>
              <p className="text-gray-600">You are responsible for fees or requesting waivers.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🎓</span> University Follow-ups
              </h3>
              <p className="text-gray-600">If you don't receive a response within 2-4 weeks, follow up directly with the school.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>⭐</span> Admission Notifications
              </h3>
              <p className="text-gray-600">Inform us of your admission decision (acceptance or denial) at info@proconnectpay.com.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>📚</span> Course Concerns
              </h3>
              <p className="text-gray-600">Email aca@proconnectpay.com for any concerns regarding your course.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>❓</span> General Inquiries
              </h3>
              <p className="text-gray-600">For any questions or assistance, contact info@proconnectpay.com.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>💳</span> Loan Inquiries
              </h3>
              <p className="text-gray-600">Email loan@proconnectpay.com for financing-related queries.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🛂</span> Visa Support
              </h3>
              <p className="text-gray-600">Not provided; for assistance, contact essay@epremierco.ca a trusted consultancy.</p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>📎</span> Additional Documents
              </h3>
              <p className="text-gray-600">If a school requests extra information post-submission, you must provide it unless the error is on our part.</p>
            </div>
            
            <hr className="border-gray-200" />
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🤝</span> Our Commitment
              </h3>
              <p className="text-gray-600">We are dedicated to offering the best possible support. If you need help at any stage, reach out to info@proconnectpay.com.</p>
            </div>
            <hr className="border-gray-200" />
            
            <div className="flex justify-end pt-4">
              <div>
                <p className="font-medium text-right">Thank you</p>
                <p className="text-gray-600 text-right">The Proconnect Academic Counseling Team</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CandidateNewLayout>
  )
}
