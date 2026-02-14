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
        fetchPropertyTypes().then(setTypes).catch(() => setError("Failed to load types"));
    }, []);

    const validate = (): string | null => {
        if (!form.propertyAddress.trim()) return "Address required";
        if (form.propertyTypeId === 0) return "Select property type";
        if (form.requestedValue <= 0) return "Value must be > 0";
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
            onSuccess();
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Create Request</h3>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <input
                placeholder="Address"
                value={form.propertyAddress}
                onChange={e => setForm({ ...form, propertyAddress: e.target.value })}
            />

            <select
                value={form.propertyTypeId}
                onChange={e => setForm({ ...form, propertyTypeId: Number(e.target.value) })}
            >
                <option value={0}>Select type</option>
                {types.map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>

            <input
                type="number"
                value={form.requestedValue}
                onChange={e => setForm({ ...form, requestedValue: Number(e.target.value) })}
            />

            <textarea
                placeholder="Remarks"
                value={form.remarks}
                onChange={e => setForm({ ...form, remarks: e.target.value })}
            />

            <button onClick={submit} disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
        </div>
    );
}
