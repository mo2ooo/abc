import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {MyError} from './my-error';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Id} from '../model';


export class BaseService<T extends Id> {
    public baseCollection: AngularFirestoreCollection<T>;

    constructor(public db: AngularFirestore,
                public myErr: MyError,
                public path: string) {
        // this.baseCollection = this.db.collection<T>(path, model => {
        //   return model.orderBy('date', 'asc');
        // });
        this.baseCollection = this.db.collection<T>(path);
    }

    getList(): Observable<Array<T>> {
        return this.baseCollection.snapshotChanges()
            .pipe(
                map((d) => {
                    return d.map((action) => {
                        const data = action.payload.doc.data();
                        return ({id: action.payload.doc.id, ...data}) as T;
                    });
                }),
                catchError(this.myErr.handleError)
            );
    }

    getListByParam(fieldName: string, id: string): Observable<Array<T>> {
        this.baseCollection = this.db.collection<T>(this.path, ref => ref.where(fieldName, '==', id));
        return this.baseCollection.snapshotChanges()
            .pipe(
                map((d) => {
                    return d.map((action) => {
                        const data = action.payload.doc.data();
                        return ({id: action.payload.doc.id, ...data}) as T;
                    });
                }),
                catchError(this.myErr.handleError)
            );
    }

    getModel(id: any): Observable<T> {
        return this.db.doc<T>(`/${this.path}/${id}`).snapshotChanges()
            .pipe(
                map(d => {
                    return ({id: d.payload.id, ...d.payload.data()});
                }),
                catchError(this.myErr.handleError)
            );
    }

    addModel(item: T) {
        return this.baseCollection.add(JSON.parse(JSON.stringify(item)));
    }

    create(c: new(s) => T, id: string): T {
        return new c(id);
    }

    update(item: T): Promise<void> {
        return this.db.doc(`/${this.path}/${item.id}`).update(JSON.parse(JSON.stringify(item)));
    }

    delete(id: string): Promise<void> {
        return this.db.doc(`/${this.path}/${id}`).delete();
    }
}
