import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  DraftSOP,
  Home,
  NewResume,
  Resumes,
  SOP,
  Settings,
  SignIn,
  SignUp,
} from "./pages";
import {
  AssignedCandidates,
  CandidateProfile,
  CraftSOP,
  Profile,
  RefineResume,
} from "./pages/(root)/Staff";
import RegistrationForm from "./pages/(root)/Candidates/RegistrationForm";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
        {/* SUPER ADMIN */}
        <Route element={<AdminDashboard />} path="/admin-dashboard" />
        <Route element={<CreateCandidateProfile />} path="/admin/create-candidate-profile" />
        <Route element={<InviteEmployee />} path="/admin/invite-employee" />
        <Route element={<AssignCandidate />} path="/admin/assign-candidate" />
        <Route element={<Staff />} path="/staff" />
        <Route element={<Candidates />} path="/candidates" />
        <Route element={<AdminSettings />} path="settings/account" />
        <Route element={<AdminSecurity />} path="settings/security" />

        {/* STAFF */}
        <Route
          element={<DraftSOP />}
          path="/dashboard/draft-statement-of-purpose"
        />
        <Route element={<NewResume />} path="/dashboard/new-resume" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Resumes />} path="/resume" />
        <Route element={<SOP />} path="/sop" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<AssignedCandidates />} path="/assigned-candidates" />
        <Route path="/candidate/:id" element={<CandidateProfile />} />
        <Route element={<CraftSOP />} path="/craft-sop" />
        <Route element={<RefineResume />} path="/refine-resume" />

        {/* CANDIDATES */}
        <Route element={<RegistrationForm />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
