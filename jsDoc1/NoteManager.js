/**
 * Klasa `NoteManager` służy do zarządzania notatkami.
 */
export class NoteManager {
    /**
     * Konstruktor inicjuje pustą listę notatek.
     */
    constructor() {
        this.notes = [];
    }

    /**
     * Dodaje notatkę do listy i aktualizuje dane w localStorage.
     * @param {object} note - Notatka do dodania.
     */
    addNote(note) {
        this.notes.push(note);
        this.updateLocalStorage();
    }

    /**
     * Pobiera listę notatek.
     * @returns {Array} - Lista notatek.
     */
    getNotes() {
        return this.notes;
    }

    /**
     * Ładuje notatki z localStorage, jeśli są dostępne.
     */
    loadNotes() {
        const notesFromStorage = localStorage.getItem('notes');
        if (notesFromStorage) {
            this.notes = JSON.parse(notesFromStorage);
        }
    }

    /**
     * Aktualizuje dane notatek w localStorage.
     */
    updateLocalStorage() {
        localStorage.setItem('notes', JSON.stringify(this.notes));
    }

    /**
     * Usuwa notatkę z listy na podstawie indeksu i aktualizuje dane w localStorage.
     * @param {number} index - Indeks notatki do usunięcia.
     */
    removeNote(index) {
        this.notes.splice(index, 1);
        this.updateLocalStorage();
    }

    // Możliwa rozbudowa o dodatkowe funkcje notesu...
}
