'use client';

import { useState, useCallback } from 'react';
import { useUserAuth } from './useUserAuth';
import { ElectionService, Election } from '@/lib/services/electionService';

export const useElections = () => {
  const { token } = useUserAuth();
  const [elections, setElections] = useState<Election[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getElections = useCallback(async (params: any = {}) => {
    if (!token) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await ElectionService.getElections(params);
      
      if (response.success && response.data) {
        setElections(response.data);
      }
    } catch (error) {
      setError('Failed to fetch elections');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const getElectionById = useCallback(async (id: string) => {
    if (!token) return null;
    
    try {
      const response = await ElectionService.getElectionById(id);
      return response.success ? response.data : null;
    } catch (error) {
      return null;
    }
  }, [token]);

  return {
    elections,
    isLoading,
    error,
    getElections,
    getElectionById,
  };
};
