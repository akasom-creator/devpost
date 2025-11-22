import { useState, useCallback } from 'react';

export interface BloodDripInstance {
    id: string;
    x: number;
    y: number;
    timestamp: number;
}

interface UseBloodDripReturn {
    triggerDrip: (x: number, y: number) => void;
    drips: BloodDripInstance[];
}

const MAX_CONCURRENT_DRIPS = 10;
const DRIP_DURATION = 1600; // milliseconds (1.2s animation + 0.4s splatter)

export function useBloodDrip(): UseBloodDripReturn {
    const [drips, setDrips] = useState<BloodDripInstance[]>([]);

    const triggerDrip = useCallback((x: number, y: number) => {
        const newDrip: BloodDripInstance = {
            id: `drip-${Date.now()}-${Math.random()}`,
            x,
            y,
            timestamp: Date.now(),
        };

        setDrips((prevDrips) => {
            // Remove old drips that have completed their animation
            const now = Date.now();
            const activeDrips = prevDrips.filter(
                (drip) => now - drip.timestamp < DRIP_DURATION
            );

            // Enforce maximum concurrent drips limit
            if (activeDrips.length >= MAX_CONCURRENT_DRIPS) {
                // Remove the oldest drip to make room for the new one
                return [...activeDrips.slice(1), newDrip];
            }

            return [...activeDrips, newDrip];
        });

        // Auto-remove drip after animation completes
        setTimeout(() => {
            setDrips((prevDrips) =>
                prevDrips.filter((drip) => drip.id !== newDrip.id)
            );
        }, DRIP_DURATION);
    }, []);

    return {
        triggerDrip,
        drips,
    };
}
