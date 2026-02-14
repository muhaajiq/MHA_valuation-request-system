import type { ValuationRequest } from "../types/valuation";
import { formatCurrency, formatDate } from "../utilities/format";

interface Props {
    data: ValuationRequest[];
}

export default function ValuationTable({ data }: Props) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Address</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {data.map(v => (
                    <tr key={v.id}>
                        <td>{v.propertyAddress}</td>
                        <td>{v.propertyType}</td>
                        <td>{formatCurrency(v.requestedValue)}</td>
                        <td>{v.status}</td>
                        <td>{formatDate(v.requestDate)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
