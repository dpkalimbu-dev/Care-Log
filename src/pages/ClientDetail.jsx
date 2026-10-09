import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { clientList } from "../data/clients";
import { formatTime } from "../utils/formatTime";
import { isToday } from "../utils/isToday";
import { categoryQuestions } from "../data/categoryQuestions";
import AppHeader from "../components/AppHeader";
import CategoryCard from "../components/CategoryCard";
import LogEntryForm from "../components/LogEntryForm";
import DuplicateEntryPrompt from "../components/DuplicateEntryPrompt";
import ConfirmDialog from "../components/ConfirmDialog";
import "./ClientDetail.css";

const categories = Object.keys(categoryQuestions);



function ClientDetail({ logEntries, onAddEntry, onUpdateEntry, onCorrectEntry, onDeleteEntry, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(null);
  const [editingEntryId, setEditingEntryId] = useState(null);
  const [initialAnswers, setInitialAnswers] = useState(null);
  const [duplicateEntry, setDuplicateEntry] = useState(null);
  const [duplicateCategory, setDuplicateCategory] = useState(null);
  const [entryToDelete, setEntryToDelete] = useState(null);

  const client = clientList.find((c) => c.id === Number(id));

  if (!client) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Client not found.</p>
      </div>
    );
  }

  const clientEntries = logEntries.filter(
    (entry) => entry.clientId === client.id
  );

  function findTodayEntry(category) {
    return clientEntries.find(
      (entry) =>
        entry.category === category && !entry.corrected && isToday(entry.timestamp)
    );
  }

  function handleCategoryClick(category) {
    const existing = findTodayEntry(category);
    if (existing) {
      setDuplicateEntry(existing);
      setDuplicateCategory(category);
    } else {
      setActiveCategory(category);
      setEditingEntryId(null);
      setInitialAnswers(null);
    }
  }

  function handleChooseEdit() {
    setActiveCategory(duplicateCategory);
    setEditingEntryId(duplicateEntry.id);
    setInitialAnswers(duplicateEntry.answers || {});
    setDuplicateEntry(null);
    setDuplicateCategory(null);
  }

  function handleChooseCorrection() {
    onCorrectEntry(duplicateEntry.id);
    setActiveCategory(duplicateCategory);
    setEditingEntryId(null);
    setInitialAnswers(null);
    setDuplicateEntry(null);
    setDuplicateCategory(null);
  }

  function handleCancelDuplicate() {
    setDuplicateEntry(null);
    setDuplicateCategory(null);
  }

  function handleSaveEntry(entryData) {
    if (editingEntryId) {
      onUpdateEntry(editingEntryId, entryData);
    } else {
      onAddEntry(entryData);
    }
    closeForm();
  }

  function closeForm() {
    setActiveCategory(null);
    setEditingEntryId(null);
    setInitialAnswers(null);
  }

  function handleDelete(id) {
      setEntryToDelete(id);
    }

  function confirmDelete() {
      onDeleteEntry(entryToDelete);
      setEntryToDelete(null);
    }

  return (
    <div className="client-detail-page">
      <AppHeader activeTab="poc"/>

      <div className="client-detail-content">
      <p className="back-link" onClick={() => navigate("/")}>
        &larr; Back to Dashboard
      </p>

      <div className="client-header">
        <div className="client-header-avatar">
          {client.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()}
        </div>
        <div>
          <p className="client-header-name">{client.name}</p>
          <p className="client-header-meta">
            Unit {client.unit} &middot; {client.status}
          </p>
        </div>
      </div>

      <p className="section-label">PRESS A CATEGORY TO DOCUMENT</p>
      <div className="category-grid">
        {categories.map((category) => (
          <CategoryCard
            key={category}
            label={category}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <p className="section-label">TODAY'S ENTRIES</p>
      <div className="entries-list">
        {clientEntries.length === 0 ? (
          <p className="empty-message">No entries logged yet.</p>
        ) : (
          clientEntries.map((entry) => (
            <div
              className={entry.corrected ? "entry-row entry-corrected" : "entry-row"}
              key={entry.id}
            >
              <span className="entry-time">{formatTime(entry.timestamp)}</span>
              <span className="entry-category">{entry.category}</span>
              <span className="entry-value">{entry.value}</span>
              {entry.corrected && <span className="entry-tag">Corrected</span>}
              <button className="entry-delete" onClick={() => handleDelete(entry.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>
      </div>

      {duplicateEntry && (
        <DuplicateEntryPrompt
          category={duplicateCategory}
          existingEntry={duplicateEntry}
          onEdit={handleChooseEdit}
          onCorrect={handleChooseCorrection}
          onCancel={handleCancelDuplicate}
        />
      )}

      {activeCategory && (
        <LogEntryForm
          category={activeCategory}
          client={client}
          currentUser={currentUser}
          initialAnswers={initialAnswers}
          editingEntryId={editingEntryId}
          onSave={handleSaveEntry}
          onCancel={closeForm}
        />
      )}

      {entryToDelete && (
        <ConfirmDialog
          title="Delete this entry?"
          message="This cannot be undone."
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setEntryToDelete(null)}
        />
      )}
    </div>
  );
}

export default ClientDetail;