type DataContextBase<T> = {
    data: T[] | null,
    setData: (data: T[]) => void
}

export default DataContextBase;