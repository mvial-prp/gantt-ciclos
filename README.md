# Gantt Cíclico

Herramienta web para modelamiento de ciclos industriales con diagrama Gantt cíclico y sistema de dependencias.

## Características

- **Diagrama Gantt cíclico** — las actividades que superan el final del ciclo reaparecen automáticamente al inicio (wrap-around)
- **7 tipos de dependencias** entre actividades, con validación en tiempo real y visualización de violaciones
- **Categorías de color renombrables** — la leyenda refleja el significado real de cada color en tu modelo
- **Drag & drop** — arrastra barras para mover, borde derecho para redimensionar
- **Filas y actividades editables** — nombres, tiempos, duración, fila, color
- **Configuración de ciclo** — duración, zoom, altura de fila, título

## Tipos de dependencia

| Símbolo | Descripción |
|---------|-------------|
| `A→\|→B` | B empieza cuando A termina |
| `A\|B` | Empiezan juntos |
| `A→N→B` | B empieza ≥ N seg después que A termina |
| `A…N\|B` | B empieza ≤ N seg antes que A termine |
| `\|A→N→\|B` | B empieza ≥ N seg después que A empieza |
| `A\|B\|` | Terminan juntos |
| `A\|→N→\|B` | B termina ≥ N seg después que A termina |

## Uso en producción

Disponible en: **https://mvial-prp.github.io/gantt-ciclos/**

## Desarrollo local

```bash
npm install
npm run dev
```

## Deploy a GitHub Pages

```bash
npm run deploy
```

## Modelo precargado

El diagrama viene precargado con el ciclo del sistema repaletizador de cajas Watts / Frutos del Maipo (Proapsis SpA):
- Robot Yaskawa PL190
- Mesa Celluveyor de desarme/rearmado de camadas
- Loop de etiquetado con velocidad regulada
- Ciclo de 57 seg/camada → 758 cajas/hora → ~13,2 h para 10.000 cajas

## Stack

- React 18 + Vite 5
- Sin dependencias de UI — todo CSS-in-JS inline
