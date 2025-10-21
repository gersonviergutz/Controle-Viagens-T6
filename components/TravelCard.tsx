import React from 'react';
import { Trip, TripStatus } from '../types';

interface TravelCardProps {
  trip: Trip;
  onUpdateStatus: (id: number, newStatus: TripStatus) => void;
  isUpdating: boolean;
}

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
);

const CheckCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
);


const TravelCard: React.FC<TravelCardProps> = ({ trip, onUpdateStatus, isUpdating }) => {
  const { id, origem, destino, data_ida, data_volta, companhia, valor, status } = trip;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
  };

  const formatCurrency = (value: number | null) => {
    if (value === null || isNaN(value)) return 'Valor não definido';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const statusBadgeClass = status === TripStatus.Comprado
    ? 'bg-emerald-100 text-emerald-800'
    : 'bg-amber-100 text-amber-800';

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              {origem || 'Origem não definida'} → {destino || 'Destino não definido'}
            </h3>
            <p className="text-slate-600 mt-1">{companhia || 'Companhia não informada'}</p>
            <div className="flex items-center text-slate-500 mt-2 text-sm">
              <CalendarIcon className="h-5 w-5 mr-2" />
              <span>{formatDate(data_ida)} a {formatDate(data_volta)}</span>
            </div>
          </div>
          <div className={`mt-4 sm:mt-0 text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClass}`}>
            {status || 'Status N/A'}
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <p className="text-2xl font-light text-sky-600">{formatCurrency(valor)}</p>
          {status === TripStatus.Pendente && (
            <button
              onClick={() => onUpdateStatus(id, TripStatus.Comprado)}
              disabled={isUpdating}
              className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-emerald-500 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-75 transition-colors disabled:bg-emerald-300 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Atualizando...
                </>
              ) : (
                <>
                  <CheckCircleIcon className="h-5 w-5 mr-2" />
                  Marcar como Comprado
                </>
              )}
            </button>
          )}
          {status === TripStatus.Comprado && (
            <button
              onClick={() => onUpdateStatus(id, TripStatus.Pendente)}
              disabled={isUpdating}
              className="mt-4 sm:mt-0 flex items-center justify-center px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg shadow-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75 transition-colors disabled:bg-amber-300 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Revertendo...
                </>
              ) : (
                <>
                  <XCircleIcon className="h-5 w-5 mr-2" />
                  Marcar como Pendente
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravelCard;