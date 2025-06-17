'use client'
import { ContactInfo, ContextDataType, News, Project } from '@/lib/models';
import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch } from 'react';

interface ContextValueType {
    data: ContextDataType;
    setData?: Dispatch<React.SetStateAction<ContextDataType>>;
}

const DataContext = createContext<ContextValueType | undefined>(undefined);

interface DataProviderProps {
    value: ContextValueType
    children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ value, children }) => {
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = (): ContextValueType => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};