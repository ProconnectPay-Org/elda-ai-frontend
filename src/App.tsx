import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, DraftSOP, Home, NewResume, Resumes, SOP, Settings, SignIn, SignUp } from "./pages";
import { AssignedCandidates, CraftSOP, Profile, RefineResume } from "./pages/(root)/Staff";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<SignIn />} path="/sign-in" />
        <Route element={<SignUp />} path="/sign-up" />
        <Route element={<DraftSOP />} path="/dashboard/draft-statement-of-purpose" />
        <Route element={<NewResume />} path="/dashboard/new-resume" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<Resumes />} path="/resume" />
        <Route element={<SOP />} path="/sop" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<Profile />} path="/profile" />
        <Route element={<AssignedCandidates />} path="/assigned-candidates" />
        <Route element={<CraftSOP />} path="/craft-sop" />
        <Route element={<RefineResume />} path="/refine-resume" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
