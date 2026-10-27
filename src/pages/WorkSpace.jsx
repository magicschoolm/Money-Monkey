import Navbar from "../Components/Navbar";
import { useEffect, useState } from "react";

function WorkSpace() {
  const [activeTab, setActiveTab] = useState("notes");

  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("workspace-notes")) || [];
    } catch {
      return [];
    }
  });

  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("workspace-tasks")) || [];
    } catch {
      return [];
    }
  });

  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [taskInput, setTaskInput] = useState("");

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("workspace-notes", JSON.stringify(notes));
  }, [notes]);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("workspace-tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new note
  const addNote = (e) => {
    e.preventDefault();

    if (!noteTitle.trim() && !noteContent.trim()) return;

    const newNote = {
      id: crypto.randomUUID(),
      title: noteTitle.trim() || "Untitled Note",
      content: noteContent.trim(),
      date: new Date().toLocaleDateString(),
    };

    setNotes((previous) => [newNote, ...previous]);
    setNoteTitle("");
    setNoteContent("");
  };

  // Delete a note
  const deleteNote = (id) => {
    setNotes((previous) => previous.filter((note) => note.id !== id));
  };

  // Add a new task
  const addTask = (e) => {
    e.preventDefault();

    if (!taskInput.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      text: taskInput.trim(),
      completed: false,
    };

    setTasks((previous) => [newTask, ...previous]);
    setTaskInput("");
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((previous) => previous.filter((task) => task.id !== id));
  };

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <>
    <Navbar />
    <div className="workspace-page">
      <main className="workspace-container">
        {/* Header */}
        <header className="workspace-header">
          <div className="workspace-brand">
            <div className="brand-icon">W</div>

            <div>
              <h1>My Workspace</h1>
              <p>Your thoughts. Your plans. Your space.</p>
            </div>
          </div>

          <div className="workspace-date">
            {new Date().toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        </header>

        {/* Toggle navigation */}
        <nav className="workspace-tabs">
          <button
            type="button"
            className={`workspace-tab ${
              activeTab === "notes" ? "active" : ""
            }`}
            onClick={() => setActiveTab("notes")}
          >
            <span className="tab-icon">✎</span>
            <span>Quick Notes</span>
            <span className="tab-count">{notes.length}</span>
          </button>

          <button
            type="button"
            className={`workspace-tab ${
              activeTab === "tasks" ? "active" : ""
            }`}
            onClick={() => setActiveTab("tasks")}
          >
            <span className="tab-icon">☑</span>
            <span>To-do List</span>
            <span className="tab-count">{tasks.length}</span>
          </button>
        </nav>

        {/* Quick Notes section */}
        {activeTab === "notes" && (
          <section className="workspace-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">YOUR IDEAS</span>
                <h2>Quick Notes</h2>
                <p>Capture your thoughts before they disappear.</p>
              </div>

              <div className="section-icon notes-icon">✎</div>
            </div>

            <form className="note-form" onSubmit={addNote}>
              <label htmlFor="note-title">Note title</label>

              <input
                id="note-title"
                type="text"
                placeholder="Give your note a title..."
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
              />

              <label htmlFor="note-content">Your note</label>

              <textarea
                id="note-content"
                rows="5"
                placeholder="Write your ideas, reminders, or thoughts here..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />

              <div className="form-footer">
                <span className="form-hint">
                  Your notes are saved in this browser.
                </span>

                <button className="primary-button" type="submit">
                  + Save Note
                </button>
              </div>
            </form>

            <div className="saved-content-heading">
              <h3>Your Notes</h3>
              <span>{notes.length} saved</span>
            </div>

            {notes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✎</div>
                <h3>No notes yet</h3>
                <p>Your ideas will appear here after you save them.</p>
              </div>
            ) : (
              <div className="notes-list">
                {notes.map((note) => (
                  <article className="note-card" key={note.id}>
                    <div className="note-card-top">
                      <h3>{note.title}</h3>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => deleteNote(note.id)}
                        aria-label={`Delete ${note.title}`}
                        title="Delete note"
                      >
                        ×
                      </button>
                    </div>

                    <p className="note-card-content">
                      {note.content || "No additional content."}
                    </p>

                    <span className="note-date">{note.date}</span>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* To-do List section */}
        {activeTab === "tasks" && (
          <section className="workspace-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">MAKE IT HAPPEN</span>
                <h2>To-do List</h2>
                <p>Small steps today. Big progress tomorrow.</p>
              </div>

              <div className="section-icon tasks-icon">✓</div>
            </div>

            <div className="task-progress">
              <div className="progress-info">
                <span>Task progress</span>
                <strong>
                  {tasks.length === 0
                    ? 0
                    : Math.round((completedTasks / tasks.length) * 100)}
                  %
                </strong>
              </div>

              <div
                className="progress-track"
                role="progressbar"
                aria-label="Task completion"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={
                  tasks.length === 0
                    ? 0
                    : Math.round((completedTasks / tasks.length) * 100)
                }
              >
                <div
                  className="progress-fill"
                  style={{
                    width: `${
                      tasks.length === 0
                        ? 0
                        : (completedTasks / tasks.length) * 100
                    }%`,
                  }}
                />
              </div>

              <p>
                {completedTasks} of {tasks.length} tasks completed
              </p>
            </div>

            <form className="task-form" onSubmit={addTask}>
              <input
                type="text"
                placeholder="What do you need to do?"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                aria-label="New task"
              />

              <button type="submit" className="primary-button">
                + Add Task
              </button>
            </form>

            <div className="saved-content-heading">
              <h3>Your Tasks</h3>
              <span>{tasks.length - completedTasks} remaining</span>
            </div>

            {tasks.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">✓</div>
                <h3>All clear for now</h3>
                <p>Add a task above to organize your day.</p>
              </div>
            ) : (
              <div className="tasks-list">
                {tasks.map((task) => (
                  <div
                    className={`task-item ${
                      task.completed ? "task-completed" : ""
                    }`}
                    key={task.id}
                  >
                    <label className="task-label">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />

                      <span className="custom-checkbox">✓</span>

                      <span className="task-text">{task.text}</span>
                    </label>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => deleteTask(task.id)}
                      aria-label={`Delete task: ${task.text}`}
                      title="Delete task"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Footer */}
        <footer className="workspace-footer">
          <span>Made for a more organized day.</span>
          <span>My Workspace © {new Date().getFullYear()}</span>
        </footer>
      </main>
    </div>
    </>
  );
}

export default WorkSpace;
;
