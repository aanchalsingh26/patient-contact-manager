// src/components/PatientTable.jsx
import { useMemo, useState } from "react";

export default function PatientTable({ items, onEdit, onDelete }) {
    const [q, setQ] = useState("");

    const filtered = useMemo(() => {
        const s = q.trim().toLowerCase();
        if (!s) return items;
        return items.filter((p) =>
            [p.first_name, p.last_name, p.email, p.phone, p.address]
                .join(" ")
                .toLowerCase()
                .includes(s)
        );
    }, [q, items]);

    return (
        <div className="card">
            <div className="tableHeader">
                <h2>Patients</h2>
                <input
                    className="search"
                    placeholder="Search name/email/phone/address..."
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                />
            </div>

            <div className="tableWrap">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone no</th>
                            <th>Address</th>
                            <th style={{ textAlign: "right" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: 20 }}>
                                    No records
                                </td>
                            </tr>
                        )}
                        {filtered.map((p, idx) => (
                            <tr key={p.id}>
                                <td>{idx + 1}</td>
                                <td>{p.first_name} {p.last_name}</td>
                                <td>
                                    <div>{p.email}</div>
                                </td>
                                <td>
                                    <div className="muted">{p.phone_number}</div> {/* ✅ show phone_number */}

                                </td>
                                <td>{p.address}</td>
                                <td style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                    <button className="btn" onClick={() => onEdit(p)}>Edit</button>
                                    <button className="btn danger" onClick={() => onDelete(p.id)}>Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}