import { ClassicMacIcon } from "../icons";

export function WelcomeScreen() {
  return (
    <div className="welcome">
      <div className="welcome-dialog">
        <div className="welcome-mac"><ClassicMacIcon /></div>
        <div className="welcome-msg">Welcome to Keith's site</div>
      </div>
    </div>
  );
}
