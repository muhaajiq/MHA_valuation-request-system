import { useEffect, useState } from "react";
import { fetchRequests } from "../api/valuationApi";
import type { ValuationRequest } from "../types/valuation";
import ValuationTable from "../components/ValuationTable";
import ValuationForm from "../components/ValuationForm";

export default function ValuationPage() {
    const [data, setData] = useState<ValuationRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        try {
            setLoading(true);
            setError(null);
            setData(await fetchRequests());
        } catch {
            setError("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <h1>Valuation Requests</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {loading && <p>Loading...</p>}

            <ValuationForm onSuccess={load} />
            <ValuationTable data={data} />
        </div>
    );
}
