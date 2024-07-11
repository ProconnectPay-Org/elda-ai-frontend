import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"

const TwoFactorDialog = () => {
  return (
    <Dialog >
          <DialogContent>
            <DialogHeader className="flex">
              <DialogTitle className="text-red">Candidate Details</DialogTitle>
              
            </DialogHeader>
            <DialogDescription className="flex flex-col gap-8">
              
              
            </DialogDescription>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
  )
}

export default TwoFactorDialog