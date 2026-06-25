import React from "react";
import { useStore } from "../store/useStore";

export const NotesWidget = () => {
  const notes = useStore((state) => state.notes);
  const setNotes = useStore((state) => state.setNotes);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleClear = () => {
    setNotes("");
  };

  return (
    <div className="notes-widget">
      <h3 className="notes-title">All notes</h3>
      <textarea
        className="notes-textarea"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Write your quick memos, thoughts, or lists here..."
        aria-label="Notes notepad"
      />
      <div className="notes-footer">
        <span>Autosaved to LocalStorage</span>
        <button
          type="button"
          className="notes-clear-btn"
          onClick={handleClear}
          title="Clear all text"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default NotesWidget;
