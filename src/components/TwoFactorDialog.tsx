import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { OTP } from "@/components/OTP";
import QRCode from "react-qr-code";
import RedLock from "../assets/red-lock.svg"

interface TwoFactorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TwoFactorDialog = ({ open, onOpenChange }: TwoFactorDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="py-12 flex flex-col items-center w-[96%] justify-center">
        <DialogHeader className="flex">
          <DialogTitle className="text-red flex items-center justify-center gap-3">
            <img src={RedLock} alt="lock" />
            Set up two factor auth (2FA)
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-8">
          {/* QR CODE BOX*/}
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 200,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={"https://proconnectpay.com"}
              viewBox={`0 0 256 256`}
            />
            <p className="text-xs mt-2">Hold your camera to scan QR code</p>
          </div>
          <div className="flex items-center text-[#273240] flex-col ">
            <p className="font-bold text-base">Verification Code</p>
            <OTP />
          </div>
        </DialogDescription>
        <div className="flex gap-5 w-full">
          <DialogClose asChild>
            <Button variant={"outline"} className="border border-red text-red w-1/2">Cancel</Button>
          </DialogClose>
          <Button className="w-1/2 bg-red text-white">Verify Account</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorDialog;
