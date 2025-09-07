import React from "react";

export default function PatientList({ patients = [], onEdit, onDelete }) {
    if (!patients.length) return <p>No patients found.</p>;
    return (
        <table className="patients-table">
            <thead><tr><th>ID</th><th>First</th><th>Last</th><th>Email</th><th>Phone</th><th>Address</th><th>Actions</th></tr></thead>
            <tbody>
                {patients.map(p => (
                    <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.first_name}</td>
                        <td>{p.last_name}</td>
                        <td>{p.email}</td>
                        <td>{p.phone_number}</td>
                        <td>{p.address}</td>
                        <td>
                            <button onClick={() => onEdit(p)}>Edit</button>
                            <button onClick={() => onDelete(p.id)} style={{ marginLeft: 8 }}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
