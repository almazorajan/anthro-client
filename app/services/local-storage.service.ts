import { Injectable } from '@angular/core';

@Injectable() export class LocalStorageService {

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    get<T>(key: string): T {
        try {
            return JSON.parse(localStorage.getItem(key)) as T;
        } catch(e) {
            console.log(e);
        }
        return null;
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }

    reset(): void {
        localStorage.clear();
    }
}