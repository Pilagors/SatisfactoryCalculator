import { api } from "../../api/client";
import { Item } from "../../types/item";
import { useEffect, useState } from "react";

export function useAllItemsNotNull() {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        const fetch = () => {
            api.get<Item[]>('/items/not-null').then(data => {
                if (data.length > 0) {
                    setItems(data)
                    clearInterval(interval)
                }
            }).catch(() => {})
        }

        fetch()
        const interval = setInterval(fetch, 3000)

        return () => clearInterval(interval)
    }, [])

    return { items }
}