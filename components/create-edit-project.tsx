'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { projectsAPI, UploadAPI } from '@/lib/api';
import { Project } from '@/lib/models';
import { PROJECT_TYPE } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const initialFormData = {
    title: '',
    description: '',
    client: '',
    location: '',
    type: PROJECT_TYPE.ALL,
    tags: [],
    imageUrls: [],
};

const CreateEditProjectPage = ({ id }: { id?: string }) => {
    const [formData, setFormData] = useState<Project>(initialFormData);
    const [imageFormData, setImageFormData] = useState<FileList>();
    const [hasMounted, setHasMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsLoading(true);
        const loadData = async () => {
            if(id) {
                const res = await projectsAPI.getById(id);
                setFormData({
                    tags: res.tags || [],
                    type: res.type || PROJECT_TYPE.ALL,
                    imageUrls: res.imageUrls || [],
                    title: res.title || '',
                    description: res.description || '',
                    client: res.client || '',
                    location: res.location || '',
                    
                })
            }
        }
        loadData();
        setIsLoading(false);
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files)
            setFormData({ ...formData });
            setImageFormData(e.target.files as FileList);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            setIsSubmitting(true);
            let uploadRes = { urls: [] };
            if(imageFormData) {
                uploadRes = await UploadAPI.uploadMultipleImages(imageFormData);
                // console.log('Image URLs:', res);
                setFormData({ ...formData, imageUrls: uploadRes.urls ?? [] });
            }
            if(!id) {
                await projectsAPI.create({ ...formData, imageUrls: uploadRes.urls });
                toast({
                    title: 'Project Created',
                    description: 'Your project has been created successfully.',
                    variant: 'success',  
                    position: 'top'   
                });
                setFormData({ ...initialFormData });
            } else {
                await projectsAPI.update(id, { ...formData, imageUrls: [...formData.imageUrls, ...uploadRes.urls] });
                toast({
                    title: 'Project Updated',
                    description: 'Your project has been updated successfully.',
                    variant: 'success',  
                    position: 'top'   
                });
            }
            
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'Error',
                description: 'An error occurred!',
                variant: 'error',
                position: 'top'
            });
        } finally {
            setIsSubmitting(false);
            router.push('/admin/projects');
        }
    };

    return (
        <div className="flex items-center justify-start px-4">
            <div className=" bg-white rounded-2xl w-full max-w-4xl">
                <h1 className="font-semibold mb-6 text-gray-800">Create New Project</h1>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            className="mt-1"
                        />
                    </div>
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                            Type
                        </label>
                        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value as PROJECT_TYPE })}>
                            <SelectTrigger>
                                <SelectValue placeholder="Filter by Type" />
                            </SelectTrigger>

                            {/* Content (Dropdown) */}
                            <SelectContent className="w-full">
                                <SelectItem value={PROJECT_TYPE.ALL}>All</SelectItem>
                                <SelectItem value={PROJECT_TYPE.ARCHITECTURE}>Architecture</SelectItem>
                                <SelectItem value={PROJECT_TYPE.INTERIOR}>Interior</SelectItem>
                                <SelectItem value={PROJECT_TYPE.PUBLIC_SPACE}>Public space</SelectItem>
                                <SelectItem value={PROJECT_TYPE.PLANNING}>Planning</SelectItem>
                                <SelectItem value={PROJECT_TYPE.RESEARCH_AND_STUDY}>Research and study</SelectItem>
                                <SelectItem value={PROJECT_TYPE.ACHIEVEMENTS}>Achievements</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    
                    <div>
                        <label htmlFor="client" className="block text-sm font-medium text-gray-700">
                            Client
                        </label>
                        <input
                            type="text"
                            id="client"
                            name="client"
                            value={formData.client}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <Input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags.join(', ')}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                            placeholder="Enter tags separated by commas"
                            className="mt-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image Upload    
                        </label>
                        {/* Displaying already uploaded images */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.imageUrls.map((url, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={url}
                                        alt={`Uploaded ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedUrls = formData.imageUrls.filter((_, i) => i !== index);
                                            setFormData({ ...formData, imageUrls: updatedUrls });
                                        }}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                            {/* Displaying the newly selected images from the FileList (not yet uploaded) */}
                            {Array.from(imageFormData ?? [])?.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={file ? URL.createObjectURL(file) : ''}
                                        alt={`Uploaded ${index + 1}`}
                                        className="w-24 h-24 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedUrls = formData.imageUrls.filter((_, i) => i !== index);
                                            setFormData({ ...formData, imageUrls: updatedUrls });
                                        }}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                       file:rounded-lg file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                        />  
                    </div>
                    <Button
                        variant='default'
                        type="submit"
                        className="w-full font-semibold transition duration-200"
                        disabled={isSubmitting || isLoading}
                    >
                        {id ? 'Update Project' : 'Create Project'}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateEditProjectPage;
