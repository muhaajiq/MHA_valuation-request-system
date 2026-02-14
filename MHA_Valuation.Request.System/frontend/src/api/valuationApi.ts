import type { CreateRequestDto, ValuationRequest, PropertyType } from "../types/valuation";

const BASE = "https://localhost:7233/api";

export async function fetchRequests(): Promise<ValuationRequest[]> {
    const res = await fetch(`${BASE}/valuation-requests`);
    if (!res.ok) throw new Error("Failed to fetch requests");
    return res.json();
}

export async function fetchPropertyTypes(): Promise<PropertyType[]> {
    const res = await fetch(`${BASE}/property-types`);
    if (!res.ok) throw new Error("Failed to fetch property types");
    return res.json();
}

export async function createRequest(dto: CreateRequestDto) {
    const res = await fetch(`${BASE}/valuation-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dto),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Create failed");
    }

    return res.json();
}
