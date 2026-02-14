export type Status = "Draft" | "Submitted" | "InProgress";

export interface PropertyType {
    id: number;
    name: string;
    code: string;
}

export interface ValuationRequest {
    id: number;
    propertyAddress: string;
    propertyType: string;
    requestedValue: number;
    status: Status;
    requestDate: string;
    remarks?: string | null;
}

export interface CreateRequestDto {
    propertyAddress: string;
    propertyTypeId: number;
    requestedValue: number;
    remarks?: string;
}
