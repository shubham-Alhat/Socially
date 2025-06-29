import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ui/ModeToggle";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>

      <ModeToggle />
    </div>
  );
}
