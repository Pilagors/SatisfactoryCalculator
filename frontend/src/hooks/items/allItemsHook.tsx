import { api } from "../../api/client";
import { Item } from "../../types/item";
import { useEffect, useState } from "react";

export function useAllItems() {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        api.get<Item[]>('/items').then(setItems)
    }, [])

    return { items }
}