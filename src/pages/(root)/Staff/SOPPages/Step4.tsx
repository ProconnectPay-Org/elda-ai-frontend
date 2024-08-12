import RootLayout from "@/layouts/RootLayout";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SuccessImage from "@/assets/sop-successful.svg";

const Step4 = () => {
  const [showModal, setshowModal] = useState(false);

  const handleShowModal = () => {
    setshowModal((prev) => !prev);
  };

  return (
    <RootLayout title="Draft Statement Of Purpose">
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 lg:p-12">
        <Link to="/craft-sop/3">
          <div className="w-16 cursor-pointer relative mb-5">
            <ChevronLeftIcon color="red" />
            <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
          </div>
        </Link>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-xl md:text-3xl">
            Review New Statement of Purpose
          </h2>

          <div className="flex flex-col gap-5 w-full mx-auto md:w-[760px]">
            <Textarea
              placeholder="Type your message here."
              value="Lorem ipsum dolor sit amet consectetur. A suspendisse ac nisi tristique. Sit venenatis ut mi proin bibendum in vel. In tristique in at fames. Sed odio velit vitae eu id potenti. At massa habitant lacus sed turpis sit vitae. Amet duis cursus iaculis odio mauris tortor sem convallis commodo. Aenean hac adipiscing interdum mattis egestas. Volutpat aliquet justo nunc et. In nulla risus ut mauris cursus ut venenatis semper. Malesuada tellus venenatis amet et in. Eu adipiscing enim risus facilisis nulla tellus ante. Risus enim nunc ipsum ut urna aliquet vel lacus nibh. Dis aliquet neque nibh amet commodo tellus. Pretium tellus urna neque et maecenas nisi id quisque feugiat. Dictumst et mi aenean vestibulum. Nisi augue et dui phasellus. Dolor faucibuscnibh sagittis rhoncus integer consequat lorem nunc. Consequat duis cursus sit erat egestas duis eget lectus magna. Tellus integer ipsum feugiat quam ullamcorper in tincidunt. A a sed at enim neque massa. Elit in tortor habitasse elementum felis morbi neque sed faucibus. Integer nunc blandit ut pellentesque duis velit. Bibendum bibendum vitae tristique in erat montes. Cras id scelerisque enim iaculis sed cras. Vitae in vivamus cras arcu sit. At id iaculis diam dictum a. Quis libero in imperdiet ultrices ut orci urna ac. Aliquet duis mauris turpis commodo a ac congue. Non non semper bibendum sed eu ipsum. Eget eget malesuada volutpat in suscipit tristique nulla velit justo. Euismod diam amet augue placerat viverra nec. Laoreet scelerisque tortor sit ultricies duis. Et et commodo tortor quam. Molestie at quam enim venenatis nullam tellus pellentesque quis ultrices. In elementum tellus nulla sit. Adipiscing sem eget tempus fermentum mauris. Sapien vehicula sed a egestas tempor. Eget commodo nec nulla augue elit viverra enim et. Pretium tincidunt tempor enim fermentum. Turpis auctor commodo amet ac facilisis malesuada. Nisl id nibh tristique commodo nulla et scelerisque. Arcu velit fringilla cursus id consequat nibh tristique. Sit curabitur mi feugiat nunc nunc. Ultricies quis enim faucibus tristique nulla auctor pellentesque. Et praesent integer amet proin sed vitae facilisi faucibus. Ipsum viverra turpis eget euismod egestas elementum nulla auctor consequat. Sem donec vel sed condimentum malesuada et libero. Mattis gravida est fermentum tempus ut faucibus dignissim. Nec velit magnis scelerisque eu. Ut semper risus vitae volutpat urna. Dictum velit gravida ut pharetra. Urna tellus pellentesque massa neque massa. Eu augue vulputate dui massa mauris at tellus mauris gravida. Senectus nec eu pharetra purus vitae nibh volutpat. Volutpat ultrices posuere tellus condimentum dui id non gravida. Id amet justo arcu volutpat diam tristique porta. Adipiscing quis massa et sit adipiscing nulla congue purus non. Sit pulvinar lacinia venenatis arcu volutpat enim quis magnis. Ipsum leo id a pulvinar fusce. Morbi augue quis etiam egestas sit pharetra semper non. Sed laoreet ut tempus venenatis aenean quis quis sem ut. Eu sollicitudin augue et diam vestibulum. Hendrerit aliquam magna risus aliquam faucibus orci. Blandit amet tellus commodo fermentum ipsum. Lorem sed mattis phasellus volutpat lectus nunc cras dapibus. Ornare magna odio nullam praesent. At aliquet justo nullam pharetra adipiscing at. Cursus eget viverra mattis bibendum posuere natoque. Bibendum elit viverra pulvinar sed nulla ut ornare. Felis dictum eget id at mi. Id justo facilisis sed massa. Parturient tincidunt tristique bibendum metus aliquam duis semper malesuada. Ornare sit dolor rutrum semper eget tristique nam amet. Adipiscing mattis proin nisl faucibus vitae. A arcu sem pellentesque risus. Integer tincidunt arcu scelerisque sapien molestie eu neque tincidunt bibendum. Ut rhoncus facilisi non sagittis id quis mauris. Duis porta venenatis tempor blandit leo viverra. Ac pellentesque aenean luctus magna. Euismod tortor et elementum augue feugiat orci sollicitudin rhoncus semper. Pretium et sollicitudin nulla augue nunc et. Sollicitudin amet nisl felis tempus. Ultrices pretium blandit at gravida velit urna in. Fermentum diam pulvinar arcu placerat feugiat tincidunt nam cras. Pretium vitae lacus vitae velit nullam. Condimentum porttitor dictum scelerisque ornare sed. Enim ultricies amet congue enim dolor viverra purus cras volutpat. Habitant ornare lectus sed viverra. Praesent vitae arcu amet et vestibulum accumsan non in nisl. Sapien fermentum amet viverra aliquam. Varius nulla ultricies ac morbi tellus. Commodo lacus interdum in luctus. Suspendisse adipiscing arcu turpis turpis semper urna vitae pharetra diam. Ac iaculis facilisis mauris amet ultrices tellus. Velit quam arcu orci netus quisque suspendisse egestas rutrum ornare. Pellentesque suspendisse ipsum commodo aliquam augue nullam lectus nisl pulvinar. Ultrices at porttitor id integer ligula id. Tempus rhoncus mauris cras eget odio in duis. Congue in quis ullamcorper aliquet ut suspendisse vel. Nisi molestie et convallis amet mi velit venenatis lacus tellus. Massa suscipit vitae lectus eget tellus turpis nisl volutpat. Pellentesque est nisi donec nibh. Hendrerit venenatis ac porta velit sagittis molestie massa. Sit ultrices velit aliquet ultrices. Feugiat egestas sagittis lacus orci pharetra sed elementum eget. Tristique tortor nibh nam dolor semper at nulla. Ultricies habitant varius mi purus tellus vulputate quis hendrerit. Mattis iaculis elit consequat in elementum vitae pellentesque. Augue enim eu risus auctor feugiat ut sed pellentesque. Felis in auctor consectetur metus. In in sagittis dui turpis scelerisque risus elit nunc. Tempus lobortis volutpat mi magna viverra. Augue mi amet odio turpis commodo et augue vitae."
              className="text-lg p-4 leading-[32px]"
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mt-10 justify-between w-full">
        <Link to="/craft-sop/4">
          <Button className="border-red text-red w-32 h-12" variant="outline">
            Edit
          </Button>
        </Link>
        <Button
          className="bg-red text-white w-32 h-12"
          onClick={handleShowModal}
        >
          Complete
        </Button>
      </div>

      {showModal && (
        <Dialog open={showModal} onOpenChange={setshowModal}>
          <DialogContent className="w-[90%] rounded-md sm:max-w-md flex flex-col items-center justify-center md:py-8">
            <DialogHeader>
              <DialogTitle className="text-red text-2xl">Sop Successfully Created</DialogTitle>
            </DialogHeader>
            <img src={SuccessImage} alt="" />
            <div className="flex items-center flex-col justify-center gap-6">
              <Button className="bg-red">Download SOP</Button>
              <Link to="/assigned-candidates">
                <Button variant="outline" className="border-red text-red">Back to dashboard</Button>
              </Link>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </RootLayout>
  );
};

export default Step4;
