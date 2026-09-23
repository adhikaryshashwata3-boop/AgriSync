import React, { useEffect, useState } from 'react'
import BookSlot from '../../pages/farmer/Book Slot.jsx'
import { useFarmer } from './state/FarmerContext'

export default function BookSlotRoute({ onNavigate, crop, setCrop, qty, setQty, slot, setSlot, onBook }) {
  const { state, actions } = useFarmer()
  useEffect(() => { actions.loadRecommendedSlots({ crop, quantity: qty }).catch(() => {}) }, [actions, crop, qty])

  // const handleBook = async (payload) => {
  //   const result = await actions.bookSlot(payload)
  //   onBook?.(result?.token)
  //   if (result?.token) onNavigate?.('queue')
  //   return result
  // }
  const handleBook = async (payload) => {
  console.log("ROUTE HANDLE BOOK CALLED:", payload)

  const result = await actions.bookSlot(payload)

  console.log("ROUTE ACTION RESULT:", result)

  onBook?.(result?.token)

  if (result?.token) {
    onNavigate?.('queue')
  }

  return result
}

  return (
    <BookSlot
      crop={crop}
      setCrop={setCrop}
      qty={qty}
      setQty={setQty}
      slot={slot}
      setSlot={setSlot}
      onBookRequest={handleBook}
      recommendedSlots={state.recommendedSlots?.topRecommendedSlots || []}
    />
  )
}
