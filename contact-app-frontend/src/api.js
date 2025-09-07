// src/api.js
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function handle(res) {
    if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        const msg = data?.detail || `Request failed (${res.status})`;
        throw new Error(msg);
    }
    if (res.status === 204) return null;
    return res.json();
}

export const api = {
    async listPatients() {
        const res = await fetch(`${BASE_URL}/patients`);
        return handle(res);
    },
    async getPatient(id) {
        const res = await fetch(`${BASE_URL}/patients/${id}`);
        return handle(res);
    },
    async createPatient(body) {
        const res = await fetch(`${BASE_URL}/patients`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return handle(res);
    },
    async updatePatient(id, body) {
        const res = await fetch(`${BASE_URL}/patients/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return handle(res);
    },
    async deletePatient(id) {
        const res = await fetch(`${BASE_URL}/patients/${id}`, { method: "DELETE" });
        return handle(res);
    },
};