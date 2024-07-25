import RootLayout from "@/layouts/RootLayout";
import BgGradient from "@/assets/profile-gradient.svg";
import Speaker from "@/assets/speaker.svg";
import ProfileTabs from "@/components/ProfileTabs";

const Profile = () => {
  return (
    <RootLayout title="Settings">
      <div className="space-y-10">
        <div className="bg-[#F5F7F9] h-10 flex items-center p-3 gap-2 rounded-lg">
          <img src={Speaker} alt="speaker" />
          <p className="text-xs text-red">
            Complete your personal details information
          </p>
        </div>

        <div className="w-full bg-gray-text overflow-hidden rounded-lg">
          <img src={BgGradient} alt="gradient" className="w-full" />
        </div>

        <div>
          <ProfileTabs />
        </div>
      </div>
    </RootLayout>
  );
};

export default Profile;
