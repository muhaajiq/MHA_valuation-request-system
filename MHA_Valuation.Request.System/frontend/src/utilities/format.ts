export const formatCurrency = (value: number): string =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(value);

export const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("en-GB");
