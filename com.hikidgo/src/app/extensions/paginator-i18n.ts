import { TranslateService } from '@ngx-translate/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class PaginatorI18n extends MatPaginatorIntl {

    constructor(private readonly translate: TranslateService) {
        super();

        this.translateLabels();

        var sub = this.translate.onLangChange.subscribe(() => {
            this.translateLabels();
        });
    }

    private translateLabels(){
        this.itemsPerPageLabel = this.translate.instant('ITEMS_PER_PAGE_LABEL');
        this.nextPageLabel = this.translate.instant('NEXT_PAGE_LABEL');
        this.previousPageLabel = this.translate.instant('PREVIOUS_PAGE_LABEL');
        this.firstPageLabel = this.translate.instant('FIRST_PAGE_LABEL');
        this.lastPageLabel = this.translate.instant('LAST_PAGE_LABEL');
        this.getRangeLabel = this.getRangeLabelX.bind(this);
    }

    private getRangeLabelX(page: number, pageSize: number, length: number): string {
        if (length === 0 || pageSize === 0) {
            return this.translate.instant('RANGE_PAGE_LABEL_1', { length });
        }
        length = Math.max(length, 0);
        const startIndex = page * pageSize;
        // If the start index exceeds the list length, do not try and fix the end index to the end.
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return this.translate.instant('RANGE_PAGE_LABEL_2', { startIndex: startIndex + 1, endIndex, length });
    }
}