import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts, setFilters, clearFilters } from '../redux/slices/productSlice'

export const useProducts = () => {
    const dispatch = useDispatch()
    const { products, loading, error, totalProducts, filters } = useSelector(
        (state) => state.product
    )

    const loadProducts = (params) => {
        dispatch(fetchProducts(params))
    }

    const updateFilters = (newFilters) => {
        dispatch(setFilters(newFilters))
    }

    const resetFilters = () => {
        dispatch(clearFilters())
    }

    // useEffect(() => {
    //     loadProducts(filters)
    // }, [filters])

    return {
        products,
        loading,
        error,
        totalProducts,
        filters,
        loadProducts,
        updateFilters,
        resetFilters,
    }
}