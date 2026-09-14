import { formatTime } from "../utils/formatTime";
import "./DuplicateEntryPrompt.css";

function DuplicateEntryPrompt({ category, existingEntry, onEdit, onCorrect, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="prompt-box" onClick={(e) => e.stopPropagation()}>
        <p className="prompt-title">{category} already logged</p>
        <p className="prompt-subtitle">
          Logged at {formatTime(existingEntry.timestamp)} &middot; "{existingEntry.value}"
        </p>

        <div className="prompt-actions">
          <button className="prompt-btn prompt-edit" onClick={onEdit}>
            Edit this entry
          </button>
          <button className="prompt-btn prompt-correct" onClick={onCorrect}>
            Log a correction
          </button>
          <button className="prompt-btn prompt-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DuplicateEntryPrompt;