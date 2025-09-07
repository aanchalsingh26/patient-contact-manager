import React, { useEffect, useState } from "react";

const empty = { first_name: "", last_name: "", address: "", email: "", phone_number: "", date_of_birth: "" };

export default function PatientForm({ initialData = null, onSubmit, onCancel }) {
    const [form, setForm] = useState(empty);

    useEffect(() => {
        if (initialData) {
            setForm({
                first_name: initialData.first_name || "",
                last_name: initialData.last_name || "",
                address: initialData.address || "",
                email: initialData.email || "",
                phone_number: initialData.phone_number || "",
            });
        } else {
            setForm(empty); // ✅ reset form when creating
        }
    }, [initialData]);

    function initial_data_to_phone(p) { return p || ""; }

    function change(e) { setForm(f => ({ ...f, [e.target.name]: e.target.value })); }

    function submit(e) {
        e.preventDefault();
        if (!form.first_name.trim() || !form.last_name.trim()) 
            { alert("First name, last name & phone number required"); 
            return; 
        }
        const payload = {
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            address: form.address || undefined,
            email: form.email || undefined,
            phone_number: form.phone_number.trim(),
        };
        onSubmit(payload);
        if (!initialData) setForm(empty);
    }

    return (
        <form onSubmit={submit} className="form">
            <label>First name<input name="first_name" value={form.first_name} onChange={change} /></label>
            <label>Last name<input name="last_name" value={form.last_name} onChange={change} /></label>
            <label>Address<input name="address" value={form.address} onChange={change} /></label>
            <label>Email<input name="email" value={form.email} onChange={change} type="email" /></label>
            <label>Phone<input name="phone_number" value={form.phone_number} onChange={change} placeholder="Enter Mobile no" /></label>
            <div style={{ marginTop: 10 }}>
                <button type="submit">{initialData ? "Update" : "Create"}</button>
                {initialData && <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>}
            </div>
        </form>
    );
}
