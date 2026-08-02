# Sequence Diagram - Sistem Rekomendasi Olahraga

Berikut adalah **Sequence Diagram** versi simpel & ringkas (hanya judul singkat) untuk Sistem Rekomendasi Olahraga.

## 🖼️ Visual Sequence Diagram

![Sequence Diagram Simpel](./sequence-diagram-content-based.png)

---

## 📊 Kode Diagram (Mermaid UML)

```mermaid
sequenceDiagram
    autonumber
    actor User as User
    participant App as Mobile App
    participant API as API Backend
    participant RecSys as Recommendation System<br/>(Content-Based Filtering)
    participant DB as Database

    User->>App: User opens application
    App->>API: Request login
    API-->>App: Login successful
    
    User->>App: Input profile and sport preferences
    App->>API: Send profile data
    API->>DB: Save preferences data
    
    API->>RecSys: Process recommendations
    RecSys->>DB: Retrieve sport data
    DB-->>RecSys: Return sport data
    
    RecSys->>RecSys: Cosine Similarity & Medical Constraint Strategy
    
    RecSys-->>API: Return recommendations data
    API-->>App: Show recommendations
    User->>App: Set exercise schedule
```
