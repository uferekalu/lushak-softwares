"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 8;

const ACCEPTED_FILE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/x-zip-compressed",
];

const schema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Name can only contain letters, spaces, hyphens and apostrophes"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    phone: z
        .string()
        .optional()
        .refine((val) => !val || val.length >= 9, "Phone number must be at least 9 characters if provided"),
    subject: z
        .string()
        .min(3, "Subject must be at least 3 characters")
        .max(150, "Subject cannot exceed 150 characters"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(2000, "Message cannot exceed 2000 characters"),
    files: z
        .any()
        .refine((files: FileList) => !files || files.length <= MAX_FILES, `Maximum ${MAX_FILES} files allowed`)
        .refine(
            (files: FileList) => {
                if (!files || files.length === 0) return true;
                const totalSize = Array.from(files).reduce((sum, file) => sum + file.size, 0);
                return totalSize <= MAX_TOTAL_SIZE_BYTES;
            },
            `Total file size cannot exceed 20MB`
        )
        .refine(
            (files: FileList) => {
                if (!files || files.length === 0) return true;
                return Array.from(files).every((file) => ACCEPTED_FILE_TYPES.includes(file.type));
            },
            `Allowed types: JPG, PNG, GIF, WEBP, PDF, DOC, DOCX, TXT, CSV, XLS, XLSX, ZIP`
        )
        .optional(),
});

type FormData = z.infer<typeof schema>;

type FilePreview = {
    file: File;
    url: string | null;
    name: string;
    isImage: boolean;
};

export default function ContactForm() {
    const [filesList, setFilesList] = useState<FilePreview[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setValue,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
        reValidateMode: "onChange",
    });

    const handleFilesChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);

        const newPreviews: FilePreview[] = selectedFiles.map((file) => ({
            file,
            name: file.name,
            isImage: file.type.startsWith("image/"),
            url: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        }));

        setFilesList((prev) => {
            const combined = [...prev, ...newPreviews];

            if (combined.length > MAX_FILES) {
                toast.error(`Maximum ${MAX_FILES} files allowed`);
                return combined.slice(0, MAX_FILES);
            }

            return combined;
        });
        const dt = new DataTransfer();
        [...filesList, ...newPreviews].forEach((item) => dt.items.add(item.file));
        setValue("files", dt.files, { shouldValidate: true });

        e.target.value = "";
    }, [filesList, setValue]);

    const removeFile = useCallback((index: number) => {
        setFilesList((prev) => {
            const itemToRemove = prev[index];

            // Clean up object URL if it exists
            if (itemToRemove?.url) {
                URL.revokeObjectURL(itemToRemove.url);
            }

            const updated = prev.filter((_, i) => i !== index);

            // Update form value
            const dt = new DataTransfer();
            updated.forEach((item) => dt.items.add(item.file));
            setValue("files", dt.files, { shouldValidate: true });

            return updated;
        });
    }, [setValue]);

    // Cleanup remaining object URLs on unmount
    useEffect(() => {
        return () => {
            filesList.forEach((item) => {
                if (item.url) {
                    URL.revokeObjectURL(item.url);
                }
            });
        };
    }, [filesList]);

    // ────────────────────────────────────────────────
    //                  reCAPTCHA
    // ────────────────────────────────────────────────

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const getRecaptchaToken = async (): Promise<string | null> => {
        if (!window.grecaptcha) {
            toast.error("reCAPTCHA failed to load. Please refresh the page.");
            return null;
        }

        return new Promise((resolve) => {
            window.grecaptcha.ready(() => {
                window.grecaptcha
                    .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: "contact_form" })
                    .then(resolve)
                    .catch(() => {
                        toast.error("reCAPTCHA execution failed.");
                        resolve(null);
                    });
            });
        });
    };

    // ────────────────────────────────────────────────
    //                     Submit
    // ────────────────────────────────────────────────

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);

        const token = await getRecaptchaToken();
        if (!token) {
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if (data.phone) formData.append("phone", data.phone);
        formData.append("subject", data.subject);
        formData.append("message", data.message);
        formData.append("recaptchaToken", token);

        if (data.files && (data.files as FileList).length > 0) {
            Array.from(data.files as FileList).forEach((file) => {
                formData.append("files", file);
            });
        }

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                const fileListText =
                    filesList.length > 0 ? ` (${filesList.map((f) => f.name).join(", ")})` : "";

                toast.success(`Message sent successfully!${fileListText}`, {
                    duration: 8000,
                    position: "top-right",
                });

                // Cleanup
                filesList.forEach((f) => f.url && URL.revokeObjectURL(f.url));
                setFilesList([]);
                reset();
            } else {
                toast.error(result.error || "Failed to send message.", {
                    duration: 6000,
                    position: "top-right",
                });
            }
        } catch {
            toast.error("Network error – please check your connection.", {
                duration: 6000,
                position: "top-right",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ────────────────────────────────────────────────
    //                     RENDER
    // ────────────────────────────────────────────────

    return (
        <section className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-gray-200">
            <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                        Let's Start a Conversation
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Have a project or files to share? Drop us a message — we'll reply within 24 hours.
                    </p>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-slate-200"
                >
                    {/* Name */}
                    <div className="mb-7">
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            {...register("name")}
                            className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-slate-50/50 ${errors.name
                                ? "border-red-500 focus:ring-red-200"
                                : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            placeholder="John Doe"
                        />
                        <AnimatePresence>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm mt-1.5"
                                >
                                    {errors.name.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div className="mb-7">
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            {...register("email")}
                            className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-slate-50/50 ${errors.email
                                ? "border-red-500 focus:ring-red-200"
                                : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            placeholder="your.email@company.com"
                        />
                        <AnimatePresence>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm mt-1.5"
                                >
                                    {errors.email.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Phone */}
                    <div className="mb-7">
                        <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            {...register("phone")}
                            className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-slate-50/50 ${errors.phone
                                ? "border-red-500 focus:ring-red-200"
                                : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            placeholder="+234 123 456 7890"
                        />
                        <AnimatePresence>
                            {errors.phone && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm mt-1.5"
                                >
                                    {errors.phone.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Subject */}
                    <div className="mb-7">
                        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            id="subject"
                            type="text"
                            {...register("subject")}
                            className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-slate-50/50 ${errors.subject
                                ? "border-red-500 focus:ring-red-200"
                                : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            placeholder="Inquiry about website development"
                        />
                        <AnimatePresence>
                            {errors.subject && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm mt-1.5"
                                >
                                    {errors.subject.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Message */}
                    <div className="mb-8">
                        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                            Your Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            {...register("message")}
                            rows={6}
                            className={`w-full px-5 py-3.5 border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 bg-slate-50/50 resize-y min-h-[140px] ${errors.message
                                ? "border-red-500 focus:ring-red-200"
                                : "border-slate-300 focus:ring-blue-500 focus:border-blue-500"
                                }`}
                            placeholder="Tell us about your project, requirements, timeline, or any questions..."
                        />
                        <AnimatePresence>
                            {errors.message && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm mt-1.5"
                                >
                                    {errors.message.message}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Files */}
                    <div className="mb-8">
                        <label htmlFor="files" className="block text-sm font-medium text-slate-700 mb-2">
                            Attach Files (optional, max {MAX_FILES} files, total ≤ 20MB)
                        </label>

                        <div className="flex items-center justify-center w-full">
                            <label
                                htmlFor="files"
                                className={`w-full flex flex-col items-center px-4 py-8 bg-slate-50/60 text-slate-500 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50/60 ${errors.files ? "border-red-500 bg-red-50/30" : "border-slate-300"
                                    }`}
                            >
                                <Upload className="w-12 h-12 mb-3 text-slate-400" />
                                <span className="text-base font-medium">Click or drag & drop files here</span>
                                <span className="text-xs mt-2 text-slate-500">
                                    JPG, PNG, GIF, WEBP, PDF, Word, Excel, TXT, CSV, ZIP
                                </span>
                                <input
                                    id="files"
                                    type="file"
                                    multiple
                                    accept={ACCEPTED_FILE_TYPES.join(",")}
                                    onChange={handleFilesChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <AnimatePresence>
                            {errors.files?.message && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="text-red-600 text-sm mt-2 text-center"
                                >
                                    {String(errors.files.message)}
                                </motion.p>
                            )}
                        </AnimatePresence>


                        {/* File Previews */}
                        {filesList.length > 0 && (
                            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                <AnimatePresence>
                                    {filesList.map((item, index) => (
                                        <motion.div
                                            key={`${item.name}-${index}`}
                                            initial={{ opacity: 0, scale: 0.92 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.88 }}
                                            className="relative group rounded-lg overflow-hidden shadow-sm bg-white border border-slate-200"
                                        >
                                            {item.isImage && item.url ? (
                                                <img
                                                    src={item.url}
                                                    alt={item.name}
                                                    className="w-full h-28 object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-28 bg-slate-100 flex flex-col items-center justify-center p-2">
                                                    <span className="text-2xl font-bold text-slate-400">
                                                        {item.name.split(".").pop()?.toUpperCase() || "FILE"}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 mt-1">non-previewable</span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="bg-red-600 hover:bg-red-700 text-white rounded-full p-2.5 shadow-md transition-colors"
                                                >
                                                    <X size={20} />
                                                </button>
                                            </div>

                                            <p className="text-xs text-center mt-1.5 px-1.5 text-slate-700 truncate">
                                                {item.name}
                                            </p>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting || !isValid}
                        whileHover={{ scale: isValid && !isSubmitting ? 1.02 : 1 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg ${isValid && !isSubmitting
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-slate-400 text-slate-200 cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                                    />
                                </svg>
                                Sending...
                            </>
                        ) : (
                            <>
                                Send Message
                                <Send className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Your information and files are secure and used only to respond to your inquiry.
                    </p>
                </motion.form>
            </div>
        </section>
    );
}