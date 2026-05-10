import { ClassicMacIcon } from "../icons";

export function ShutdownScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="shutdown">
      <div className="shutdown-dialog">
        <div className="shutdown-row">
          <div className="shutdown-mac"><ClassicMacIcon /></div>
          <div className="shutdown-msg">You may now switch off your Macintosh safely.</div>
        </div>
        <button className="shutdown-restart" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}
