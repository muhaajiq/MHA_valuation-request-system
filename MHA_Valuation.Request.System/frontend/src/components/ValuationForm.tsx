import { useEffect, useState } from "react";
import type { CreateRequestDto, PropertyType } from "../types/valuation";
import { fetchPropertyTypes, createRequest } from "../api/valuationApi";

interface Props {
    onSuccess: () => void;
}

export default function ValuationForm({ onSuccess }: Props) {
    const [types, setTypes] = useState<PropertyType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [form, setForm] = useState<CreateRequestDto>({
        propertyAddress: "",
        propertyTypeId: 0,
        requestedValue: 0,
        remarks: "",
    });

    useEffect(() => {
        fetchPropertyTypes()
            .then(setTypes)
            .catch(() => setError("Failed to load property types"));
    }, []);

    const validate = (): string | null => {
        if (!form.propertyAddress.trim()) return "Address is required";
        if (form.propertyTypeId === 0) return "Please select a property type";
        if (form.requestedValue <= 0) return "Requested value must be greater than 0";
        return null;
    };

    const submit = async () => {
        const validation = validate();
        if (validation) {
            setError(validation);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await createRequest(form);
            setForm({ propertyAddress: "", propertyTypeId: 0, requestedValue: 0, remarks: "" });
            onSuccess();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "2rem", borderRadius: "8px", maxWidth: "500px" }}>
            <h3>Create Valuation Request</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div style={{ marginBottom: "1rem" }}>
                <label>Property Address</label>
                <input
                    type="text"
                    placeholder="Enter address"
                    value={form.propertyAddress}
                    onChange={e => setForm({ ...form, propertyAddress: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label>Property Type</label>
                <select
                    value={form.propertyTypeId}
                    onChange={e => setForm({ ...form, propertyTypeId: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                >
                    <option value={0}>Select type</option>
                    {types.map(t => (
                        <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                </select>
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label>Requested Value</label>
                <input
                    type="number"
                    placeholder="Enter value"
                    value={form.requestedValue}
                    onChange={e => setForm({ ...form, requestedValue: Number(e.target.value) })}
                    style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <label>Remarks (optional)</label>
                <textarea
                    placeholder="Any remarks"
                    value={form.remarks}
                    onChange={e => setForm({ ...form, remarks: e.target.value })}
                    style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem", minHeight: "80px" }}
                />
            </div>

            <button onClick={submit} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
                {loading ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
}
