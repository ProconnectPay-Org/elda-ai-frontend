import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CandidateLogin, Home, SignIn } from "./pages";
import {
  AssignedCandidates,
  CandidateProfile,
  CraftSOP,
  Profile,
  RefineResume,
  Step2,
  Step3,
  Step4,
} from "./pages/(root)/Staff";
import RegistrationForm from "./pages/(root)/Candidates/CandidateForm/RegistrationForm";
import {
  AdminDashboard,
  AdminSecurity,
  AdminSettings,
  AssignCandidate,
  Candidates,
  CreateCandidateProfile,
  InviteEmployee,
  Staff,
} from "./pages/(root)/SuperAdmin";
import { Toaster } from "./components/ui/toaster";
import { CandidateStatus, CandidateView, LinkedInMasterclass } from "./pages/(root)/Candidates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        {/* <Route element={<SignUp />} path="/sign-up" /> */}
        {/* SUPER ADMIN */}
        <Route element={<AdminDashboard />} path="/admin-dashboard" />
        <Route
          element={<CreateCandidateProfile />}
          path="/admin/create-candidate-profile"
        />
        <Route element={<InviteEmployee />} path="/admin/invite-employee" />
        <Route element={<AssignCandidate />} path="/admin/assign-candidate" />
        <Route element={<Staff />} path="/staff" />
        <Route element={<Candidates />} path="/candidates" />
        <Route element={<AdminSettings />} path="settings/account" />
        <Route element={<AdminSecurity />} path="settings/security" />

        {/* STAFF */}

        <Route element={<AssignedCandidates />} path="/assigned-candidates" />
        <Route element={<CandidateProfile />} path="/assigned-candidates/:id" />
        <Route element={<CraftSOP />} path="/craft-sop" />
        <Route element={<Step2 />} path="/craft-sop/2" />
        <Route element={<Step3 />} path="/craft-sop/3" />
        <Route element={<Step4 />} path="/craft-sop/4" />
        <Route element={<RefineResume />} path="/refine-resume" />
        <Route element={<Profile />} path="/profile" />

        {/* CANDIDATES */}
        <Route element={<RegistrationForm />} path="/register" />
        <Route element={<CandidateLogin />} path="/candidate-login" />
        <Route element={<CandidateStatus />} path="/candidate-status" />
        <Route element={<CandidateView />} path="/candidate-view" />
        <Route element={<LinkedInMasterclass />} path="/masterclass" />


      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
