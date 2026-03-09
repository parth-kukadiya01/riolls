'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import styles from './page.module.css';

interface PreviewImage {
    id: string;
    file: File;
    previewUrl: string;
}

export default function EtsyExcelGenerator() {
    const [images, setImages] = useState<PreviewImage[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const processFiles = (files: FileList | File[]) => {
        const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));

        if (validFiles.length === 0) return;

        const newImages = validFiles.map(file => ({
            id: crypto.randomUUID(),
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setImages(prev => [...prev, ...newImages]);
        setError(null);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFiles(e.dataTransfer.files);
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFiles(e.target.files);
        }
        // reset input so same files can be selected again if removed
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const removeImage = (idToRemove: string) => {
        setImages(prev => {
            const filtered = prev.filter(img => img.id !== idToRemove);
            // Revoke the object URL to avoid memory leaks
            const removedImg = prev.find(img => img.id === idToRemove);
            if (removedImg) URL.revokeObjectURL(removedImg.previewUrl);
            return filtered;
        });
    };

    const handleGenerate = async () => {
        if (images.length === 0) return;

        setIsGenerating(true);
        setError(null);

        try {
            const formData = new FormData();
            images.forEach(img => {
                formData.append('images', img.file);
            });

            const response = await fetch('http://localhost:8000/api/v1/etsy/analyze-images', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.detail || `Server error: ${response.status}`);
            }
            const data = await response.json();
            setSuccessMsg(data.message || 'Successfully saved listings to server.');

            // Clear successfully processed images
            images.forEach(img => URL.revokeObjectURL(img.previewUrl));
            setImages([]);

        } catch (err) {
            console.error("Analysis failed:", err);
            setError(err instanceof Error ? err.message : "Failed to analyze and save images.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <span className={styles.eyebrow}>AI Studio Tools</span>
                    <h1 className={styles.title}>Etsy Excel Generator</h1>
                    <p className={styles.subtitle}>
                        Upload jewelry photos to instantly analyze and generate complete, SEO-optimized Etsy listings with titles, tags, and pricing exported entirely to an Excel file.
                    </p>
                </div>

                <div
                    className={`${styles.uploadArea} ${isDragging ? styles.uploadActive : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className={styles.hiddenInput}
                        multiple
                        accept="image/*"
                    />
                    <div className={styles.uploadIcon}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                    </div>
                    <h3 className={styles.uploadText}>Drop jewelry images here or click to browse</h3>
                    <p className={styles.uploadHint}>Supports JPG, PNG, WEBP. You can upload multiple images at once.</p>
                </div>

                {images.length > 0 && (
                    <div className={styles.previewGrid}>
                        {images.map(img => (
                            <div key={img.id} className={styles.previewCard}>
                                <img src={img.previewUrl} alt={img.file.name} className={styles.previewImage} />
                                <button
                                    className={styles.removeBtn}
                                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                                    title="Remove image"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {images.length > 0 && (
                    <div className={styles.actionSection}>
                        <button
                            className={styles.generateBtn}
                            onClick={handleGenerate}
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="2" x2="12" y2="6"></line>
                                        <line x1="12" y1="18" x2="12" y2="22"></line>
                                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                        <line x1="2" y1="12" x2="6" y2="12"></line>
                                        <line x1="18" y1="12" x2="22" y2="12"></line>
                                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                    </svg>
                                    Analyzing & Generating Excel...
                                </>
                            ) : (
                                <>Generate Etsy Excel ({images.length} item{images.length !== 1 ? 's' : ''})</>
                            )}
                        </button>
                        {isGenerating && (
                            <p className={styles.statusMessage}>This can take up to 30 seconds per image depending on quantity.</p>
                        )}
                        {error && (
                            <p className={styles.statusError}>{error}</p>
                        )}
                    </div>
                )}

                {successMsg && images.length === 0 && (
                    <div className={styles.actionSection} style={{ border: '1px solid #C9A96E', background: 'rgba(201, 169, 110, 0.1)' }}>
                        <h3 style={{ color: '#C9A96E', marginBottom: '0.5rem' }}>Success!</h3>
                        <p>{successMsg}</p>
                    </div>
                )}

            </div>
        </div>
    );
}
