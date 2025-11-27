

export const convertToTime = (value?: string) => {
    if (!value) return "";

    // If already in HH:MM format → return as-is
    if (/^\\d{2}:\\d{2}$/.test(value)) return value;

    // Convert HH:MM AM/PM → 24hr HH:MM
    const date = new Date(`1970-01-01 ${value}`);
    if (isNaN(date.getTime())) return "";

    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
};
