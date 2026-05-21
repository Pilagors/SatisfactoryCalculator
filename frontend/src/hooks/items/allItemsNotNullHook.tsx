import { api } from "../../api/client";
import { Item } from "../../types/item";
import { useEffect, useState } from "react";

export function useAllItemsNotNull() {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        api.get<Item[]>('/items/not-null').then(setItems)
    }, [])

    return { items }
}