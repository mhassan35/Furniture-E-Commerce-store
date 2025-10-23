import { computed } from 'vue'

/**
 * Format a date safely into a readable string.
 * @param {string} dateStr - Raw date string.
 * @returns {string} - Formatted date or fallback.
 */
const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
}

/**
 * Build a computed list of product detail entries for display.
 * @param {Object} product - Product data object (reactive).
 * @returns {Object} { details } - Computed array of detail objects.
 */
export function useProductDetails(product) {
  const details = computed(() => {
    const { category, wood_type, finish, dimensions, weight, stock, status, created_at } = product

    const formattedDimensions =
      dimensions?.width && dimensions?.height && dimensions?.depth
        ? `${dimensions.width} × ${dimensions.height} × ${dimensions.depth} cm`
        : 'N/A'

    return [
      { label: 'Category', value: category || 'N/A' },
      { label: 'Wood Type', value: wood_type || 'N/A' },
      { label: 'Finish', value: finish || 'N/A' },
      { label: 'Dimensions', value: formattedDimensions },
      { label: 'Weight', value: weight ? `${weight} kg` : 'N/A' },
      { label: 'Stock', value: stock ?? 'N/A' },
      { label: 'Status', value: status || 'N/A' },
      { label: 'Created', value: formatDate(created_at) },
    ]
  })

  return { details }
}
