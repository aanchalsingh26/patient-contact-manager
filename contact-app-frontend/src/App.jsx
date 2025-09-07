// src/App.jsx
import { useEffect, useState } from "react";
import { api } from "./api";
import PatientForm from "./components/PatientForm";
import PatientTable from "./components/PatientTable";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 2500);
  };

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.listPatients();
      setItems(data);
    } catch (e) {
      showToast("error", e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onCreate = async (payload) => {
    try {
      await api.createPatient(payload);
      showToast("success", "Patient created");
      setEditing(null); // ✅ ensure editing is reset
      await load();
    } catch (e) {
      showToast("error", e.message);
    }
  };

  const onUpdate = async (payload) => {
    try {
      await api.updatePatient(editing.id, payload);
      showToast("success", "Patient updated");
      setEditing(null);
      await load();
    } catch (e) {
      showToast("error", e.message);
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this patient?")) return;
    try {
      await api.deletePatient(id);
      showToast("success", "Patient deleted");
      await load();
    } catch (e) {
      showToast("error", e.message);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Patient Contact Manager</h1>
        <span className="muted">FastAPI + React</span>
      </header>

      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      <div className="layout">
        <div className="left">
          <PatientForm
            initialData={editing || null} // ✅ use null for Create
            onCancel={() => setEditing(null)}
            onSubmit={editing ? onUpdate : onCreate}
          />
        </div>

        <div className="right">
          {loading ? (
            <div className="card" style={{ padding: 20 }}>Loading...</div>
          ) : (
            <PatientTable items={items} onEdit={setEditing} onDelete={onDelete} />
          )}
        </div>
      </div>
      <footer className="footer">© Your App</footer>
    </div>
  );
}
