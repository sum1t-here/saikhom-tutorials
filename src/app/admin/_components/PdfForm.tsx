"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import usePdfStore from '@/store/usePDFStore';
import React, { useRef, useState } from 'react';

interface PDF {
    title : string,
    description : string,
    file : File | null
}

function PdfForm() {
    const {addPdf, loading, error} = usePdfStore();
    const [pdf, setPdf] = useState<PDF>({
        title : "",
        description : "",
        file : null as File | null
    })
    const {toast} = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();

            if (!pdf.title || !pdf.description || !pdf.file) {
                toast({
                    title: "Validation Error",
                    description: "Please fill out all fields and upload a file.",
                    variant: "destructive",
                });
                return;
                }

            const formData = new FormData();
            formData.append("title", pdf.title);
            formData.append("description", pdf.description);
            if(pdf.file) {
                formData.append("file", pdf.file);
            }
            
            await addPdf(formData);

            toast({
                title: "Success",
                description: "PDF added successfully"
            })
    
            setPdf({
                title: "",
                description: "",
                file: null
            })

            if (fileInputRef.current) {
                fileInputRef.current.value = ""; // Clear the file input
            }
        } catch (error) {
            toast({
                title: "Failed uploading PDF. Please try again",
                description: (error as Error).message,
                variant: "destructive"
            })
        }
       
    };

    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <Card>
                    <CardHeader>Upload your PDFs here</CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <Label htmlFor='title'>Enter the title</Label>
                            <Input
                                id='title'
                                value={pdf.title}
                                onChange={(e) => setPdf({ ...pdf, title: e.target.value })}
                                placeholder="Enter the title"
                                required
                            />
                            <Label htmlFor="description">Enter the description</Label>
                            <Input
                                id='description'
                                value={pdf.description}
                                onChange={(e) => setPdf({...pdf, description: e.target.value})}
                                placeholder="Enter the description"
                                required
                            />
                            <Label htmlFor='file'>Select the file</Label>
                            <Input
                                type='file'
                                accept='.pdf'
                                id='file'
                                ref={fileInputRef}
                                onChange={(e) => setPdf({...pdf, file : e.target.files?.[0] || null})}
                                required
                            />

                            {error && <p className='text-red-500'>{error}</p>}

                            <Button type='submit' disabled={loading}>
                                {loading ? "Uploading..." : "Upload"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default PdfForm;