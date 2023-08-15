/* eslint-disable @typescript-eslint/no-inferrable-types */
export class FilterModel {
    page:number = 0;
    size: number=15;
    sort: string='';
    sortBy: string='';
    queryText: string='';
    search: RegExp;
}
