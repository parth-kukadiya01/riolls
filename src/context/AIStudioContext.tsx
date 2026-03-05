'use client';

import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { aiStudioApi } from '@/lib/api';

export interface AIDesignConcept {
    title: string;
    description: string;
    hero_material: string;
    image_data?: string;
}

export interface AIStudioState {
    profile: Record<string, string | string[]>;
    generatedConcepts: AIDesignConcept[];
    styleAnalysis: string;
    recommendedMaterials: string[];
    selectedConceptIndex: number | null;
    customisations: Record<string, any>;
    isGenerating: boolean;
    error: string | null;
    galleryReference: { name: string; image: string; type: string } | null;
    revisionCount: number;
    generationStatus: { used: number; limit: number; remaining: number } | null;
}

interface AIStudioContextType {
    state: AIStudioState;
    updateProfile: (data: Record<string, string | string[]>) => void;
    updateCustomisations: (data: Record<string, any>) => void;
    setSelectedConcept: (index: number) => void;
    generateIdeas: (immediateProfile?: Record<string, any>, revisionCount?: number) => Promise<boolean>;
    submitQuote: (contactData: Record<string, string>) => Promise<boolean>;
    setGalleryReference: (piece: { name: string; image: string; type: string } | null) => void;
    generateVariations: () => Promise<boolean>;
    fetchGenerationStatus: () => Promise<void>;
    reset: () => void;
}

const initialState: AIStudioState = {
    profile: {},
    generatedConcepts: [],
    styleAnalysis: '',
    recommendedMaterials: [],
    selectedConceptIndex: null,
    customisations: {},
    isGenerating: false,
    error: null,
    galleryReference: null,
    revisionCount: 0,
    generationStatus: null,
};

const AIStudioContext = createContext<AIStudioContextType | undefined>(undefined);

export function AIStudioProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AIStudioState>(initialState);

    const updateProfile = (data: Record<string, string | string[]>) => {
        setState(prev => ({ ...prev, profile: { ...prev.profile, ...data } }));
    };

    const updateCustomisations = (data: Record<string, any>) => {
        setState(prev => ({ ...prev, customisations: { ...prev.customisations, ...data } }));
    };

    const setSelectedConcept = (index: number) => {
        setState(prev => ({ ...prev, selectedConceptIndex: index }));
    };

    const setGalleryReference = (piece: { name: string; image: string; type: string } | null) => {
        setState(prev => ({ ...prev, galleryReference: piece }));
    };

    // Ref-based lock to prevent duplicate API calls (state check alone fails due to async batching)
    const generatingRef = useRef(false);

    const generateIdeas = async (immediateProfile?: Record<string, any>, overrideRevisionCount?: number) => {
        // Synchronous ref check prevents double-calls from React Strict Mode or rapid clicks
        if (generatingRef.current) return false;
        generatingRef.current = true;

        setState(prev => ({ ...prev, isGenerating: true, error: null, galleryReference: null }));

        try {
            // Unpack any single-element arrays (like pieceType) into strings for the API
            const payload: Record<string, any> = {};
            const sourceProfile = immediateProfile || state.profile;

            for (const [key, val] of Object.entries(sourceProfile)) {
                payload[key] = Array.isArray(val) ? val[0] : val;
            }

            // Use the explicitly passed revisionCount (avoids stale closure from setState)
            const effectiveRevisionCount = overrideRevisionCount ?? state.revisionCount;
            if (effectiveRevisionCount > 0) {
                payload.revisionCount = effectiveRevisionCount;
            }

            if (!payload.pieceType) {
                setState(prev => ({ ...prev, error: 'Session expired. Please return to Step 1 and start again.', isGenerating: false }));
                generatingRef.current = false;
                return false;
            }

            const res = await aiStudioApi.generateIdeas(payload);
            if (res.success && res.data) {
                const data = res.data as any;
                setState(prev => {
                    const newConcepts = data.concepts || [];
                    // If this is a revision (generating variations), append rather than replace
                    const updatedConcepts = effectiveRevisionCount > 0
                        ? [...prev.generatedConcepts, ...newConcepts]
                        : newConcepts;

                    return {
                        ...prev,
                        generatedConcepts: updatedConcepts,
                        styleAnalysis: data.style_analysis || '',
                        recommendedMaterials: data.recommended_materials || [],
                        isGenerating: false,
                    };
                });
                generatingRef.current = false;
                return true;
            } else {
                setState(prev => ({ ...prev, error: res.message || 'Failed to generate ideas', isGenerating: false }));
                generatingRef.current = false;
                return false;
            }
        } catch (err: any) {
            setState(prev => ({ ...prev, error: err.message || 'An error occurred during generation', isGenerating: false }));
            generatingRef.current = false;
            return false;
        }
    };

    const generateVariations = async () => {
        // Increment the revision count synchronously and pass it directly to generateIdeas
        // to avoid the stale closure bug (state.revisionCount would still be the old value
        // if we relied on setState + setTimeout(0) approach).
        const nextRevisionCount = state.revisionCount + 1;
        setState(prev => ({ ...prev, revisionCount: nextRevisionCount }));
        return generateIdeas(undefined, nextRevisionCount);
    };

    const fetchGenerationStatus = async () => {
        try {
            const res = await aiStudioApi.getGenerationStatus();
            if (res.success && res.data) {
                setState(prev => ({ ...prev, generationStatus: res.data as { used: number; limit: number; remaining: number } }));
            }
        } catch {
            // Silent fail — status is optional UI enhancement
        }
    };

    const submitQuote = async (contactData: Record<string, string>) => {
        try {
            // Combine everything into the payload expected by the backend QuoteRequest
            const payload = {
                ...state.profile,
                ...state.customisations,
                ...contactData,
            };

            // If they selected a specific AI design from the generation step
            if (state.selectedConceptIndex !== null && state.generatedConcepts[state.selectedConceptIndex]) {
                const selected = state.generatedConcepts[state.selectedConceptIndex];
                payload.additionalNotes = `Selected Concept: ${selected.title}. ${(payload.additionalNotes || '')}`;
                if (selected.image_data) {
                    payload.selectedImage = selected.image_data;
                }
            }

            // Save ALL generated concept images (up to 3) so the profile page can show them
            const ideaImages = state.generatedConcepts
                .map(c => c.image_data)
                .filter(Boolean) as string[];
            if (ideaImages.length > 0) {
                (payload as any).ideaImages = ideaImages;
            }

            // Or if they came directly from the Bespoke Gallery
            if (state.galleryReference) {
                const typeLabel = state.galleryReference.type === 'ai_concept' ? 'AI Concept' : 'Bespoke Commission';
                payload.additionalNotes = `Inquiring about gallery piece (${typeLabel}): ${state.galleryReference.name}. ${(payload.additionalNotes || '')}`;
                payload.selectedImage = state.galleryReference.image;
            }

            const res = await aiStudioApi.requestQuote(payload);
            return res.success;
        } catch (err) {
            console.error("Failed to submit quote", err);
            return false;
        }
    };

    const reset = () => {
        setState(initialState);
    };

    return (
        <AIStudioContext.Provider value={{ state, updateProfile, updateCustomisations, setSelectedConcept, generateIdeas, submitQuote, setGalleryReference, generateVariations, fetchGenerationStatus, reset }}>
            {children}
        </AIStudioContext.Provider>
    );
}

export function useAIStudio() {
    const context = useContext(AIStudioContext);
    if (context === undefined) {
        throw new Error('useAIStudio must be used within an AIStudioProvider');
    }
    return context;
}
