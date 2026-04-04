export class DateHelpers {
    static formatDateToMonthExtenso(date: Date): string {
        return new Date(date).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }
}