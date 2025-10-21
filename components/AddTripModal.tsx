import React, { useState } from 'react';
import { Trip, TripStatus } from '../types';

interface AddTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTrip: Omit<Trip, 'id' | 'created_at'>) => Promise<void>;
  isSaving: boolean;
}

const XIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const AddTripModal: React.FC<AddTripModalProps> = ({ isOpen, onClose, onSave, isSaving }) => {
  const [tripData, setTripData] = useState({
    origem: '',
    destino: '',
    data_ida: '',
    data_volta: '',
    companhia: '',
    valor: null as number | null,
    observacao: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setTripData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? null : parseFloat(value)) : value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTrip = {
      ...tripData,
      origem: tripData.origem || null,
      destino: tripData.destino || null,
      data_ida: tripData.data_ida || null,
      data_volta: tripData.data_volta || null,
      companhia: tripData.companhia || null,
      observacao: tripData.observacao || null,
      status: TripStatus.Pendente,
    };
    await onSave(newTrip);
  };

  const inputClass = "mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg m-4 transform transition-all">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-slate-800">Cadastrar Nova Viagem</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="origem" className="block text-sm font-medium text-slate-700">Origem <span className="text-red-500">*</span></label>
                <input type="text" name="origem" id="origem" value={tripData.origem} onChange={handleChange} className={inputClass} required />
              </div>
              <div>
                <label htmlFor="destino" className="block text-sm font-medium text-slate-700">Destino <span className="text-red-500">*</span></label>
                <input type="text" name="destino" id="destino" value={tripData.destino} onChange={handleChange} className={inputClass} required />
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="data_ida" className="block text-sm font-medium text-slate-700">Data de Ida</label>
                <input type="date" name="data_ida" id="data_ida" value={tripData.data_ida} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label htmlFor="data_volta" className="block text-sm font-medium text-slate-700">Data de Volta</label>
                <input type="date" name="data_volta" id="data_volta" value={tripData.data_volta} onChange={handleChange} className={inputClass} />
              </div>
            </div>
             <div>
              <label htmlFor="companhia" className="block text-sm font-medium text-slate-700">Companhia Aérea</label>
              <input type="text" name="companhia" id="companhia" value={tripData.companhia} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label htmlFor="valor" className="block text-sm font-medium text-slate-700">Valor (R$)</label>
              <input type="number" name="valor" id="valor" value={tripData.valor === null ? '' : tripData.valor} onChange={handleChange} className={inputClass} step="0.01" min="0" placeholder="Ex: 1250.50" />
            </div>
            <div>
              <label htmlFor="observacao" className="block text-sm font-medium text-slate-700">Observação</label>
              <textarea name="observacao" id="observacao" value={tripData.observacao} onChange={handleChange} rows={3} className={inputClass}></textarea>
            </div>
          </div>
          <div className="flex justify-end items-center p-4 bg-slate-50 border-t rounded-b-lg space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-md hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400">
              Cancelar
            </button>
            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-md shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 disabled:bg-sky-300 disabled:cursor-not-allowed flex items-center">
              {isSaving && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isSaving ? 'Salvando...' : 'Salvar Viagem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTripModal;
