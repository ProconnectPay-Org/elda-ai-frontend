import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AdminSignIn, CandidateLogin, CandidateOTP, Home } from "./pages";
import {
  AssignedCandidates,
  CandidateProfile,
  FinalResume,
  Profile,
  RefineResume,
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
  InviteEmployee,
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<GeneratePDF />} path="/pdf/:id" />
        {/* <Route element={<SignUp />} path="/sign-up" /> */}
        <Route element={<DownloadResume />} path="/download-resume/:id" />
        <Route element={<SopTemplate />} path="/sop/:id" />
        {/* SUPER ADMIN */}
        <Route element={<AdminSignIn />} path="/sign-in" />
        <Route element={<AdminDashboard />} path="/admin-dashboard" />
        <Route
          element={<CreateCandidateProfile />}
          path="/admin/create-candidate-profile"
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
        <Route path="*" element={<Navigate to="/acs-dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
