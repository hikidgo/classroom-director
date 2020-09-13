import { DataSource } from '@angular/cdk/table';
import { Observable, Subject } from 'rxjs';

export class ExpandableDataSource<T> extends DataSource<any> {

    private _subject: Subject<Element[]> = new Subject<Element[]>();

    set data(items: T[]) {
        if (items === undefined) throw 'Please supply time interval';

        const rows = [];
        items.forEach(element => rows.push(element, { detailRow: true, data : element }));

        this._subject.next(rows);
    }

    connect(): Observable<Element[]> {
        return this._subject;
    }

    disconnect() { }

}