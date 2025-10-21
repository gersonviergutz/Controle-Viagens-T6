import React, { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../contexts/AuthContext'
import Header from '../components/Header'
import TravelCard from '../components/TravelCard'
import LoadingSpinner from '../components/LoadingSpinner'
import AddTripModal from '../components/AddTripModal'
import EditTripModal from '../components/EditTripModal'
import { Trip, TripStatus } from '../types'
import { supabase } from '../services/supabaseClient'

const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="16"></line>
    <line x1="8" y1="12" x2="16" y2="12"></line>
  </svg>
)

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [updatingTripId, setUpdatingTripId] = useState<number | null>(null)
  const [deletingTripId, setDeletingTripId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const fetchTrips = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error: dbError } = await supabase
        .from('despesas')
        .select('*')
        .eq('user_id', user.id)
        .order('data_ida', { ascending: true, nullsFirst: false })
      
      if (dbError) {
        throw dbError
      }

      setTrips(data || [])
      
    } catch (err: any) {
      const specificMessage = err.message || 'Ocorreu um erro inesperado.'
      const errorMessage = `Falha ao carregar as viagens: ${specificMessage}`
      console.error("Erro detalhado do Supabase ao buscar viagens:", err)
      setError(errorMessage + "\n\nVerifique se sua tabela 'despesas' existe e se as permissões de leitura (RLS) estão corretas.")
      setTrips([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchTrips()
  }, [fetchTrips])

  const handleUpdateStatus = async (tripId: number, newStatus: TripStatus) => {
    setUpdatingTripId(tripId)

    const originalTrips = [...trips]

    setTrips(prevTrips =>
      prevTrips.map(trip =>
        trip.id === tripId ? { ...trip, status: newStatus } : trip
      )
    )

    try {
      const { error: dbError } = await supabase
        .from('despesas')
        .update({ status: newStatus })
        .eq('id', tripId)
        .eq('user_id', user?.id)
      
      if (dbError) {
        throw dbError
      }

    } catch (err: any) {
      const specificMessage = err.message || 'Erro desconhecido.'
      console.error('Falha ao atualizar o status da viagem:', err)
      setTrips(originalTrips)
      alert(`Não foi possível atualizar o status. Motivo: ${specificMessage}\n\nVerifique se as permissões de escrita (Row Level Security) estão configuradas corretamente.`)
    } finally {
      setUpdatingTripId(null)
    }
  }

  const handleSaveTrip = async (newTrip: Omit<Trip, 'id' | 'created_at'>) => {
    if (!user) return

    setIsSaving(true)
    try {
      const tripWithUserId = {
        ...newTrip,
        user_id: user.id
      }

      const { error: dbError } = await supabase
        .from('despesas')
        .insert([tripWithUserId])

      if (dbError) {
        throw dbError
      }
      
      setIsModalOpen(false)
      await fetchTrips()

    } catch (err: any) {
      const specificMessage = err.message || 'Erro desconhecido.'
      console.error('Falha ao salvar a nova viagem:', err)
      alert(`Não foi possível salvar a viagem. Motivo: ${specificMessage}\n\nVerifique se as permissões de escrita (RLS) estão configuradas corretamente.`)
    } finally {
      setIsSaving(false)
    }
  }
  
  const handleOpenEditModal = (trip: Trip) => {
    setEditingTrip(trip)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setEditingTrip(null)
    setIsEditModalOpen(false)
  }

  const handleUpdateTrip = async (updatedTrip: Trip) => {
    setIsSaving(true)
    try {
        const { id, created_at, user_id, ...updateData } = updatedTrip
        const { error: dbError } = await supabase
            .from('despesas')
            .update(updateData)
            .eq('id', updatedTrip.id)
            .eq('user_id', user?.id)
        
        if (dbError) {
            throw dbError
        }

        handleCloseEditModal()
        await fetchTrips()

    } catch (err: any) {
      const specificMessage = err.message || 'Erro desconhecido.'
      console.error('Falha ao atualizar a viagem:', err)
      alert(`Não foi possível atualizar a viagem. Motivo: ${specificMessage}\n\nVerifique se as permissões de escrita (RLS) estão configuradas corretamente.`)
    } finally {
        setIsSaving(false)
    }
  }
  
  const handleDeleteTrip = async (tripId: number) => {
    if (!window.confirm('Tem certeza de que deseja excluir esta viagem? Esta ação não pode ser desfeita.')) {
        return
    }

    setDeletingTripId(tripId)

    try {
        const { data, error: dbError } = await supabase
            .from('despesas')
            .delete()
            .eq('id', tripId)
            .eq('user_id', user?.id)
            .select()

        if (dbError) {
            throw dbError
        }

        if (!data || data.length === 0) {
            throw new Error("Nenhuma viagem foi excluída. Verifique suas permissões (RLS).")
        }

        setTrips(prevTrips => prevTrips.filter(trip => trip.id !== tripId))

    } catch (err: any) {
        const specificMessage = err.message || 'Erro desconhecido.'
        console.error('Falha ao excluir a viagem:', err)
        alert(`Não foi possível excluir a viagem. Motivo: ${specificMessage}\n\nVerifique suas permissões de exclusão (RLS).`)
    } finally {
        setDeletingTripId(null)
    }
  }

  const renderContent = () => {
    if (loading) {
      return <LoadingSpinner />
    }

    if (error) {
      return (
        <div className="text-center p-10 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-bold">Ocorreu um erro</p>
          <p className="whitespace-pre-wrap mt-2">{error}</p>
        </div>
      )
    }

    if (trips.length === 0) {
      return (
        <div className="text-center p-10 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
          <p className="font-bold">Nenhuma viagem encontrada</p>
          <p>Não há viagens cadastradas no momento. Clique em "Cadastrar Nova Viagem" para adicionar uma.</p>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        {trips.map(trip => (
          <TravelCard 
            key={trip.id} 
            trip={trip} 
            onUpdateStatus={handleUpdateStatus}
            isUpdating={updatingTripId === trip.id}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteTrip}
            isDeleting={deletingTripId === trip.id}
          />
        ))}
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-6">
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center px-4 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 transition-colors"
            >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Cadastrar Nova Viagem
            </button>
        </div>
        {renderContent()}
      </main>
      <AddTripModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrip}
        isSaving={isSaving}
      />
      <EditTripModal 
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleUpdateTrip}
        isSaving={isSaving}
        initialData={editingTrip}
      />
    </div>
  )
}