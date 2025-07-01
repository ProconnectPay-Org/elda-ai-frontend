import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdminSignIn, CandidateLogin, CandidateOTP, Home } from "./pages";
import {
  AdmissionStatus,
  AssignedCandidates,
  CandidateProfile,
  FinalResume,
  Profile,
  RefineResume,
  SchoolOne,
  SchoolTwo,
} from "./pages/(root)/Staff";
import RegistrationForm from "./pages/(root)/Candidates/CandidateForm/RegistrationForm";
import {
  AdminDashboard,
  AdminSecurity,
  AdminSettings,
  AssignCandidate,
  CandidatePage,
  Candidates,
  CreateCandidateProfile,
  InterestedCandidates,
  InviteEmployee,
  OnboardedCandidates,
  Staff,
  ViewComplaints,
} from "./pages/(root)/SuperAdmin";
import {
  CandidateStatus,
  CandidateView,
  Complaints,
  Feedback,
  LinkedInMasterclass,
  Onboard,
} from "./pages/(root)/Candidates";
import CraftSOP from "./pages/(root)/Staff/CraftSOP";
import CandidateSelection from "./pages/(root)/Staff/CandidateSelection";
import DownloadResume from "./pages/(root)/DownloadResume";
import SopTemplate from "./components/SopTemplate";
import GeneratePDF from "./components/GeneratePDF";
import { ACSDashboard } from "./pages/(root)/ACS";
import {
  CandidateInformation,
  CandidateStatusPage,
} from "./pages/(root)/CandidatesNew";
import LinkedInMasterClass from "./pages/(root)/CandidatesNew/LinkedInMasterClass";
import UsingPortal from "./pages/(root)/CandidatesNew/UsingPortal";
import TownHall from "./pages/(root)/CandidatesNew/TownHall";
import OtherInformation from "./pages/(root)/CandidatesNew/OtherInformation";
import AdmissionStatusPrompt from "./pages/(root)/CandidatesNew/AdmissionStatusPrompt";
import Error404 from "./pages/(root)/Error404";
import Settings from "./pages/(root)/CandidatesNew/Settings";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<ForgotPassword />} path="/forgot-password" />
        <Route element={<GeneratePDF />} path="/pdf/:id" />
        {/* <Route element={<SignUp />} path="/sign-up" /> */}
        <Route element={<DownloadResume />} path="/download-resume/:id" />
        <Route element={<SopTemplate />} path="/sop/:id" />
        {/* SUPER ADMIN */}
        <Route element={<AdminSignIn />} path="/sign-in" />
        <Route element={<AdminDashboard />} path="/admin-dashboard" />
        <Route element={<OnboardedCandidates />} path="/admin/tables/onboard" />
        <Route
          element={<InterestedCandidates />}
          path="/admin/tables/interest"
        />
        <Route
          element={<CreateCandidateProfile />}
          path="/admin/create-candidate-profile/:id?"
        />
        <Route element={<CandidatePage />} path="/candidates/:id" />
        <Route element={<InviteEmployee />} path="/admin/invite-employee" />
        <Route element={<AssignCandidate />} path="/assign-candidate" />
        <Route element={<Staff />} path="/staff" />
        <Route element={<Candidates />} path="/candidates" />
        <Route element={<AdminSettings />} path="settings/account" />
        <Route element={<AdminSecurity />} path="settings/security" />
        <Route element={<ViewComplaints />} path="/view/complaints" />
        {/* STAFF */}
        <Route element={<AssignedCandidates />} path="/assigned-candidates" />
        <Route element={<CandidateProfile />} path="/assigned-candidates/:id" />
        <Route element={<CraftSOP />} path="/craft-sop/:id" />
        <Route path="/refine-resume" element={<CandidateSelection />} />
        <Route path="/craft-sop" element={<CandidateSelection />} />
        <Route path="/school-one/:id" element={<SchoolOne />} />
        <Route path="/school-two/:id" element={<SchoolTwo />} />
        <Route path="/admission-status/:id" element={<AdmissionStatus />} />
        <Route
          element={<FinalResume />}
          path="/refine-resume/final-resume/:id"
        />
        <Route element={<RefineResume />} path="/refine-resume/:id" />
        <Route element={<Profile />} path="/profile" />
        {/* CANDIDATES */}
        <Route element={<RegistrationForm />} path="/register" />
        <Route element={<CandidateLogin />} path="/candidate/login" />
        <Route element={<Onboard />} path="/onboard" />
        <Route element={<CandidateOTP />} path="/candidate/otp" />
        <Route element={<CandidateStatus />} path="/candidate/status" />
        <Route element={<CandidateView />} path="/candidate/view" />
        <Route element={<Feedback />} path="/feedback" />
        <Route element={<LinkedInMasterclass />} path="/masterclass" />
        <Route element={<Complaints />} path="/complaints" />
        {/* ACADEMIC COUNSELOR */}
        <Route element={<ACSDashboard />} path="/acs-dashboard/:id?" />

        {/* New Candidate Page UI */}
        <Route element={<CandidateStatusPage />} path="/candidate-status" />
        <Route element={<LinkedInMasterClass />} path="/linkedin-masterclass" />
        <Route element={<UsingPortal />} path="/portal-usage" />
        <Route element={<TownHall />} path="/weekly-townhall" />
        <Route element={<OtherInformation />} path="/other-info" />
        <Route
          element={<AdmissionStatusPrompt />}
          path="/admission-status-prompt"
        />
        <Route element={<CandidateInformation />} path="/candidate-info" />
        <Route element={<Settings />} path="/candidate-settings" />

        <Route element={<Error404 />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
