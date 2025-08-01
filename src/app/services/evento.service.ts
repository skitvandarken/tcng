
import { Injectable, inject, signal } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Evento } from '../models/evento.models';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private firestore = inject(Firestore);
  private eventosCollection = collection(this.firestore, 'eventos');
  
  eventos = signal<Evento[]>([]);

  constructor() {
    console.log('EventosService initializado');
    this.getEventos().subscribe(eventos => {
      console.log('Eventos carregados', eventos);
      this.eventos.set(eventos);
    });
  }

  getEventos(): Observable<Evento[]> {
    console.log('Fetching all eventos');
    return collectionData(this.eventosCollection, { idField: 'id' }).pipe(
      map((eventos: any[]) => eventos.map(evento => evento as Evento)),
      tap(eventos => console.log('Eventos from Firestore:', eventos))
    ) as Observable<Evento[]>;
  }

  getEventoById(id: string): Observable<Evento | undefined> {
    console.log('Fetching evento with ID:', id);
    const postDoc = doc(this.firestore, `vagas/${id}`);
    return docData(postDoc, { idField: 'id' }).pipe(
      map(evento => {
        if (!evento) {
          throw new Error('Evento não encontrado');
        }
        return evento as Evento;
      }),
      tap(evento => console.log('Retrieved evento:', evento))
    ) as Observable<Evento>;
  }
}