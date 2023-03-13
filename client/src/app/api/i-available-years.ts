export interface IAvailableYears {
    readonly availableYears: Array<{
        year: number;
        months: Array<{
            month: number;
            days: Array<number>
        }>
    }>;
}
